/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequest() {
    if (!window.PaymentRequest) {
      return null;
    }
    
    const supportedInstruments = [{
        supportedMethods: 'https://mercury-stg.phonepe.com/transact/pay',
        data: {
        pa: "DOCUBAY@ybl",
        pn: "DOCUBAY",
        am: Number(document.getElementById("inputPrice").value).toFixed(2),
        mam: Number(document.getElementById("inputPrice").value).toFixed(2),
        tid: "YBL2ae29f9fd2cd41a4a2ee1939df69115e",
        tr: "T2002061852116120954712",
        tn: "Payment%20for%20TX117785062868474000",
        mc: "5311",
        mode: "04",
        purpose: "00",
        utm_source: 104577,
        utm_medium: "DOCUBAY",
        utm_campaign: "DEBIT",
        environment: "TEST",
        apiVersion: "12",
      }
    }];
  
    const details = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: document.getElementById("inputPrice").value,
        }
      }
    };
  
    let request = null;
  
    try {
      request = new PaymentRequest(supportedInstruments, details);
      if (request.canMakePayment) {
        request.canMakePayment().then(function(result) {
          info(result ? 'Can make payment' : 'Cannot make payment');
        }).catch(function(err) {
          error(err);
        });
      }
      if (request.hasEnrolledInstrument) {
        request.hasEnrolledInstrument().then(function(result) {
          info(result ? 'Has enrolled instrument' : 'No enrolled instrument');
        }).catch(function(err) {
          error(err);
        });
      }
    } catch (e) {
      error('Developer mistake: \'' + e.message + '\'');
    }
  
    return request;
  }
  
  let request = buildPaymentRequest();

  document.getElementsByName("price")[0].addEventListener('change', doThing);

  function doThing() {
    request = null;
    request = buildPaymentRequest();
    console.log("In do things");
  }
  
  /**
   * Handles the response from PaymentRequest.show().
   */
  function handlePaymentResponse(response) {
      response.complete('success')
        .then(function() {
          done('This is a demo website. No payment will be processed.', response);
        })
        .catch(function(err) {
          error(err);
          request = buildPaymentRequest();
        });
  }
  
  /**
   * Launches payment request for Bob Pay.
   */
  function onBuyClicked() { // eslint-disable-line no-unused-vars
    if (!window.PaymentRequest || !request) {
      error('PaymentRequest API is not supported.');
      return;
    }
  
    try {
      request.show()
        .then(handlePaymentResponse)
        .catch(function(err) {
          error(err);
          request = buildPaymentRequest();
        });
    } catch (e) {
      error('Developer mistake: \'' + e.message + '\'');
      request = buildPaymentRequest();
    }
  }

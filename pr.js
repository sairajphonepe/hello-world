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
            url: "testString"
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

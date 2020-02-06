/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequest() {
    if (!window.PaymentRequest) {
      return null;
    }
    
    const supportedInstruments = [{
        supportedMethods: 'https://mercury-stg.phonepe.com/transact/pay'
    }];
  
    const details = {
      data: {
        pa: "DOCUBAY@ybl",
        pn: "DOCUBAY",
        am: "1.00",
        mam: "1.00",
        tid: "YBL24d4362615904b96ac08018b9a57b6bb",
        tr: "T1911211610268464663990",
        tn: "Payment+for+5dd6699868c10b26364d1b09",
        mc: "7999",
        mode: "04",
        purpose: "00",
        utm_source: 104577,
        utm_medium: "DOCUBAY",
        utm_campaign: "DEBIT",
        environment: "TEST",
        apiVersion: "12",
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
  

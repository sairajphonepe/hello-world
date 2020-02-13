/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequest() {
    if (!window.PaymentRequest) {
      return null;
    }
    
    const supportedInstruments = [{
        supportedMethods: "https://phonepay.herokuapp.com/pay",
        data: {
            url: document.getElementById("inputPrice").value
        }
    }];
  
    const details = {
        id: "1111-71ca4e9f-748c-4de7-af7b-a84f3da75b4e-temp",
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '100',
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
  
  let request;

  document.getElementsByName("price")[0].addEventListener('change', doThing);

  function doThing() {
    request = null;
    request = buildPaymentRequest();
    console.log("Inside do things");
  }
  
  /**
   * Handles the response from PaymentRequest.show().
   */
  function handlePaymentResponse(response) {
      document.getElementById("msg").innerHTML = `<div>${JSON.stringify(
response, null, "\t\t"
)}</div>`;
      return;
      
      var fetchOptions = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(response)
          };
          var serverPaymentRequest = new Request('secure/payment/endpoint');
          fetch(serverPaymentRequest, fetchOptions).then( response1 => {
//             if (response1.status < 400) {
              response.complete("success");
//             } else {
//               response.complete("fail");
//             };
          }).catch( reason => {
            response.complete("fail");
          });
//       response.complete('success')
//         .then(function() {
//           done('This is a demo website. No payment will be processed.', response);
//         })
//         .catch(function(err) {
//           error(err);
//           request = buildPaymentRequest();
//         });
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

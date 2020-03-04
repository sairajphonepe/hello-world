let mId;
/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequest() {
    if (!window.PaymentRequest) {
      return null;
    }
    
//     var result = document.getElementById("inputPrice").value ? document.getElementById("inputPrice").value : null;
//     if(!result){
//         return;
//     }
//     mId = JSON.parse('{"' + decodeURI(result).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}').;
    
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
  
//     try {
      request = new PaymentRequest(supportedInstruments, details);
//       if (request.canMakePayment) {
//         request.canMakePayment().then(function(result) {
//           info(result ? 'Can make payment' : 'Cannot make payment');
//         }).catch(function(err) {
//           error(err);
//         });
//       }
//       if (request.hasEnrolledInstrument) {
//         request.hasEnrolledInstrument().then(function(result) {
//           info(result ? 'Has enrolled instrument' : 'No enrolled instrument');
//         }).catch(function(err) {
//           error(err);
//         });
//       }
//     } catch (e) {
//       error('Developer mistake: \'' + e.message + '\'');
//     }
  
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
      
//       if(response && response.details && response.details.result && response.details.result.indexOf('Status=Success')){
//           var result = response.details.result;
//           var responseObj = JSON.parse('{"' + decodeURI(result).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
//           var txnId = responseObj.txnRef;
//           var xhttp = new XMLHttpRequest(),
//             url = "./Proxy.jsp?mId=M2306160483220675579140&txnId=" + txnId;
//             xhttp.onreadystatechange = function() {
//                 if (this.readyState == 4 && this.status == 200) {
//                     var myData = JSON.parse(this.response);
// //                     console.log("Here transaction status after the fetch api call is " + myData.data.responseCode);
//                     response.complete("success");
//                 } 
//             };
//             xhttp.open("GET", url, true);
//             xhttp.send();

//       }
      
//       var fetchOptions = {
//             method: 'POST',
//             credentials: 'include',
//             body: JSON.stringify(response)
//           };
//           var serverPaymentRequest = new Request('secure/payment/endpoint');
//           fetch(serverPaymentRequest, fetchOptions).then( response1 => {
// //             if (response1.status < 400) {
//               response.complete("success");
// //             } else {
// //               response.complete("fail");
// //             };
//           }).catch( reason => {
//             response.complete("fail");
//           });
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
//         if (request.canMakePayment) {
        request.canMakePayment().then(canPay => {
            request.show()
                .then(handlePaymentResponse)
                .catch(function(err) {
                  error(err);
                  request = buildPaymentRequest();
                });
//           info(result ? 'Can make payment' : 'Cannot make payment');
        }).catch(function(err) {
          error(err);
        });
//       }
//       request.show()
//         .then(handlePaymentResponse)
//         .catch(function(err) {
//           error(err);
//           request = buildPaymentRequest();
//         });
    } catch (e) {
      error('Developer mistake: \'' + e.message + '\'');
      request = buildPaymentRequest();
    }
  }

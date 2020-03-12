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

  // document.getElementsByName("price")[0].addEventListener('change', doThing);

  function onProcessClicked() {
    request = null;
    request = buildPaymentRequest();
    // var amount = document.getElementById("inputPrice").value;
    // var payload = {
    //    "merchantId":"M2306160483220675579140",
    //    "transactionId":"TX" + Date.now(),
    //    "merchantUserId":"U123456789",
    //    "amount":amount,
    //    "paymentScope": "MSITE_INTENT"
    // },
    // requestValue = btoa(JSON.stringify(payload));
    // sha256(requestValue).then(obj =>{
    //   console.log("here value is" + obj.hashHex + "###1");

    //   var xhttp = new XMLHttpRequest(),
    //    url = "./proxy2.jsp?xVerify=" + obj.hashHex + "###1",
    //    tagsObj={
    //     "request": obj.message
    //    };
       
    //    xhttp.onreadystatechange = function() {
    //         if (this.readyState == 4 && this.status == 200) {
    //             //return this.response;
    //            var t1 = JSON.parse(this.response);
    //            console.log("we are here in on ready state change handler");
    //         }
    //     };

    //    xhttp.open("POST", url, true);
    //    xhttp.setRequestHeader("Content-type", "application/json");
    //    xhttp.send(JSON.stringify(tagsObj));


    // });


    request.canMakePayment().then(function(result) {
      if(result){
        console.log("We are here in canMake payment handler");
        document.getElementById("payByPhonepeButton").removeAttribute("class");
      } else {
        console.log("We are in else part of can make payment handler");
      }
      // info(result ? 'Can make payment' : 'Cannot make payment');
    }).catch(function(err) {
      error(err);
    });

    // request.hasEnrolledInstrument().then(function(result1) {
    //   info(result1 ? 'Has enrolled instrument' : 'No enrolled instrument');
    // }).catch(function(err) {
    //   error(err);
    // });

  }

  async function sha256(message) {
      // encode as UTF-8
      const msgBuffer = new TextEncoder('utf-8').encode(message + "/v4/debit8289e078-be0b-484d-ae60-052f117f8deb");                    

      // hash the message
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

      // convert ArrayBuffer to Array
      const hashArray = Array.from(new Uint8Array(hashBuffer));

      // convert bytes to hex string                  
      const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
      return {"message": message,
                "hashHex": hashHex};
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
  function onPayClick() { // eslint-disable-line no-unused-vars
    if (!window.PaymentRequest || !request) {
      error('PaymentRequest API is not supported.');
      return;
    }
  
    try {
//         if (request.canMakePayment) {
        // request.canMakePayment().then(canPay => {
            request.show()
                .then(handlePaymentResponse)
                .catch(function(err) {
                  error(err);
                  request = buildPaymentRequest();
                });
//           info(result ? 'Can make payment' : 'Cannot make payment');
        // }).catch(function(err) {
        //   error(err);
        // });
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

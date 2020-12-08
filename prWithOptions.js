let paymentRequestTimeout, paymentRequest, timeOutCounter= 0;
function changeHandlerOther(evt) {
  if(document.getElementById("phonepe").checked == true) {
    document.getElementById("otherPaymentAppInput").className = "hiddenElement";
  }
  if(document.getElementById("gpay").checked == true) {
    document.getElementById("otherPaymentAppInput").className = "hiddenElement";
//     createPaymentRequest(true, "gpay");
  }
  if(document.getElementById("other").checked == true) {
    document.getElementById("otherPaymentAppInput").className = "";
  }
}

function reset(){
  document.getElementById('msg').innerHTML = ""; 
  if(document.getElementById("other").checked == true) {
    if(document.getElementById("otherPaymentAppPaymentUrl").value == "" || document.getElementById("otherPaymentAppPaymentUrl").value == " "){
      alert("Please enter the supportedMethod to create Payment Request object");
    } else {
      createPaymentRequest(false, document.getElementById("otherPaymentAppPaymentUrl").value);
    }
    return;
  }
  if(document.getElementById("phonepe").checked == true) {
    createPaymentRequest(true, "phonepe");
    return;
  }
  if(document.getElementById("gpay").checked == true) {
    createPaymentRequest(true, "gpay");
    return;
  }
}

function onPageLoad() {
  reset();
}

function onProceedSelectedAppHasEnrolledInstrument(evt) {
   paymentRequest && paymentRequest.hasEnrolledInstrument().then(function(result) {
          info("here hasEnrolledInstrument result= " + result); 
      }).catch(function(err) {
          info("here hasEnrolledInstrument error handler and error= " + err); 
      });
  console.log("We are here in onProceedSelectedApp hasEnrolledInstrument", evt);
}

function onProceedSelectedAppCanMakePayment(evt) {
   paymentRequest && paymentRequest.canMakePayment().then(function(result) {
          info("here canMakePayment result= " + result); 
      }).catch(function(err) {
          info("here canMakePayment error handler and error= " + err); 
      });
  console.log("We are here in onProceedSelectedApp canMakePayment", evt);
}

function createPaymentRequest(bDirectApp, sAppUrl){
  if (!window.PaymentRequest) {
      // paymentRequest not supported for this browser.
      info("Here paymentRequest not supported");
      return;
    }
  const transactionDetails = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '100',
        }
      }
    };
  var supportedInstruments;
  
  if(bDirectApp) {
    if(sAppUrl == "phonepe"){
      supportedInstruments = [{
          supportedMethods: ["https://mercury.phonepe.com/transact/pay"],
          data: {
              url: "upi://pay?pa=PRACT0@ybl&pn=PRACT0&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00"
          }
      }];
    }
    if (sAppUrl == "gpay"){
      supportedInstruments = [{
          supportedMethods: ["https://tez.google.com/pay"],
          data: {
             pa: 'PRACT0@ybl',
             pn: 'PRACT',
             tr: 'T2002061921587731419308',  // your custom transaction reference ID
             url: 'upi://pay?pa=PRACT0@ybl&pn=PRACT0&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00',
             mc: '5311', // your merchant category code
             tn: 'Payment',
           },
         }];
          }
  } else {
    supportedInstruments = [{
          supportedMethods: [sAppUrl],
          data: {
            url: "upi://pay?pa=PRACT0@ybl&pn=PRACT0&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00"
          }
      }];
  }
  paymentRequest = new PaymentRequest(supportedInstruments, transactionDetails);
}

function info(msg) {
  let element = document.createElement('pre');
  element.innerHTML = msg;
  element.className = 'info';
  document.getElementById('msg').appendChild(element);
}

function handlePaymentResponse(response) {
      response.complete('success')
        .then(function() {
          info('This is a demo website. No payment will be processed. ' + response);
        })
        .catch(function(err) {
          info(err);
        });
 }

function onPayClick() { 
    
  
  paymentRequest.show()
                .then(handlePaymentResponse)
                .catch(function(err) {
                  info(err);
                });


}

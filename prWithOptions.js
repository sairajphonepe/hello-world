let paymentRequestTimeout, paymentRequestPhonepe, paymentRequestGPay, paymentRequestOther, timeOutCounter= 0;
const supportedInstrumentsPhonepe = [{
          supportedMethods: ["https://mercury.phonepe.com/transact/pay"],
          data: {
              url: "upi://pay?pa=PRACT0@ybl&pn=PRACT0&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00"
          }
      }],
      supportedInstrumentGPay = [{
          supportedMethods: ["https://tez.google.com/pay"],
          data: {
             pa: 'PRACT0@ybl',
             pn: 'PRACT',
             tr: 'T2002061921587731419308',  // your custom transaction reference ID
             url: 'upi://pay?pa=PRACT0@ybl&pn=PRACT0&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00',
             mc: '5311', // your merchant category code
             tn: 'Payment',
           },
         }],
      supportedInstrumnetOthers = [{
          supportedMethods: ["temp"],
          data: {
            url: "upi://pay?pa=PRACT0@ybl&pn=PRACT0&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00"
          }
      }],
      transactionDetails = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '100',
        }
      }
    };

function reset(){
  document.getElementById('msg').innerHTML = ""; 
  createPaymentRequest();
}

function getSelctedApp() {
  if(document.getElementById("phonepe").checked == true) {
    return "phonepe";
  } else {
    return "gpay";
  }
}

function onPageLoad() {
  createPaymentRequest();
}

function onProceedSelectedAppHasEnrolledInstrument(evt) {
  let selectedApp = getSelctedApp();
  if (selectedApp == "phonepe") {
    paymentRequestPhonepe && paymentRequestPhonepe.hasEnrolledInstrument().then(function(result) {
          info("For Phonepe hasEnrolledInstrument result= " + result); 
      }).catch(function(err) {
          info("For Phonepe hasEnrolledInstrument error handler and error= " + err); 
      });
      } else {
        paymentRequestGPay  && paymentRequestGPay.hasEnrolledInstrument().then(function(result) {
          info("For GPay hasEnrolledInstrument result= " + result); 
      }).catch(function(err) {
          info("For GPay hasEnrolledInstrument error handler and error= " + err); 
      });
      }
   
  console.log("We are here in onProceedSelectedApp hasEnrolledInstrument", evt);
}

function onProceedSelectedAppCanMakePayment(evt) {
  let selectedApp = getSelctedApp();
  if (selectedApp == "phonepe") {
   paymentRequestPhonepe && paymentRequestPhonepe.canMakePayment().then(function(result) {
          info("For Phonpepe canMakePayment result= " + result); 
      }).catch(function(err) {
          info("For Phonpepe canMakePayment error handler and error= " + err); 
      });
  } else {
    paymentRequestGPay  && paymentRequestGPay.canMakePayment().then(function(result) {
          info("For GPay canMakePayment result= " + result); 
      }).catch(function(err) {
          info("For GPay canMakePayment error handler and error= " + err); 
      });
  }
  console.log("We are here in onProceedSelectedApp canMakePayment", evt);
}

function createPaymentRequest(bDirectApp, sAppUrl){
  if (!window.PaymentRequest) {
      // paymentRequest not supported for this browser.
      info("Here paymentRequest not supported");
      return;
    }
  paymentRequestPhonepe = new PaymentRequest(supportedInstrumentsPhonepe, transactionDetails);
  paymentRequestGPay  = new PaymentRequest(supportedInstrumentGPay, transactionDetails);
//   paymentRequestOther  = new PaymentRequest(supportedInstrumnetOthers, transactionDetails);
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
  let selectedApp = getSelctedApp();
    if (selectedApp == "phonepe") {
          paymentRequestPhonepe.show()
                        .then(handlePaymentResponse)
                        .catch(function(err) {
                          info(err);
                        });
    } else {
      paymentRequestGPay.show()
                        .then(handlePaymentResponse)
                        .catch(function(err) {
                          info(err);
                        });
    }


}

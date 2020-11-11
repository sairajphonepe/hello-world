let paymentRequestTimeout, paymentRequest, timeOutCounter= 0;
function onPayClick() { 
    const failure = () => {
      //In failure method.
      console.log("In failure function");
    }
    const flush = () => {
      console.log("In flush function");
      clearTimeout(paymentRequestTimeout);
    }

//     const catchHandler = () => {
//       console.log("In catch handler");
//       flush();
//       failure();
//     }

    if (!window.PaymentRequest) {
      // paymentRequest not supported for this browser.
      console.log("Here paymentRequest not supported");
      return failure();
    }

//     const success = result => {
//         flush();
//         if (!result) {
//           return failure();
//         }
//         //In success and result is true.
//         console.log("In success and result", result);
//     },
    const transactionDetails = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '100',
        }
      }
    };

paymentRequestTimeout = setTimeout(() => {
  //In timeout
  checkCanMakePayment();
  console.log("In Timeout function");
  if(timeOutCounter >1) {
      failure();
  }
}, 1000);

paymentRequest = new PaymentRequest([{
  supportedMethods: "https://mercury.phonepe.com/transact/pay"
}], transactionDetails);

// TODO:: 'BEFORE_CAN_MAKE_PAYMENT'
const hasEnrolledInstrument = typeof paymentRequest.hasEnrolledInstrument === 'function';

const checkCanMakePayment = function (){
    if (hasEnrolledInstrument) {
  paymentRequest.hasEnrolledInstrument()
    .then(result => {
        flush();
        if (!result) {
          return failure();
        }
        //In success and result is true.
        console.log("In success and result", result);
    })
    .catch(() => {
      console.log("In catch handler");
      flush();
      failure();
    });
} else {
  paymentRequest.canMakePayment()
   .then(result => {
        flush();
        if (!result) {
          return failure();
        }
        //In success and result is true.
        console.log("In success and result", result);
    })
   .catch(() => {
      console.log("In catch handler");
      flush();
      failure();
    });
  }
}
checkCanMakePayment();
}

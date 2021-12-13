let paymentRequestTimeout, paymentRequestPhonepe, paymentRequestPhonepeStage, paymentRequestGPay, paymentRequestOther, timeOutCounter= 0;
const transactionDetails = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '100',
        }
      }
    };


async function onPayClick() { 

    try {
        const payRequest = new PaymentRequest([{
                supportedMethods: ["https://mercury-stg.phonepe.com/transact/pay"],
                data: {
                    url: "upi://pay?pa=PRACT0@ybl&pn=PRACT0&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00",
                        mobileNumber: "8308171711"
                }
            }], transactionDetails);
        // const response = await makeApiCall();
        // const json = await response.json();
        const response = await payRequest.show();
        console.log("This is new response = ", response);
    } catch(err) {
        /* handle the error; AbortError usually means a user cancellation */
        console.log("We are in catch block = ", err);
    }

}

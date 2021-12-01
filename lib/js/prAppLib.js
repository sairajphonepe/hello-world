(function () {

    const canPhonepeMakePaymentCache = 'canPhonepeMakePaymentCache',
        canGpayMakePaymentCache = 'canGpayMakePaymentCache';
    const phonepeHasEnrolledInstrumentCache = 'phonepeHasEnrolledInstrumentCache',
        gpayHasEnrolledInstrumentCache = 'gpayHasEnrolledInstrumentCache';
    /*
     * Error handler 
     */
    let handleError = (err) => {
        console.log(err);
    }

    /*
     * Debugger
     */
    let debug = (content) => {
        console.log(content);
    }

    const details = {
        total: {
            label: "total",
            amount: {
                currency: "INR",
                value: "100",
            }
        }
    }

    /*
     * Supported Instruments
     */
    const phonepeSupportedInstruments = [{
            supportedMethods: "https://mercury.phonepe.com/transact/pay",
            data: {
                url: 'upi://pay?pa=merchantname0@ybl&pn=merchantname&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00',
            }
        }],
        gpaySupportedInstruments = [{
            supportedMethods: "https://tez.google.com/pay",
            data: {
                pa: 'merchantname0@ybl', // merchant-vpa
                pn: 'Merchant Name',
                tr: 'T2002061921587731419308', // Merchant Transaction Id
                url: 'upi://pay?pa=merchantname0@ybl&pn=merchantname&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00',
                mc: '1234', // your merchant category code
                tn: 'Purchase in Merchant',
            }
        }];

    /*
     * constructs a payment request object with provided details and supportedInstruments 
     */
    function initPaymentRequest(supportedInstruments) {
        if (!window.PaymentRequest) {
            debug("payment request api is not supported on the device");
            return null;
        }
        let request = new PaymentRequest(supportedInstruments, details);
        return request;
    }

    let phonepePaymentRequest, gpayPaymentRequest;

    /*
     * constructs a phonepe payment request object 
     */
    let constructPhonepeRequest = () => {
        phonepePaymentRequest = initPaymentRequest(phonepeSupportedInstruments);
    }

    /*
     * constructs a gpay payment request object 
     */
    let constructGpayRequest = () => {
        gpayPaymentRequest = initPaymentRequest(gpaySupportedInstruments);
    }

    /*
     * Checks if payment can be made through phonepe payment method.
     * store the result in sessionStorage
     */
    let canPhonepeMakePayment = () => {
        if (sessionStorage.hasOwnProperty(canPhonepeMakePaymentCache)) {
            return Promise.resolve(JSON.parse(sessionStorage[canPhonepeMakePaymentCache]));
        }

        if (!phonepePaymentRequest) {
            debug("phonepe Payment Request is not generated...");
            return false;
        }

        let canPhonepeMakePaymentPromise = Promise.resolve(true);
        if (phonepePaymentRequest.canMakePayment) {
            canPhonepeMakePaymentPromise = phonepePaymentRequest.canMakePayment();
        }

        return canPhonepeMakePaymentPromise.then((result) => {
            sessionStorage[canPhonepeMakePaymentCache] = result;
            return result;
        }).catch((err) => {
            handleError(err);
        })
    }

    /*
     * checks if payment can be made through google pay payment method 
     * store the result in sessionStorage
     */
    let canGpayMakePayment = () => {
        if (sessionStorage.hasOwnProperty(canGpayMakePaymentCache)) {
            return Promise.resolve(JSON.parse(sessionStorage[canGpayMakePaymentCache]));
        }

        if (!gpayPaymentRequest) {
            debug("gpay Payment Request is not generated...");
            return false;
        }

        let canGpayMakePaymentPromise = Promise.resolve(true);
        if (gpayPaymentRequest.canMakePayment) {
            canGpayMakePaymentPromise = gpayPaymentRequest.canMakePayment();
        }

        return canGpayMakePaymentPromise.then((result) => {
            sessionStorage[canGpayMakePaymentCache] = result;
            return result;
        }).catch((err) => {
            handleError(err);
        })
    }

    /*
     * checks if any instrument is enrolled in the phonepe app 
     * store the result in sessionStorage
     */
    let phonepeHasEnrolledInstrument = () => {
        if (sessionStorage.hasOwnProperty(phonepeHasEnrolledInstrumentCache)) {
            return Promise.resolve(JSON.parse(sessionStorage[phonepeHasEnrolledInstrumentCache]));
        }

        if (!phonepePaymentRequest) {
            debug("phonepe Payment Request is not generated...");
            return false;
        }

        let phonepeHasEnrolledInstrumentPromise = Promise.resolve(true);
        if (phonepePaymentRequest.hasEnrolledInstrument) {
            phonepeHasEnrolledInstrumentPromise = phonepePaymentRequest.hasEnrolledInstrument();
        }

        return phonepeHasEnrolledInstrumentPromise.then((result) => {
            sessionStorage[phonepeHasEnrolledInstrumentCache] = result;
            return result;
        }).catch((err) => {
            handleError(err);
        })
    }

    /*
     * checks if any instrument is enrolled in the google pay app 
     * store the result in sessionStorage
     */
    let gpayHasEnrolledInstrument = () => {
        if (sessionStorage.hasOwnProperty(gpayHasEnrolledInstrumentCache)) {
            return Promise.resolve(JSON.parse(sessionStorage[gpayHasEnrolledInstrumentCache]));
        }

        if (!gpayPaymentRequest) {
            debug("gpay Payment Request is not generated...");
            return false;
        }

        let gpayHasEnrolledInstrumentPromise = Promise.resolve(true);
        if (gpayPaymentRequest.hasEnrolledInstrument) {
            gpayHasEnrolledInstrumentPromise = gpayPaymentRequest.hasEnrolledInstrument();
        }

        return gpayHasEnrolledInstrumentPromise.then((result) => {
            sessionStorage[gpayHasEnrolledInstrumentCache] = result;
            return result;
        }).catch((err) => {
            handleError(err);
        })
    }

    /*
     *  Detects if phonepe app is installed on device
     */
    this.isPhonepeAppInstalled = async () => {
        constructPhonepeRequest();
        const canPay = await canPhonepeMakePayment();
        if (!canPay) {
            return canPay;
        }
        const instrumentEnabled = await phonepeHasEnrolledInstrument();
        return canPay && instrumentEnabled;
    }

    /*
     *  Detects if google pay app is installed on device
     */
    this.isGpayAppInstalled = async () => {
        constructGpayRequest();
        const canPay = await canGpayMakePayment();
        if (!canPay) {
            return canPay;
        }
        const instrumentEnabled = await gpayHasEnrolledInstrument();
        return canPay && instrumentEnabled;
    }

    let handleResponse = (response) => {
        response.complete("success");
        debug(response);
    }

    /*
     * opens the google pay app if installed 
     */
    this.showGpay = async () => {
        const canPay = await isGpayAppInstalled();
        if (canPay) {
            gpayPaymentRequest.show().then(handleResponse).catch((err) => {
                handleError(err);
            });
        } else {
            debug("Gpay can not make payment");
        }
    }
    
    /*
     * opens the phonepe app if installed 
     */
    this.showPhonepe = async () => {
        const canPay = await isPhonepeAppInstalled();
        if (canPay) {
            phonepePaymentRequest.show().then(handleResponse).catch((err) => {
                handleError(err);
            });
        } else {
            debug("phonepe can not make payment");
        }
    }

}());

/*
 * exposed methods are showPhonepe,showGpay,isPhonepeAppInstalled,isGpayAppInstalled 
 */
let url;

function myalert(text) {
    // show modal with the content
    $('#notify-content').html(text);
    $('#notify-modal').modal('show');
    setTimeout(() => {
        $('#notify-modal').modal('hide');
    }, 3000);
}

$('#payment').on('submit', (e) => {
    e.preventDefault();
    url = "https://shau05.github.io/transact";
    initiatePayment(url);
});

function initPaymentRequest(url) {
    if (!window.PaymentRequest) {
        return null;
    }
    let supportedInstruments = [{
        supportedMethods: "https://shau05.github.io/transact/payment-manifest.json",
        data: {
            url
        }
    }];
    const details = {
        total: {
            label: "total",
            amount: {
                currency: "INR",
                value: "100",
            }
        }
    }
    let request = new PaymentRequest(supportedInstruments, details);
    return request;
}
let success = (success_) => {
    console.log("success " + success_);
}

let toast = (message_) => {
    M.toast({
        html: message_,
        classes: 'rounded'
    });
}

let failure = (failure_) => {
    console.log("failed " + failure_);
}

let handleResponse = (response) => {
    console.log(response);
    if (response.details.message == "SUCCESS") {
        document.getElementById("notify-header").className = "modal-header bg-success";
        myalert(`<i class="fa fa-check text-light" aria-hidden="true"></i>payment successfull`);
    } else {
        document.getElementById("notify-header").className = "modal-header bg-danger";
        myalert(`<i class="fa fa-check text-light" aria-hidden="true"></i>payment failed`);
    }
}

$('#yes').on('click', () => {
    $('#userConsent').modal('hide');
});

$('#no').on('click', () => {
    initiatePayment(url);
    $('#userConsent').modal('hide');
});

let reinitiatePayment = () => {
    $('#userConsent').modal('show');
}

let initiatePayment = async (url) => {
    let request = initPaymentRequest(url);
    if (request == null) {
        failure("browser does not support payment request api");
        return;
    }
    request.canMakePayment().then((result) => {
        if (result == true) {
            success("can make payment");
            request.show().then((paymentResponse) => {
                paymentResponse.complete("success");
                handleResponse(paymentResponse);
            }).catch((err) => {
                reinitiatePayment();
                // failure(err);
            });
        } else {
            window.location.href = url;
            failure("cannot make payment");
        }
    }).catch((err) => {
        failure(err);
    });
}
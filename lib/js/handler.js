$('#card-flow').on('click', (e) => {
    $('#upi').css("display", "none");
    $('#wallet').css("display", "none");
    $('#main').css("display", "none");
    setTimeout(() => {
        $('#card').css("display", "block");
    }, 100);
});

$('#upi-flow').on('click', (e) => {
    $('#card').css("display", "none");
    $('#wallet').css("display", "none");
    $('#main').css("display", "none");
    setTimeout(() => {
        $('#upi').css("display", "block");
    }, 100);
});

$('#wallet-flow').on('click', (e) => {
    $('#card').css("display", "none");
    $('#upi').css("display", "none");
    $('#main').css("display", "none");
    setTimeout(() => {
        $('#wallet').css("display", "block");
    }, 100);
});

$('.back').on('click', (e) => {
    $('#card').css("display", "none");
    $('#wallet').css("display", "none");
    $('#upi').css("display", "none");
    setTimeout(() => {
        $('#main').css("display", "block");
    }, 100);
});

$('#card-payment').on('submit', (e) => {
    e.preventDefault();
    window.location.href = "/transact/utils/otp.html";
})

$('#otp-submit').on('submit', (e) => {
    e.preventDefault();
    window.location.href = "/transact/utils/payment-success.html";
});

$('#wallet-payment').on('submit', (e) => {
    e.preventDefault();
    $('#sub-2').css("display", "none");
    $('#p-number').prop("disabled", true);
    $('#wallet-otp-payment').css("display", "block");
});

$('#upi-payment').on('submit', (e) => {
    e.preventDefault();
    window.location.href = "/transact/utils/payment-success.html";
})

$('#wallet-otp-payment').on('submit', (e) => {
    e.preventDefault();
    $('#wallet-payment').css("display", "none");
    $('#wallet-otp-payment').css("display", "none");
    $('#wallet-pay').css("display", "block");
});

$('#wallet-pay').on('submit', (e) => {
    e.preventDefault();
    window.location.href = "/transact/utils/payment-success.html";
})
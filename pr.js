let mId, canMakePaymentResult = false;
/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */
function buildPaymentRequest(url) {
    if (!window.PaymentRequest) {
      return null;
    }
    
    const supportedInstruments = [{
        supportedMethods: "https://mercury.phonepe.com/transact/pay",
        data: {
            url: url
        }
    }];
    
//     const supportedInstruments = [
//      {
//       supportedMethods: [document.getElementById("inputSuportedMethod").value],     //['https://tez.google.com/pay'],
//       data: {
//         pa: 'PRACT0@ybl',
//         pn: 'PRACT',
//         tr: 'T2002061921587731419308',  // your custom transaction reference ID
//         url: 'upi://pay?pa=PRACT0@ybl&pn=PRACT0&am=1.0&mam=1.0&tid=YBLc6f12c2333b2495fbfd024b12ad43dc7&tr=T2002061921587731419308&tn=Payment%20for%20TX117785240954814000&mc=5311&mode=04&purpose=00',
//         mc: '5311', // your merchant category code
//         tn: 'Payment',
//       },
//     }];
  
    const details = {
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
  
    return request;
  }
  
  let request = null;
request = buildPaymentRequest();

//   document.getElementsByName("price")[0].addEventListener('change', doThing);

// function doThing() {
//     var amount = document.getElementById("inputPrice").value;
//     request = buildPaymentRequest(amount);
// }
  function onNewSupportedMethod(){
      request = buildPaymentRequest();
      request.canMakePayment().then(function(result) {
          console.log("here canMakePayment result= ", result); 
      }).catch(function(err) {
          console.log("here canMakePayment error handler and error= ", err); 
      });
  }
  function onProcessClicked() {
    
//     var amount = document.getElementById("inputPrice").value;
//     var payload = {
//        "merchantId":"M2306160483220675579140",
//        "transactionId":"TX" + Date.now(),
//        "merchantUserId":"U123456789",
//        "amount":amount,
//        "paymentScope": "MSITE_INTENT"
//     },
//     requestValue = btoa(JSON.stringify(payload)),
//     xVerifyCode = sha256(requestValue + "/v4/debit8289e078-be0b-484d-ae60-052f117f8deb");
    // sha256(requestValue).then(obj =>{
    //   console.log("here value is" + obj.hashHex + "###1");

//       var xhttp = new XMLHttpRequest(),
//        url = "https://devendradev.github.io/hello-world/proxy2.jsp?xVerify=" + xVerifyCode,
//        tagsObj={
//         "request": requestValue
//        };
       
//        xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 //return this.response;
//                // var t1 = JSON.parse(this.response);
//                var result = JSON.parse(this.response);
//                info(result.data.redirectURL);
//                request = null;
//                 request = buildPaymentRequest(amount);
//       request = buildPaymentRequest(result.data.redirectURL);
//                request.canMakePayment().then(function(result) {
//                   if(result){
//                     console.log("We are here in canMake payment handler");
                      request.show()
                .then(handlePaymentResponse)
                .catch(function(err) {
                  error(err);
                  request = buildPaymentRequest();
                });
  }


  //Method to get the sha 256
  function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value>>>amount) | (value<<(32 - amount));
  };
  
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length'
  var i, j; // Used as a counter across the whole file
  var result = ''

  var words = [];
  var asciiBitLength = ascii[lengthProperty]*8;
  
  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = sha256.h = sha256.h || [];
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = sha256.k = sha256.k || [];
  var primeCounter = k[lengthProperty];
  /*/
  var hash = [], k = [];
  var primeCounter = 0;
  //*/

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
      k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
    }
  }
  
  ascii += '\x80' // Append Ƈ' bit (plus zero padding)
  while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j>>8) return; // ASCII check: only accept characters in range 0-255
    words[i>>2] |= j << ((3 - i)%4)*8;
  }
  words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
  words[words[lengthProperty]] = (asciiBitLength)
  
  // process each chunk
  for (j = 0; j < words[lengthProperty];) {
    var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
    var oldHash = hash;
    // This is now the undefinedworking hash", often labelled as variables a...g
    // (we have to truncate as well, otherwise extra entries at the end accumulate
    hash = hash.slice(0, 8);
    
    for (i = 0; i < 64; i++) {
      var i2 = i + j;
      // Expand the message into 64 words
      // Used below if 
      var w15 = w[i - 15], w2 = w[i - 2];

      // Iterate
      var a = hash[0], e = hash[4];
      var temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
        + ((e&hash[5])^((~e)&hash[6])) // ch
        + k[i]
        // Expand the message schedule if needed
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
          )|0
        );
      // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
      var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
        + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
      
      hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
      hash[4] = (hash[4] + temp1)|0;
    }
    
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i])|0;
    }
  }
  
  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i]>>(j*8))&255;
      result += ((b < 16) ? 0 : '') + b.toString(16);
    }
  }
  return result;
}
  
  /**
   * Handles the response from PaymentRequest.show().
   */
  function handlePaymentResponse(response) {
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
                      request.show()
                        .then(response => response.complete("success"))
                        .catch(err => console.log("Error handling payment request: " + err));

    } catch (e) {
      error('Developer mistake: \'' + e.message + '\'');
      request = buildPaymentRequest();
    }
  }

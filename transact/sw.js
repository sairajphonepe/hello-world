class PromiseResolver {
  constructor() {
    this.promise_ = new Promise((resolve, reject) => {
      this.resolve_ = resolve;
      this.reject_ = reject;
    });
  }
  get promise() {
    return this.promise_
  }
  get resolve() {
    return this.resolve_
  }
  get reject() {
    return this.reject_
  }
}
let cc;

class FrontendController {
  constructor(event) {
    this.resolver = new PromiseResolver();
    this.pre = event;
    this.pre.respondWith(this.resolver.promise);
  }
  async appendClient(client) {
    this.client = client;
  }
  async authorize(paymentHandlerResponse) {
    this.resolver.resolve(paymentHandlerResponse);
  }
  async status(text) {
    return this.resolver.resolve(text);
  }
  async cancel(text) {
    return this.resolver.reject(text);
  }
}

let response = (message) => {
  return {
    methodName: cc.pre.methodData[0].supportedMethods,
    details: {
      message: message,
    }
  }
}

self.addEventListener("message", async e => {
  console.log(e);
  switch (e.data.message_type) {
    case "status":
      const result = response(e.data.message);
      await cc.status(result);
      cc = null;
      break;
  }
});

self.addEventListener('paymentrequest', e => {
  let url = e.methodData[0].data.url
  console.log(e);
  cc = new FrontendController(e);
  e.openWindow(url).then((client) => {
    if (client == null) {
      console.log("failed to open window");
    } else {
      console.log(client);
      client.postMessage({
        msg: "amount",
        total: e.total
      });
    }
  }).catch((err) => {
    console.log(err);
  });
});

self.addEventListener('canmakepayment', e => {
  console.log(e);
  e.respondWith(true);
});
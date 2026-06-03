const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.support-crm.k3xixke.mongodb.net",
  (err, records) => {
    if (err) {
      console.error("DNS Error:", err);
    } else {
      console.log(records);
    }
  }
);
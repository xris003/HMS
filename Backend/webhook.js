// const crypto = require("crypto");
// const secret = process.env.SECRET_KEY;
// // Using Express
// app.post("/my/webhook/url", function (req, res) {
//   //validate event
//   const hash = crypto
//     .createHmac("sha512", secret)
//     .update(JSON.stringify(req.body))
//     .digest("hex");
//   if (hash == req.headers["x-paystack-signature"]) {
//     // Retrieve the request's body
//     const event = req.body;
//     // Do something with event
//   }
//   res.send(200);
// });

// {
//     "event": "customeridentification.failed",
//     "data": {
//       "customer_id": 82796315,
//       "customer_code": "CUS_XXXXXXXXXXXXXXX",
//       "email": "email@email.com",
//       "identification": {
//         "country": "NG",
//         "type": "bank_account",
//         "bvn": "123*****456",
//         "account_number": "012****345",
//         "bank_code": "999991"
//       },
//       "reason": "Account number or BVN is incorrect"
//     }
//   }

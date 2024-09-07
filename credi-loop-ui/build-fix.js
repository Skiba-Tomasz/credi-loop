var fs = require("fs");

fs.readFile(
  "./node_modules/@requestnetwork/utils/dist/crypto/crypto-wrapper.js",
  "utf8",
  function (err, data) {
    if (err) return console.log(err);

    var result = data.replace(
      `require("crypto");`,
      "require('crypto-browserify');"
    );

    fs.writeFile(
      "./node_modules/@requestnetwork/utils/dist/crypto/crypto-wrapper.js",
      result,
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );
  }
);

// fs.readFile(
//   "./node_modules/cipher-base/index.js",
//   "utf8",
//   function (err, data) {
//     if (err) return console.log(err);

//     var result = data.replace(
//       "require('stream')",
//       "require('stream-browserify')"
//     );

//     fs.writeFile(
//       "./node_modules/cipher-base/index.js",
//       result,
//       "utf8",
//       function (err) {
//         if (err) return console.log(err);
//       }
//     );
//   }
// );

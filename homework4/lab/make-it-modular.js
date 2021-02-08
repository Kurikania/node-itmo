const lslib = require("./mymodule");

const dirname = process.argv[2];
const ext = process.argv[3];

lslib(dirname, ext, function (err, files) {
  if (err) {
    return console.error("There was an error:", err);
  }
  for (i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});

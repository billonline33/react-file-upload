const IncomingForm = require("formidable").IncomingForm;
var fs = require('fs'), path = require('path');

module.exports = function upload(req, res) {
  var form = new IncomingForm();

  //var uploadDir = "./git/upload_file/";
  const uploadDir = path.join(__dirname,'/uploads/')
  console.log("0000, __dirname=",__dirname );
  console.log("0001, uploadDir=",uploadDir );

  form.on("file", (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path

  });

  form.on("end", () => {
    //res.json();
  });

  //form.parse(req);

  form.parse(req, function (err, fields, files) {
    // oldpath : temporary folder to which file is saved to
    var oldpath = files.file.path;
    var newpath = uploadDir + files.file.name;

    // copy the file to a new location
    fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        // you may respond with another html page
        res.write('File uploaded and moved!');
        res.end();
    });
});
};

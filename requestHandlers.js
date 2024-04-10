const querystring = require("querystring");
const fs = require("fs");
const formidable = require("formidable");

function start(response, request) {
  console.log("Request handler 'start' was called.");

  const body =
    "<html>" +
    "<head>" +
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    "</head>" +
    "<body>" +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" multiple="multiple" >' +
    '<input type="submit" value="Upload file" />' +
    "</form>" +
    "</body>" +
    "</html>";

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  const form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function (error, fields, files) {
    console.log("parsing done");
    console.log(123, files);

    if (files.upload && files.upload[0]) {
      fs.renameSync(files.upload[0].filepath, "./tmp/test.png");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("received image:<br/>");
      response.write("<img src='/show' />");
      response.end();
    } else {
      console.error("No file was uploaded.");
    }
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");

  fs.readFile("./tmp/test.png", "binary", (error, file) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "image/png" });
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

const http = require("http");
const url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    // 不处理 favicon.ico 请求
    if (pathname === "/favicon.ico") return;

    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);

  console.log("Server has started.");
}

exports.start = start;

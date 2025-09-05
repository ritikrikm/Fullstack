const http = require("http");

const server = http.createServer((req,res)=>{
switch(req.method){
    case "GET" : 
        console.log(router(req.url));
    break;
    case "POST" : break;
}
res.end("Hello")
});
function router(route) {
  //  if(!route) throw new Error("Err in route")
  console.log(route);
    if(route === "/") return "Entered Home"
    else if(route==="/contact") return "Entered in Contact"
    else return "route not aval"

}

server.listen(8001);
function miniExpress(){
const routes = {
    LAO:{

        // "/": (req, res) => res.end("Hello from LAO")
    },
    DEO:{}
}
    function app(req,res){
        const method = req.method;
        const url = req.url;
        const handler = routes[method]?.[url];
        if(handler){
            handler(req, res);  
        }else{
            res.statusCode = 404;
            res.end("Not Found");
        }

    }
    app.lao = (path,handler)=>{ routes.LAO[path] = handler}
    app.deo = (path,handler)=>{ routes.DEO[path] = handler}
    app.suno= (PORT)=>{
        const http = require("http");
        const server = http.createServer(app);
        server.listen(PORT , ()=>{
            console.log(`Listening on ${PORT}`)
        })
    };

return app;
}

exports.miniExpress = miniExpress;
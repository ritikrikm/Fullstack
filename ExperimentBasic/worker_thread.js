const fs = require("fs");
const crypto = require("crypto")
//Hey timeOut TICK(immed after entering readFile)
setTimeout(()=>{console.log("timeOut")},0);

setImmediate(()=>{console.log("Immediate")});

crypto.pbkdf2('password' , 'salt1' , 100000 , 64 , 'sha512' , (err , data)=>{
    console.log("passwordBIG")
})
//https://app.eraser.io/workspace/GOpTi6SFwdVKhNzhpS8a?origin=share
fs.readFile("sample.txt" ,"utf-8" ,function (err , data){
    // setTimeout(()=>{console.log("timeOut READ")},0);
    // setImmediate(()=>{console.log("Immediate READ")});
    process.nextTick(()=>{
        console.log("TICK");
        })
       
        Promise.resolve().then(()=>{console.log("I am promise")})
    fs.readFile("sample.txt" ,"utf-8" ,function (err , data){
        // setTimeout(()=>{console.log("timeOut READ READ")},0);
        // setImmediate(()=>{console.log("Immediate READ READ")});
        process.nextTick(()=>{
            console.log("TICK");
            })
        fs.readFile("sample.txt" ,"utf-8" ,function (err , data){
            process.nextTick(()=>{
                console.log("TICK");
                })
        
            console.log( process.env.UV_THREADPOOL_SIZE)
            // setTimeout(()=>{console.log("timeOut READ READREAD")},0);
            // setImmediate(()=>{console.log("Immediate READ READREAD")}); 
            const startDate = Date.now();
            process.env.UV_THREADPOOL_SIZE = 100;
            crypto.pbkdf2('password' , 'salt1' , 100000 ,1024, 'sha256' , (err,data)=>{
                console.log(`${Date.now() - startDate}ms time took by password 1`);
            } )
            crypto.pbkdf2('password' , 'salt1' , 100000 ,1024, 'sha256' , (err,data)=>{
                console.log(`${Date.now() - startDate}ms time took by password 2`);
            } )
            crypto.pbkdf2('password' , 'salt1' , 100000 ,1024, 'sha256' , (err,data)=>{
                console.log(`${Date.now() - startDate}ms time took by password 3`);
            } )
            crypto.pbkdf2('password' , 'salt1' , 100000 ,1024, 'sha256' , (err,data)=>{
                console.log(`${Date.now() - startDate}ms time took by password 4`);
            } )
            crypto.pbkdf2('password' , 'salt1' , 100000 ,1024, 'sha256' , (err,data)=>{
                console.log(`${Date.now() - startDate}ms time took by password 5`);
            } )
            
        })
    })
})
console.log("Hey");

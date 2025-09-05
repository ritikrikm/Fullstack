const fs = require("fs"); //import statement like
fs.writeFile("hello.js" , 
    "console.log(Hello boy);",()=>{}
)
//so this code is basially wrapped in an anonym function
console.log(fs.promises);
fs.promises.rik = ()=>{
    console.log("I am from internal world");
};
console.log(fs.promises.rik)
console.log(fs.promises.rik())



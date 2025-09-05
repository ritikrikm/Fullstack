const {miniExpress} = require("./reeks.js");
 const app = miniExpress();
 app.lao("/", (req, res) => res.end("Hello from LAO"));
 console.log(app);
 app.suno(8000)
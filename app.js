const Mock = require("mockjs"),
    _ = require("lodash"),
    delay = require("express-delay"),
    http = require("http"),
    express = require("express"),
    fs = require("fs"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    query = require("./db/query"),
    app = express(),
    expressWs = require("express-ws")(app);

const router = require("./route");
const login = require("./actions/login.js");
const cookieParser = require("cookie-parser");

app.use("/public", express.static("dist"));
app.use(bodyParser.json({ limit: "1mb" })); //解析post数据
app.use(cors());
app.use(cookieParser());
// app.use(login)
app.use("/", router);



// app.use(delay(1, 1000));

app.ws("/mqsas/test2", function(ws, req) {
    ws.on("message", function(msg) {
        console.log(msg);
    });
    setInterval(function timeout() {
        // ws.send('xiong---');
    }, 500);
});

app.listen(3001, function(err, result) {
    if (err) return console.log(err);
    console.log("mock listen at 3001");
});

module.exports = app;

function sendSuccess(data = {}) {
    return {
        status: true,
        data: data
    };
}

function sendError(reseans = "") {
    return {
        status: false,
        reseans: reseans
    };
}

const express = require("express");
// Models & DB

const db = require('./db')

//Init
const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
//include all yours middlewares
// Routers

const bodyParser = require("body-parser");
const bodyParserMiddleWare = bodyParser.json();
const cors = require("cors");
const corsMiddleWare = cors();

const UserRoute = require('./user/router')
const LoginRoute = require('./auth/router')
const ExpenseRoute = require('./ExpenseTracker/router')

app.use(corsMiddleWare)
app.use(bodyParserMiddleWare)

app.get('/test', (req, res) => {
    console.log("hello world")
    res
        .status(200)
        .send("hello world")
})

app
    .use(UserRoute)             //for signup
    .use(LoginRoute)            //for login 
    .use(ExpenseRoute)


app.listen(PORT, (req, res) => console.log(`App is listening at ${PORT}`))

const express = require('express'), app = express(), bodyParser = require("body-parser")

const kue  = require("./kue")
require("./worker")

app.use(bodyParser.json())

app.post("/book-ticket",
    async(req,res) =>{
            let args = {
                jobName: "sendEmail",
                time:15000,
                params: {
                    email:req.body.email,
                    subject:"Booking Confirmed",
                    body:"Your booking is confirmed!!"
                }
            };
            kue.scheduleJob(args)
            args = {
                jobName: "sendEmail",
                time: req.body.delay,
                params : {
                    email: req.body.email,
                    subject: "Movie starts in 10 minutes",
                    body: "Your movie will start in 10 minutes, Hurry"
                }
            };
            kue.scheduleJob(args)
            return res.status(200).json({
                response:"booking successfull"
            })
    })
app.listen(8080, ()=> console.log(`Hey there! I'm Listening`))
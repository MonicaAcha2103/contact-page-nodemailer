const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.options('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.post('/api/form', (req,res) => {
    
    //console.log(req.body)
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3> Contact Details </h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            //secure: false, // true for 465, false for other ports
            auth: {
              user: 'monicatest@gmail.com', 
              pass: 'testme' 
            }
          });

          let mailOptions = {
            from: 'test@testaccount.com', 
            to: 'monicaacha2103@gmail.com', // list of receivers
            subject: "New Message", // Subject line
            text: req.body.message, // plain text body
            html: htmlEmail // html body
          };

          transporter.sendMail(mailOptions, (err, info) => {
              if(err) {
                  console.log(err)
              }
              console.log(`Message sent: ${info}`)
              console.log(`Message URL: ${nodemailer.getTestMessageUrl(info)}`)
          })       
    })
})
const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
const router = require('express').Router()
module.exports = router
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
require('dotenv').config()


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

let mailOptions = {
  from: "ORDER CONFIRMATION <syntacticallysugarconfirmation@gmail.com>",
  to: "",
  subject: "",
  text: "",
  html: '<h1></h1>'
}

router.post('/', async(req, res, next)=>{
  try{
    const data = req.body
    mailOptions = {...mailOptions, to:data.email, subject:`Order confirmation for ${data.orderId}`, text: data.message, html: `<h1>${data.message}</h1>`}
    await sendMail(mailOptions)
    console.log('confirmation sent')
    res.sendStatus(200)
  }catch(err){
    console.log('error sending email')
    next(err)
  }
})

async function sendMail(mailOptions){
  try{
    const accessToken = await oAuth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth:{
        type: 'OAuth2',
        user: 'syntacticallysugarconfirmation@gmail.com',
        clientId : CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    const result = await transporter.sendMail(mailOptions)

    return result

  }catch(err){
    return err
  }
}

// sendMail(mailOptions)
//   .then(result => console.log('Email send...', result))
//   .catch(error => console.log(error.message))
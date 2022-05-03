const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '935021820603-2jphugvsfs0kr9tgf5aot5f3nips2r6m.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Ls6AVzt4KNlCgYIARAAGAQSNwF-L9IrHdSrQwN5CD7klfr6y0tOct4k2wNICj0Ke6aKFOqN0paLLZ-TjxxU7m-YYfwxAGIKeB0'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

let mailOptions = {
  from: "ORDER CONFIRMATION <syntacticallysugarconfirmation@gmail.com>",
  to: "",
  subject: "",
  text: "",
  html: '<h1></h1>'
}

router.post('/', async(req, res, next)=>{
  try {
    const data = req.body
    mailOptions = {...mailOptions, to: data.email, subject: `Order confirmation for Order #${data.orderId}`, text: data.message, html: `<h1>${data.message}</h1>`}
    await sendMail(mailOptions)
    res.sendStatus(200)
  } catch(err) {
    console.log('error sending email')
    next(err)
  }
})

async function sendMail(mailOptions){
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: 'OAuth2',
        user: 'syntacticallysugarconfirmation@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    const result = await transport.sendMail(mailOptions)

    return result

  } catch(err) {
    return err
  }
}

// sendMail(mailOptions)
//   .then(result => console.log('Email sent...', result))
//   .catch(error => console.log(error.message))
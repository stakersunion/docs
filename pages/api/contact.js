export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, message } = req.body

    const { createTransport } = require('nodemailer')

    const transporter = createTransport({
      host: 'smtp.dreamhost.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: 'thame@stakersunion.com',
      to: 'tomfadial@gmail.com',
      subject: 'Stakers Union Contact Form',
      text: `
        Email: ${email}
        Message: ${message}
      `,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        res.status(500).json({ message: 'Error sending email' })
      } else {
        console.log('Email sent: ' + info.response)
        res.status(200).json({ message: 'Email sent successfully' })
      }
    })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}

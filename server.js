const express = require('express');
const nodemailer = require('nodemailer');
// const fileUpload = require('express-fileupload');
const bodyparser = require('body-parser');

const app = express();

// app.use(fileUpload());

app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.render('/index.html');
});

app.post('/mail', function(req, res) {
    // console.log(req.files.file);

    let mailOptions = {
        from: req.body.name + '<'+req.body.email+'>', // sender address '"Fred Foo 👻" <foo@blurdybloop.com>'
        to: 'iemelyanchik@gmail.com', // list of receivers
        subject: 'KODEKITCHEN message', // Subject line
        text: req.body.description, // plain text body
        html: 'Имя: '+req.body.name+'<br>' +
        '<p>E-MAIL: '+req.body.email+'</p>' +
        '<p>Номер телефона: '+req.body.phone+'</p>' +
        '<p>Сообщение: '+req.body.message+'</p>'// html body
    };
    res.send('sent');
    // if(req.files.file){
    //     mailOptions.attachments = [{
    //         filename: req.files.file.name,
    //         path : 'uploads/'+ req.files.file.name,
    //         contentType: 'base64'
    //     }];
    //
    //     let sampleFile = req.files.file;
    //     sampleFile.mv('./uploads/' + req.files.file.name, function (err) {
    //         if (err)
    //             return res.status(500).send(err);
    //
    //         res.send('file uploaded!');
    //     });
    // } else {
    //     res.send('no file');
    // }

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'iemelyanchik@gmail.com', // generated ethereal user
            pass: 'qwe407372'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
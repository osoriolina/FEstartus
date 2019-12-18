const express = require('express')
const server = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const https = require('https')

const cors = require('cors')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const jwtChecker = require('express-jwt')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const logger = require('./logger')
const { check, validationResult } = require('express-validator')

//sendMail - alerter

const colors = require('colors')

const Company = require('./models/companyForm')
const Startup = require('./models/startupForm')
const User = require('./models/users')


//secrets
const secretsFile = fs.readFileSync('secrets.json')
const secrets = JSON.parse(secretsFile)
const valueMongo = secrets['mongo']


// Middleware 
server.use(cors())
server.use(bodyparser.json())
server.use(cookieParser())
server.use(jwtChecker({
    secret: secrets['jwt_clave'],
    getToken: (req) => {
        return req.cookies['jwt']
    }
}).unless({ path: ['/register', '/login'] }))



// Mongoose server local host
mongoose.connect(`mongodb+srv://Lina:${valueMongo}@startus-pk2va.mongodb.net/test`, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) throw err;

    // endpoints FORMS

    // GET Companies - FORM /Checked
    server.get('/companies', (req, res) => {
        Company.find((err, data) => {
            if (err) res.send(err);
            res.send(data)
        })
    })

    // GET Companies - FORM /Checked
    server.get('/companies/:id', (req, res) => {
        let usuarioID = req.params.id;
        Company.findById(usuarioID, (err, data) => {
            if (err) res.send(err);
            res.send(data)
        })
    })


    // GET my company

    server.get('/mycompany', (req, res) => {
        const token = req.cookies['jwt']
        jwt.verify(token, secrets["jwt_clave"], (error, decoded) => {
            console.log(decoded._id);

            if (error) {
                res.send(error)
            } else {
                Company.findOne({ "user": decoded._id }, (err, data) => {
                    if (err) res.send(err);
                    res.send(data)
                })
            }
        })
    })


    /* // GET Companies - FORM /Checked
    server.get('/companies/:id', (req, res) => {
        let usuarioID = req.params_id;
        const token = req.cookies['jwt']
        jwt.verify(token, secrets["jwt_clave"], (error, decoded) => {
            if (error) {
                res.send(error)
            } else {
                console.log(decoded)
                if (usuarioID == decoded['_id']) {
                    console.log('userID está mal')
                    Company.findOne({ user: usuarioID }, (err, data) => {
                        if (err) res.send(err);
                        res.send(data)
                    })
                }
            }
        });

    }) */

    // POST - Companies filtered
    server.post('/companies', [

    ], (req, res) => {

        let objFilter = req.body;
        let keys = Object.keys(objFilter);

        console.log(keys);
        console.log(objFilter);

        for (let i = 0; i < keys.length; i++) {

            if (keys[i] == 'expertise' && objFilter[keys[i]] != "") {
                objFilter[keys[i]] = { $regex: ".*" + objFilter[keys[i]] + ".*" }
            }

            if (objFilter[keys[i]] == '') {

                console.log(objFilter[keys[i]]);

                delete objFilter[keys[i]];

            }


        }

        Company.find(objFilter, (err, data) => {
            if (err) res.send(err);
            res.send(data)
        })

    })

    /* // GET Startups - FORM
     server.get('/startups', (req, res) => {
         Startup.find((err, data) => {
             if (err) res.send(err);
             res.send(data)
         })
     }) */

    // GET Users /Checked
    server.get('/users', (req, res) => {
        User.find((err, data) => {
            if (err) res.send(err);
            res.send(data)
        })
    })

    // POST - REGISTER User /Checked
    server.post('/register', [
        check('email').isEmail().withMessage('error').trim().escape(),
        check('password').trim().escape()
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        } else {
            bcrypt.hash(req.body.password, 12, (err, hash) => {
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                })
                newUser.save((err) => {
                    if (err) res.send(err);
                    res.send({ 'message': 'Successfully registered' })
                })
            })
        }
    })

    // POST - Login

    server.post('/login', [
        check('email').trim().escape().isEmail(),
        check('password').trim().escape()
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        } else {
            User.findOne({ email: req.body.email }, (err, data) => {
                if (err) throw err
                //console.log(data);
                if (data === null) {
                    res.send({ 'message': 'User does not exist' })
                } else {
                    bcrypt.compare(req.body.password, data.password, (err, result) => {
                        if (result) {
                            let token = jwt.sign({ '_id': data._id }, secrets["jwt_clave"]);
                            res.header('Set-Cookie', `jwt=${token}; httpOnly; maxAge: 99999`);;
                            res.send({ "logged": true })
                        } else {
                            res.send({ 'message': 'Incorrect password' })
                        }
                    })
                }

            })
        }
    })

    // POST Companies - FORM - w/autopopulate /Checked
    server.post('/company/profile', [
        check('logo').trim().escape(),
        //check('name').trim().escape(),
        check('tagline').trim().escape(),
        check('website').trim().escape(),
        check('description').trim().escape(),
        check('industry').trim().escape(),
        check('companySize').trim().escape(),
        check('companyType').trim().escape(),
        check('yearFounded').trim().escape(),
        //check('expertise').trim().escape(),
        //check('languages').trim().escape(),
        check('country').trim().escape(),
        check('city').trim().escape(),
        check('address').trim().escape(),
        check('phone').trim().escape(),
        check('email').trim().escape().isEmail(),
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        } else {

            const token = req.cookies['jwt']
            jwt.verify(token, secrets["jwt_clave"], (error, decoded) => {
                if (error) {
                    res.send(error)
                } else {
                    console.log(decoded)
                    const newCompany = new Company({
                        _id: mongoose.Types.ObjectId(),
                        logo: req.body.logo,
                        name: req.body.name,
                        tagline: req.body.tagline,
                        website: req.body.website,
                        description: req.body.description,
                        industry: req.body.industry,
                        companySize: req.body.companySize,
                        companyType: req.body.companyType,
                        yearFounded: req.body.yearFounded,
                        expertise: req.body.expertise,
                        languages: req.body.languages,
                        country: req.body.country,
                        city: req.body.city,
                        address: req.body.address,
                        phone: req.body.phone,
                        email: req.body.email,
                        user: decoded['_id']
                    })

                    newCompany.save((err) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({ "status": "Profile details saved." })
                        }
                    })
                }
            })

        }

    })

    // POST Startups - FORM - w/autopopulate /Checked
    /*   server.post('/startup/profile', (req, res) => {
           const newStartup = new Startup({
               _id: mongoose.Types.ObjectId(),
               logo: req.body.logo,
               name: req.body.name,
               tagline: req.body.tagline,
               website: req.body.website,
               description: req.body.description,
               industry: req.body.industry,
               companySize: req.body.companySize,
               companyType: req.body.companyType,
               yearFounded: req.body.yearFounded,
               expertise: req.body.expertise,
               languages: req.body.languages,
               country: req.body.country,
               city: req.body.city,
               address: req.body.address,
               phone: req.body.phone,
               email: req.body.email,
               user: req.body.user
           })
           newStartup.save((err) => {
               if (err) res.send(err);

               Startup.findById(newStartup._id, (err, result) => {
                   res.send(result)
               })
           })
       })  */

    // PUT Companies - FORM /Checked
    server.put('/company/edit', (req, res) => {
        Company.findByIdAndUpdate(
            req.body._id,
            {
                $set: req.body
            },
            (err) => {
                if (err) res.send(err);
                res.send({ 'message': 'Successfully edited' })
            }
        )
    })

    /*   // PUT Startups - FORM /Checked
       server.put('/startup/edit', (req, res) => {
           Startup.findByIdAndUpdate(
               req.body._id,
               {
                   $set: req.body
               },
               (err) => {
                   if (err) res.send(err);
                   res.send({ 'message': 'Successfully edited' })
               }
           )
       }) */

    // DELETE Companies - FORM /Checked
    server.delete('/company/delete/:id', (req, res) => {
        Company.findByIdAndRemove(req.params.id, (err) => {
            if (err) res.send(err);
            res.send({ 'message': 'Successfully deleted' })
        })
    })

    /*
    // DELETE Startups - FORM /Checked
    server.delete('/startup/delete/:id', (req, res) => {
        Startup.findByIdAndRemove(req.params.id, (err) => {
            if (err) res.send(err);
            res.send({ 'message': 'Successfully deleted' })
        })
    })  */

    https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/startus.es/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/startus.es/fullchain.pem')
    }, server)
        .listen(3000, () => {
            console.log(('Conectado puerto 3000').green);

        })

})
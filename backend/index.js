
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 8080,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')
const { apiResolver } = require('next/dist/next-server/server/api-utils')

const db = require('./database.js')
let users = db.users
let student = db.student

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

let movies = {
    list: [
        { id: 1, type: 'Romantic', name: "Love at first side", ratting: 8, part: 1 , ToComeOut: 2012, time: 125 },
        { id: 2, type: 'Fantase', name: "Persi Jacsant", ratting: 9.5, part: 2 , ToComeOut: 2007, time: 120}
    ]
}
let income = 0

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

router.get('/foo',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send('foo')
    });

    router.route('/name')
    .get((req, res) => res.json(movies.list))
    .post((req, res) => {
        console.log(req.body)
        let newPet = {}
        newPet.id = (movies.list.length) ? movies.list[movies.list.length - 1].id + 1 : 1
        newPet.type = req.body.type
        newPet.name = req.body.name
        newPet.ratting = req.body.ratting
        newPet.part = req.body.part
        newPet.ToComeOut = req.body.ToComeOut
        newPet.time = req.body.time
        movies = { "list": [...movies.list, newPet] }
        res.json(movies.list)
    })

router.route('/name/:pet_id')
    .get((req, res) => {
        const pet_id = req.params.pet_id
        const id = movies.list.findIndex(item => +item.id === +pet_id)
        res.json(movies.list[id])
    })
    .put((req, res) => {
        const pet_id = req.params.pet_id
        const id = movies.list.findIndex(item => +item.id === +pet_id)
        movies.list[id].id = req.body.id
        movies.list[id].type = req.body.type
        movies.list[id].name = req.body.name
        movies.list[id].ratting = req.body.ratting
        movies.list[id].part = req.body.part
        movies.list[id].ToComeOut = req.body.ToComeOut
        movies.list[id].time = req.body.time
        res.json(movies.list)
    })
    .delete((req, res) => {
        const pet_id = req.params.pet_id
        movies.list = movies.list.filter(item => +item.id !== +pet_id)
        res.json(movies.list)
    })



router.route('/income')
    .get((req, res) => res.json(income))



router.route('/purchase/:pet_id')
    .delete((req, res) => {
        const pet_id = req.params.pet_id
        const id = movies.list.findIndex(item => +item.id === +pet_id)
        console.log('PetID: ', pet_id, 'ID: ', id)
        if (id !== -1) {
            income += movies.list[id].price
            movies.list = movies.list.filter(item => +item.id !== +pet_id)
            res.json(movies.list)
        }
        else {
            res.send('Not found')

        }
    })

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))


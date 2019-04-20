const express = require("express");
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        name: "Welcome to the Nodejs Api with JWT"
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    res.json({
        message: "You have successfully created your post..."
    });
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        name: "Jewel Rana",
        email: "jewelrana.dev@gmail.com"
    }

    jwt.sign({ user }, 'mysecret', { expiresIn: "30s"}, (err, token) => {
        res.json({ token });
    });
});

function verifyToken(req, res, next) {
    const bearerToken = req.headers['authorization'];

    //check bearer token is not undefined
    if (typeof bearerToken !== 'undefined') {
        
    } else {
        res.status(403).json({
            message: "You are not authorized!"
        });
    }

    //parse token
    const bearer = bearerToken.split(" ");
    const token = bearer[1];

    //verify users token
    if (jwt.verify(token, 'mysecret', (err, authData) => {
        if (err) {
            res.status(403).json({
                message: "Your session expired"
            });
        } else {
            next();
        }
    }));
}

app.listen(5000, () => console.log('Server Started on port 5000'));
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routers
const userRouter = require('./routes/user');


app.use(userRouter);

const mongoURI = 'mongodb://localhost:27017/milktea';
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connecting to ${mongoose.connection.name} database`)
    })
    .catch(error => {
        console.error(error);
    });

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Database
const mongoURI = 'mongodb://localhost:27017/milktea';

mongoose.connect(
    mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log(`Connecting to ${mongoose.connection.name} database`)
    })
    .catch(error => {
        console.error(error);
    });

// Server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routers
const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');
const categoryRouter = require('./routes/category');
const adminRouter = require('./routes/admin');
const orderRouter = require('./routes/order');

app.use('/users', userRouter);
app.use('/items', itemRouter);
app.use('/categories', categoryRouter);
app.use('/admins', adminRouter);
app.use('/orders', orderRouter);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

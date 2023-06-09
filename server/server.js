require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDb = require('./config/dbConn')
const mongoose = require('mongoose')

const port = process.env.PORT || 5000;

connectDb();


app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/roots'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/category', require('./routes/categoryRoutes'))
app.use('/author', require('./routes/authorRoute'))
app.use('/language', require('./routes/languageRoute'))
app.use('/book', require('./routes/bookRoutes'))
app.use('/rating', require('./routes/ratingRoutes'))
app.use('/library', require('./routes/libraryRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    })
})

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
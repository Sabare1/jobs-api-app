const express = require('express');
const app = express();
const helmet = require('helmet');
const {xss} = require('express-xss-sanitizer');
const cors = require('cors');
const rateLimiter = require('express-rate-limit')

require('dotenv').config()
const port = process.env.PORT || 3000;

const connectDB = require('./db/connectDB.js');
const url = process.env.MONGO_URI;

const errorHandleMiddleware = require('./middleware/error-handler.js');
const notFoundMiddleware = require('./middleware/not-found.js');
const authMiddleware = require('./middleware/authentication.js')

const authRoute = require('./routes/auth.js');
const jobsRoute = require('./routes/jobs.js');

app.set("trust proxy", 1);
app.use(rateLimiter({
    windowMs: 15*60*1000,
    max: 100
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
    res.send("Jobs API");
})
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', authMiddleware, jobsRoute);

app.use(errorHandleMiddleware);
app.use(notFoundMiddleware);

const start = () => {
    try {
        app.listen(port, async()=> {
            await connectDB(url);
            console.log(`connected to the DB...`)
            console.log(`Server is listening on the port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();
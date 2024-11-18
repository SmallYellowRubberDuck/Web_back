const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const sequelize = require('./config/sequelize.config.js');
const authRoutes = require('./routes/authRoutes.js')
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}))
app.use(bodyParser.json());

app.use('/auth', authRoutes);


sequelize.authenticate()
.then(() => {
    console.log('Database connected');
    sequelize.sync({forse: false}).then(()=>{console.log('Database synchronized')});
    app.listen(process.env.PORT || 3000, () =>{
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
}).catch((err) => console.error('Unable to connect to database', err));
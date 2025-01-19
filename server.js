const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const sequelize = require('./config/sequelize.config.js');
const authRoutes = require('./routes/authRoutes.js');
const filterRoutes = require('./routes/filterRoutes.js');
const audioRoutes = require('./routes/audioRoutes.js');
const libraryRoutes = require('./routes/libraryRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
require('dotenv').config();
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Disposition'],
}))
app.use(bodyParser.json());
app.use('/api/uploads', express.static('C:\\podcasts\\audio'));
app.use('/api/auth', authRoutes);
app.use('/api/filter', filterRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/audio', audioRoutes);
app.use('/api/comments', commentRoutes);


sequelize.authenticate()
.then(() => {
    console.log('Database connected');
    sequelize.sync({forse: false}).then(()=>{console.log('Database synchronized')});
    app.listen(process.env.PORT || 3000, () =>{
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
}).catch((err) => console.error('Unable to connect to database', err));
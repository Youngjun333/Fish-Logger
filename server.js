if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

const indexRouter = require('./routes/index');
const fishRouter = require('./routes/fish');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

app.use('/', indexRouter);
app.use('/fish', fishRouter);


app.listen(process.env.PORT || 3000);
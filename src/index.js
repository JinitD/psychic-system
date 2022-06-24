const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const consumer = require('../mq/consumer');
//initializations   
const app = express();

//settings
app.set('port', process.env.PORT || 5000); 
//settings-Handelbars
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));
app.set('view engine', '.hbs');

//Midelware
app.use(morgan('dev'));
app.use(express.urlencoded({extends: false}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//global variables
app.use((req,res,next)=>{
    next();
})

//Routes
app.use(require('./router'));



//pulbic
app.use(express.static(path.join(__dirname,'public')))

//Star server
app.listen(app.get('port'), () => {
    console.log('Server en el puerto', app.get('port'));
});


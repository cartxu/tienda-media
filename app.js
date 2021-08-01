require('./config/mongoose');
const createError = require('http-errors');
const Handlebars = require('handlebars');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const session = require('express-session');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const winston = require('./config/winston');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const comprasRouter = require('./routes/compras');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
require('./config/passports');


// view engine setup
app.set('views',path.join(__dirname, 'views'))
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts'),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {
    shortDesc(desc) {
        if (desc.length < 60) {
            return desc;
        }

        return desc.substring(0, 61) + '(...)';
    }, ifCond(a,b,options) {
      a.toString();
      a.toString();
      return (a === b) ? options.fn(this) : options.inverse(this);
      
    }
}
}))
app.set('view engine', 'hbs');



//Middlewares
app.use(logger('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'tiendasecret',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/ecommerce'}),
  cookie: {
    expires: false,
    secure: false
}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/compras', comprasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

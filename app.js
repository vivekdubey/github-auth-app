var express = require('express');
var app = express();
const config = require('./config')();
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public/static'));

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: config.cookieMaxAge }
}));

require('./lib/passport')(app);

const githubAuthRouter = require('./routes/auth');
app.use('/auth',githubAuthRouter);

const mfaRouter = require('./routes/mfa');
app.use('/mfa',mfaRouter);

const userRouter = require('./routes/user');
app.use('/', userRouter);

const port = config.port;
console.log(`port: ${port}`)
app.listen(port);

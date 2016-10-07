var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.use('/', routes);
app.use('/users', users);

app.get('/stock/:stockId', function(req, res) {
  var stock_id = req.params.stockId;
  var response = {
    "bse": {
        "PX_LAST": 100.444,
        "change": 8.45,
        "perc_change": 2.66,
        "prev_close": 1.55,
        "open_price": 2.75,
        "day_high": 3.95,
        "day_low": 4.95
      },
      "nse": {
        "PX_LAST": 200.444,
        "change": 8.45,
        "perc_change": 2.66,
        "prev_close": 5.55,
        "open_price": 6.75,
        "day_high": 7.95,
        "day_low": 8.95
      }
  }
  res.status(200).json(response) 
})

app.get('/bqmumfeed/finance-api/quote/:stock', function(req, res) {
  var stock = req.params.stock;
  console.log("Stock::::", stock);
  var response;
  if(stock === "NIFTY BANK") {
    response = [
        {
        "CHG_NET_1D": 221.35,
        "CHG_PCT_1D": 1.15,
        "EXCHANGESYMBOL": "NIFTY BANK",
        "ID": 4,
        "NAME": "Nifty Bank",
        "PREVCLOSE": 19217,
        "PX_LAST": 19438.35,
        "UPDATEDATETIME": "2016-08-30T11:13:15.327"
        }
        ]
  } else if(stock === "S&P CNX NIFTY") {
    response = [
        {
        "CHG_NET_1D": 62.95,
        "CHG_PCT_1D": 0.73,
        "EXCHANGESYMBOL": "S&P CNX NIFTY",
        "ID": 1,
        "NAME": "Nifty 50",
        "PREVCLOSE": 8607.45,
        "PX_LAST": 8670.4,
        "UPDATEDATETIME": "2016-08-30T11:13:30.223"
        }
        ]
  } else if(stock === "SENSEX") {
    response = [
      {
      "CHG_NET_1D": 200.62,
      "CHG_PCT_1D": 0.72,
      "EXCHANGESYMBOL": "SENSEX",
      "ID": 4663,
      "NAME": "Sensex",
      "PREVCLOSE": 27902.66,
      "PX_LAST": 28103.28,
      "UPDATEDATETIME": "2016-08-30T11:13:43.743"
      }
      ]
  } else if (stock === "S&P BSE Midcap") {
    response = [
        {
        "CHG_NET_1D": 100.9,
        "CHG_PCT_1D": 0.77,
        "EXCHANGESYMBOL": "S&P BSE MIDCAP",
        "ID": 4669,
        "NAME": "BSE Midcap",
        "PREVCLOSE": 13064.33,
        "PX_LAST": 13165.23,
        "UPDATEDATETIME": "2016-08-30T11:13:53.323"
        }
        ]
  } else {
    throw new Error("Invalid Stock", stock);
  }
  res.status(200).json(response);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

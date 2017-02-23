//Requiring all my installed packages - Express, express-ejs-layouts, body-parser
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();

//Wire the required layouts to the app itself.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(bodyParser.urlencoded({ extended: true })); //wiring body-parser to the app

//Actual logic below this point. Trigger: calling the domain. Directed to '/'.
app.get('/', (req, res, next) => {
  const today = new Date();
  let date;

  switch (today.getDay()) {
    case 0:
      date = 'Sunday';
      break;
    case 1:
      date = 'Monday';
      break;
    case 2:
      date = 'Tuesday';
      break;
    case 3:
      date = 'Wednesday';
      break;
    case 4:
      date = 'Thursday';
      break;
    case 5:
      date = 'Friday';
      break;
    case 6:
      date = 'Saturday';
      break;
  }

  res.render('index', {
    todaydate: date
  });
}); // Close app.get('/') // HOMEEEEEE

app.post('/', (req, res, next) => {
  const name = req.body.namelastname;
  const password = req.body.password;

  if (name === 'Walter Monecke' && password === 'mypassword' ) {
    res.redirect('/products');
  } else {
    res.redirect('/elon');
  }
});

app.get('/products', (req, res, next) => {
  const name = req.query.namelastname;
  const password = req.query.password;


    res.render('products', {
      name: name,
      password: password
  });
});

app.get('/elon', (req, res, next) => {
  const bday = new Date(1971, 5, 28);
  const today = new Date();

  let remainingDays = (today.getDate()) - (bday.getDate());
  let remainingMonths = (today.getMonth()) - (bday.getMonth());
  let remainingYears = (today.getFullYear()) - (bday.getFullYear());

    res.render('elon', {
      born: bday,
      remainingYears: remainingYears,
      remainingMonths: remainingMonths * (-1),
      remainingDays: remainingDays * remainingYears * 30 * (-1)
    });
});

app.get('/about', (req, res, next) => {
  res.render('about');
});

//Open localhost:4000 to view the site.
app.listen(4000, () => {
  console.log('Backend app Online!');
});

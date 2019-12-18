const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorHandlers = require('./handlers/errorHandlers');
const routes = require('./routes/index');
const PORT = process.env.PORT || 4321;

const app = express();

app.set('views', path.join(__dirname, '../shared/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', routes);


app.use(errorHandlers.notFound);
app.use(errorHandlers.productionErrors);
app.use((req, res, next) => {
    res.status(404).render('404');
});

app.set('port', PORT);

const server = app.listen(app.get('port'), () => {
    console.log(`Listening on localhost:${ server.address().port }`);
});
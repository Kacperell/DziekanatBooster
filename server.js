const app = require('./app');
const PORT = process.env.PORT || 4321;

app.set('port', PORT);


const server = app.listen(app.get('port'), () => {
    console.log(`Listening on localhost:${ server.address().port }`);
});

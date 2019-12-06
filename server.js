const app = require('./app');
const PORT = process.env.PORT || 4321;

app.set('port', PORT);
const server = app.listen(4321, () => {
    console.log(`Listening on localhost:${ server.address().port }`);
});

// const server = app.listen(3000, '192.168.1.7' || 'localhost', function () {
//     console.log('Application worker ' + process.pid + ' started...');
// });
const {Auth} = require('../../firebase/index')

module.exports = async function (req, res) {
    const auth = new Auth();
    const {message, error} = await auth.signOut();

    if (!error) {
        res.redirect('/');
    } else {
        res.render('error.pug', {
            message: 'Coś poszło nie tak podczas wylogowywania 💩',
            previousState: '/'
        });
    }
}
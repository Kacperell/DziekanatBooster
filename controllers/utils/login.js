const {Auth} = require('../../firebase/index')

module.exports = async function login(req, res) {
    const auth = new Auth(req.body);
    const {message, error} = await auth.signIn();

    if (!error) {
        res.redirect('/student');
    } else {
        res.render('error.pug', {
            message: 'Coś poszło nie tak podczas logowania 💩',
            previousState: '/login'
        });
    }
}
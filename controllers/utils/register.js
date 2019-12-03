const {Auth} = require('../../firebase/index')

module.exports = async function register (req, res) {
    const auth = new Auth(req.body);
    const {message, error} = await auth.register()

    if (!error) {
        res.redirect('/student');
    } else {
        res.render('error.pug', {
            message: 'Coś poszło nie tak podczas rejestracji 💩',
            previousState: '/register'
        })
    }
}
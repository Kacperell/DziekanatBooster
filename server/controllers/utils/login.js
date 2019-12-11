const {
    Auth
} = require('../../firebase/index')

module.exports = async function login(req, res) {
    const auth = new Auth(req.body);
    const {
        message,
        error
    } = await auth.signIn();

    if (!error) {
        res.redirect('/student');
    } else {
        res.render('login.pug', {
            message: error,
            previousState: '/login'
        });
    }
}
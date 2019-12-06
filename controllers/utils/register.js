const {
    Auth
} = require('../../firebase/index')

module.exports = async function register(req, res) {
    const auth = new Auth(req.body);
    const {
        message,
        error
    } = await auth.register()
    console.log(error);
    if (!error) {
        res.redirect('/student');
    } else {
        res.render('login.pug', {
            message: error,
            previousState: '/register'
        })
    }
}
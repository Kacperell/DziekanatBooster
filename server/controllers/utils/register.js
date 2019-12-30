const {
    Auth
} = require('../../firebase/index')

module.exports = async function register(req, res) {
    const auth = new Auth(req.body);
    console.log(req.body);
    const {
        message,
        error
    } = await auth.register()
    console.log(error);

    if ((!error) && (req.body.password == req.body.password2)) {
        res.redirect('/student');
    } else if ((req.body.password).length > 6) {
        if (req.body.password !== req.body.password2) {
            if (error) {
                res.render('form.pug', {
                    message: ['Passwords do not match', 'Email address is taken']
                })
            } else {
                res.render('form.pug', {
                    message: ['Passwords do not match']
                })
            }
        }
    } else {
        if ((req.body.password).length < 6) {
            if (req.body.password !== req.body.password2) {
                res.render('form.pug', {
                    message: ['Password must contain 6 characters', 'Email address already exists', 'Passwords do not match']
                })
            } else {
                res.render('form.pug', {
                    message: ['Password must contain 6 characters', 'Email address already exists']
                })
            }
        } else {
            res.render('form.pug', {
                message: [error]
            })
        }
    }
}
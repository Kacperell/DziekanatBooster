const {
    Auth
} = require('../firebase/index')

exports.home = async (req, res) => {
    res.render('home.pug', {
        mesycz: 'DziekanatBooster - Good Luck 💛 HOMEPAGE',
    });
};

exports.form = async (req, res, next) => {
    res.render('form.pug', {
        msg: 'Sign Up to tremendous dziekanat booster'
    });
};
exports.formLogin = async (req, res, next) => {
    res.render('login.pug', {
        msg: 'Sign In to tremendous dziekanat booster'
    });
};

exports.login = async (req, res, next) => {
    const auth = new Auth(req.body);
    const error = await auth.signIn();
    if (!error) {
        res.redirect('/student');
    } else {
        res.render('error.pug', {
            message: `${error} `,
            msg: 'Sign Up to tremendous dziekanat booster'
        });
    }
};

exports.register = async (req, res) => {
    try {
        const auth = new Auth(req.body);
        const error = await auth.register();
        if (!error) {
            res.redirect('/login');
        } else {
            res.render('error.pug', {
                message: `${error} `
            });
        }
    } catch (e) {
        return e
    }
};

exports.student = async (req, res) => {
    const auth = new Auth();
    const user = await auth.isUser();
    if (user) {
        res.render('student.pug', {
            // message: ``
        });
    } else {
        res.render('login.pug', {
            message: `Musisz byc zalogowany `
        });
    }
};

exports.administrator = async (req, res) => {
    res.render('administrator.pug', {});
};


exports.signOut = async (req, res) => {
    const auth = new Auth();
    await auth.signOut();
    res.redirect('/login');
};
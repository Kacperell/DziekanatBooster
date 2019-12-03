module.exports = async function formLogin(req, res) {
    res.render('login.pug', {
        msg: 'Sign In to tremendous dziekanat booster'
    });
}
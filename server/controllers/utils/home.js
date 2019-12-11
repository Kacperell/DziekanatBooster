module.exports = async function home (req, res) {
    res.render('home.pug', {
        msg: 'DziekanatBooster - Good Luck 💛 HOMEPAGE',
        redirect: '/login'
    });
}
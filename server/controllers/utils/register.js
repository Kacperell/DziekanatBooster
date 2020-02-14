const { Auth } = require("../../firebase/index");

module.exports = async function register(req, res) {
  const auth = new Auth(req.body);

     let errorTab = [];

    const {
        message,
        error
    } = await auth.register()
    if ((!error) && (req.body.password == req.body.password2)) {
        res.redirect('/student');
    } else {
        if (req.body.password !== req.body.password2) errorTab.push("Passwords do not match");
        if (error == "The email address is already in use by another account.") errorTab.push(error);
        if (error == "Password should be at least 6 characters") errorTab.push(error);

        res.render('form.pug', {
            message: errorTab
        })
    }
}

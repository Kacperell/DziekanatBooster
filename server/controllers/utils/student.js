const { Auth } = require("../../firebase/index");

module.exports = async function student(req, res) {
  const auth = new Auth();
  const currentUser = await auth.currentUser();

  if (currentUser) {
    res.render("student.pug", {
      email: currentUser.email,
      message: "Witaj w platformie dziekanat booster"
    });
  } else {
    res.redirect("/login");
  }
};

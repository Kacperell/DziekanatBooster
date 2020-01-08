const {
    register,
    formRegister,
    login,
    formLogin,
    signOut,
    student,
    administrator,
    home
} = require('./utils')

exports.home = async (req, res) => home(req, res)
exports.formRegister = async (req, res) => formRegister(req, res)
exports.formLogin = async (req, res) => formLogin(req, res)
exports.login = async (req, res, next) => login(req, res)
exports.register = async (req, res) => register(req, res)
exports.student = async (req, res) => student(req, res)
exports.administrator = async (req, res) => administrator(req, res)
exports.signOut = async (req, res) => signOut(req, res)
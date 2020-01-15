const firebase = require('firebase')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport');


const tranporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))


class Auth {
    constructor(data) {
        this.auth = firebase.auth();
        if (data) {
            this.email = data.email;
            this.password = data.password;
        }
    }

    async register () {
        try {
            await this.auth.createUserWithEmailAndPassword(this.email, this.password).then(res => {
                tranporter.sendMail({
                    to: this.email,
                    from: 'dziekanatbooster@boost.pl',
                    subject: 'Rejestracja',
                    html: '<h1>Dziaa</h1>'
                }).catch(err => {
                    console.log(err);
                });
            })
            return {message: 'Succesfully register'}
        } catch (e) {
            return {error: e.message}
        }
    }

    async signIn() {
        try {
            await this.auth.signInWithEmailAndPassword(this.email, this.password)
            return {message: 'Succesfully sign in'}
        } catch (e) {
            return {error: e.message}
        }
    }

    async signOut() {
        try {
            await this.auth.signOut()
            return {message: 'Succesfully sign out'}
        } catch (e) {
            return {error: e.message}
        }
    }

    async currentUser() {
        return await this.auth.currentUser
    }
}

module.exports = Auth;
const firebase = require('firebase')

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
            await this.auth.createUserWithEmailAndPassword(this.email, this.password)
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
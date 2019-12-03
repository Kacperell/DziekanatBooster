const firebase = require('firebase')
const uuidv1 = require('uuid/v1')

class Database {
    constructor() {
        this.db = firebase.database();
    }

    async addToDatabse (userId, email, time) {
            try {
                const queueId = uuidv1()
                await this.db.ref(`orders/${queueId}`).set({
                    userId,
                    userEmail: email,
                    time
                })
                return {message: 'Succesfully added data'}
            } catch (e) {
                return {error: e.message}
            }
    }
}

module.exports = Database;
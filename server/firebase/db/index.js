const firebase = require('firebase')
const uuidv1 = require('uuid/v1')
const Auth = require('../auth/index')
require("firebase/firestore");
class Database {
    constructor() {
        this.db = firebase.firestore();
        this.auth = new Auth()
    }

    async addVisit(date, time, category, callback) {
        const currentUser = await this.auth.currentUser();
        if (!currentUser) {
            callback.json('access denied');
            return;
        }

        this.db.collection("visits").add({
                user: currentUser.uid,
                date,
                time,
                category
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                callback.json(docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    };

    async readVisit (id, callback) {
        const visit = this.db.collection("visits").doc(id);
        visit.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                callback.json(doc.data());
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            callback.json(error);
        });
    };

    async deleteVisit(id, callback){
        const currentUser = await this.auth.currentUser();
        if (!currentUser) {
            callback.json('access denied');
            return;
        }
        this.db.collection("visits").doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
            callback.json("Document successfully deleted!")
        }).catch(function (error) {
            console.error("Error removing document: ", error);
            callback.json(error);
        });
    };

    async checkUserVisits(callback) {
        const currentUser = await this.auth.currentUser();
        this.db.collection("visits").where("user", "==", currentUser.uid)
            .get()
            .then(function (querySnapshot) {
                let arrayData = [];
                querySnapshot.forEach(function (doc) {
                    const tempArrayData = [doc.id, doc.data()];
                    arrayData.push(tempArrayData);
                });
                console.log(arrayData)
                callback.json(arrayData);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                callback.json(error);
            });
    };

    async checkFreeVisitsHours(date, callback) {
        this.db.collection("visits").where("date", "==", date)
            .get()
            .then(function (querySnapshot) {
                let unavailableHours = [];
                querySnapshot.forEach(function (doc) {
                    unavailableHours.push(doc.data().time);
                });
                callback.json(unavailableHours);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                callback.json(error);
            });
    };
}

module.exports = Database;
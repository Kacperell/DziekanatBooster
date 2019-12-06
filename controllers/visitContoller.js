const {
    Auth,
} = require('../firebase/index');
const firebase = require("firebase");
require("firebase/firestore");
var db = firebase.firestore();

exports.addVisit = async (req, res) => {
    const time = req.params.time;
    const category = req.params.category;
    const auth = new Auth();
    const currentUser = await auth.currentUser();
    db.collection("visits").add({
            user: currentUser.uid,
            time: time,
            category: category
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            res.json(docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
};
exports.readVisit = async (req, res) => {
    const id = req.params.id;
    var visit = db.collection("visits").doc(id);
    visit.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            res.json(doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
        res.json(error);
    });
};
exports.deleteVisit = async (req, res) => {
    const id = req.params.id;
    db.collection("visits").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.json("Document successfully deleted!")
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.json(error);
    });

};
exports.checkUserVisits = async (req, res) => {
    const auth = new Auth();
    const currentUser = await auth.currentUser();
    db.collection("visits").where("user", "==", currentUser.uid)
        .get()
        .then(function (querySnapshot) {
            let arrayData = [];
            querySnapshot.forEach(function (doc) {
                const tempArrayData = [doc.id, doc.data()];
                arrayData.push(tempArrayData);
            });
            res.json(arrayData);
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            res.json(error);
        });

};
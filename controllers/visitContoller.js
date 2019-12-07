const {
    Auth,
} = require('../firebase/index');
const firebase = require("firebase");
require("firebase/firestore");
var db = firebase.firestore();

exports.addVisit = async (req, res) => {
    //adding visit to firestore return visit id to put it to li id
    const date = req.params.date;
    const time = req.params.time;
    const category = req.params.category;
    const auth = new Auth();
    const currentUser = await auth.currentUser();
    if (!currentUser) {
        res.json('access denied');
        return;
    }
    db.collection("visits").add({
            user: currentUser.uid,
            date: date,
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
    //loading data of a particular visit,used after adding a visit to firestrone=> to insert it into ul
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
    //dete vist from firestory by user clik on li button -odowałaj wizytę
    const id = req.params.id;
    const auth = new Auth();
    const currentUser = await auth.currentUser();
    if (!currentUser) {
        res.json('access denied');
        return;
        // jeszcz sprwadzcic czy to nie inny uzytkwonik porownac uid and user z tego dokumentu 
    }
    db.collection("visits").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.json("Document successfully deleted!")
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.json(error);
    });

};
exports.checkUserVisits = async (req, res) => {
    //checking user's visits(firestore) after logging in to his panel
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


exports.checkFreeVisitsHours = async (req, res) => {
    const date = req.params.date;
    //checking free houres for date
    db.collection("visits").where("date", "==", date)
        .get()
        .then(function (querySnapshot) {
            let unavailableHours = [];
            querySnapshot.forEach(function (doc) {
                unavailableHours.push(doc.data().time);
            });
            res.json(unavailableHours);
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            res.json(error);
        });

};
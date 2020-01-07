const {
    Auth,Database
} = require('../firebase/index')
const db = new Database()
const firebase = require("firebase");
require("firebase/firestore");

exports.addVisit = async (req, res) => {
    const {date, time, category} = req.params;
    db.addVisit(date, time, category, res)
};
exports.readVisit = async (req, res) => {
    const id = req.params.id;
    db.readVisit(id, res)
};
exports.deleteVisit = async (req, res) => {
    const id = req.params.id;
    db.deleteVisit(id, res)

};
exports.checkUserVisits = async (req, res) => {
    db.checkUserVisits(res)
};

exports.checkFreeVisitsHours = async (req, res) => {
    const date = req.params.date;
    db.checkFreeVisitsHours(date, res)
};
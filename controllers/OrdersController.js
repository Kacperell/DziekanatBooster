const { Auth } = require("../firebase/index");
const firebase = require("firebase");

exports.newOrder = async (req, res) => {
  const ref = firebase
    .database()
    .ref()
    .child("orders");

  // console.log("========================================");
  // console.log(ref);
  let orders = { id: 1, ornerNumber: 1, isActive: false };
  let pushOrder = ref.push(orders);
};

exports.getNextOrder = async (req, res) => {
  const ref = firebase
    .database()
    .ref()
    .child("orders");

  const lastRecord = ref
    .orderByKey()
    .limitToLast(1)
    .on("child_added", function(snapshot) {
      console.log("new record", snapshot.val());
    });

  ref.child(lastRecord.key).update({ isActive: true });
};

//TODO, WHERE
exports.getFinishOrder = async (req, res) => {
  const ref = firebase
    .database()
    .ref()
    .child("orders");

  const lastRecord = ref
    .orderByKey()
    .limitToLast(1)
    .on("child_added", function(snapshot) {
      console.log("new record", snapshot.val());
    });

  ref.child(lastRecord.key).update({ isActive: true });
};

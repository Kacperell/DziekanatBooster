const { Auth } = require("../firebase/index");
const firebase = require("firebase");

exports.newOrder = async (req, res) => {
  const ref = firebase
    .database()
    .ref()
    .child("orders");

  console.log("========================================");
  console.log(ref);
  let orders = { id: 1, ornerNumber: 1, isActive: false };
  let pushOrder = ref.push(orders);
};
//temp
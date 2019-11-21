const { Auth } = require("../firebase/index");
const firebase = require("firebase");

//Dodawanie nowego numerka do bazy danych
exports.newOrder = async (req, res) => {
  const ref = firebase
    .database()
    .ref()
    .child("orders"); //Podpięcie do "Tabeli" orders

  // console.log("========================================");
  // console.log(ref);
  const orders = { id: 1, ornerNumber: 1, isActive: false };
  const pushOrder = ref.push(orders);
};

//Zmiana pola isActive dla ostatnio dodanego orderu
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
    }); //Pobranie ostatnio dodanego elementu

  ref.child(lastRecord.key).update({ isActive: true });
};

//TODO, WHERE = pobranie elementu z polem isActive = true
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

  const updateOrderRef = ref.child(lastRecord.key).update({ isActive: true });
};

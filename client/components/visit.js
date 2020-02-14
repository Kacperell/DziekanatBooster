import axios from "axios";

function removeVisitFiresotre(e) {
  const visitId = e.target.parentNode.id;
  console.log(e.target.parentNode);
  axios
    .post(`/deleteVisit/${visitId}`)
    .then(function(response) {
      console.log(response);
      e.target.parentNode.remove();
      vm.$forceUpdate();
      document.location.reload(true);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function pushToUl(id, date, time, category) {
  const visitList = document.querySelector(".visitsList ul");
  let li = document.createElement("li");
  li.id = id;
  let spanTime = document.createElement("span");
  let spanDate = document.createElement("span");
  let spanCategory = document.createElement("span");
  let buttonCancel = document.createElement("button");
  buttonCancel.onclick = function() {
    document.location.reload(true);
    return false;
  };
  let newDiv = document.createElement("div");
  buttonCancel.classList.add("buttonCancelVisits");
  buttonCancel.textContent = "Odwołaj wizytę";
  spanTime.textContent = time;
  spanDate.textContent = date;
  spanCategory.textContent = category;

  newDiv.appendChild(spanTime);
  newDiv.appendChild(spanDate);
  newDiv.appendChild(spanCategory);
  li.appendChild(newDiv);
  li.appendChild(buttonCancel);

  visitList.appendChild(li);
  buttonCancel.addEventListener("click", removeVisitFiresotre, true);
}

function removeOneOptionsAfterAddingToDatabase(time) {
  let timePickerOptions = document.querySelectorAll(".timePickerOption");
  timePickerOptions.forEach(option => {
    if (option.value == time) {
      option.remove();
      return;
    }
  });
}

function addOneOptionsAfterDeletingFromDatabase(time) {
  let timePickerOptions = document.querySelectorAll(".timePickerOption");
  timePickerOptions.add(time);
}

function addVisitToUlStudentPanel(visitID) {
  axios
    .get(`/readVisit/${visitID}`)
    .then(function(response) {
      pushToUl(visitID, response.data.date, response.data.time, response.data.category);
      removeOneOptionsAfterAddingToDatabase(response.data.time);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function addVisitToFirestore(e) {
  e.preventDefault();
  const dataPicker = document.querySelector(".dataPicker");
  const timePicker = document.querySelector(".timePicker");
  const categorySelect = document.querySelector(".categorySelect");
  console.log(categorySelect);
  axios
    .post(`/addVisist/${dataPicker.value}/${timePicker.value}/${categorySelect.value}`)
    .then(function(response) {
      addVisitToUlStudentPanel(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function checkUserHasVisits() {
  axios
    .get(`/checkUserVisits`)
    .then(function(response) {
      console.log(response);
      response.data.forEach(function(item) {
        pushToUl(item[0], item[1].date, item[1].time, item[1].category);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

function blockInaccessibleHours(hours) {
  let timePickerOptions = document.querySelectorAll(".timePickerOption");
  //delets options from select when hour is not free
  timePickerOptions.forEach(option => {
    for (let i = 0; i < hours.length; i++) {
      if (hours[i] == option.value) {
        option.remove();
      }
    }
  });
}

function setDefoultOptionsTimePikcer() {
  //gdy zmieniamy daty by znów byeła pełna pula godzin, potem sprwadzamy i ewentalnie usuwamy
  const timePicker = document.querySelector(".timePicker");
  timePicker.innerHTML = "";
  const dataPicker = document.querySelector(".dataPicker");
  const date = dataPicker.value;

  console.log(dataPicker.value);
  const checkDate = new Date(dataPicker.value);
  let day = checkDate.getDay();
  let hours = [];

  var today = new Date();

  //dzien obecny
  var currentDay = today.getDate();
  console.log(currentDay);

  var currentMonth = today.getMonth() + 1;
  console.log(currentDay);

  //dni w kalendarzu
  let currentCallendarDay = checkDate.getDate();
  console.log(currentCallendarDay);

  let currentCallendarMonth = checkDate.getMonth() + 1;
  console.log(currentCallendarMonth);

  let currentCallendarYear = checkDate.getYear();
  console.log(currentCallendarYear);

  if (currentCallendarMonth > currentMonth + 1) {
    window.alert("Wybierz max do 2 dni do przodu");
    dataPicker.valueAsDate = new Date();
    checkFreeVisitsHours();
  } else if (currentCallendarMonth > currentMonth) {
    switch (currentCallendarMonth) {
      case 1:
        currentCallendarDay += 31;
        break;
      case 2:
        currentCallendarDay += 31;
        break;
      case 3:
        currentCallendarDay += 29;
        break;
      case 4:
        currentCallendarDay += 31;
        break;
      case 5:
        currentCallendarDay += 30;
        break;
      case 6:
        currentCallendarDay += 31;
        break;
      case 7:
        currentCallendarDay += 30;
        break;
      case 8:
        currentCallendarDay += 31;
        break;
      case 9:
        currentCallendarDay += 31;
        break;
      case 10:
        currentCallendarDay += 30;
        break;
      case 11:
        currentCallendarDay += 31;
        break;
      case 12:
        currentCallendarDay += 30;
        break;
    }
    if (currentCallendarDay > currentDay + 2) {
      window.alert("Wybierz max do 2 dni do przodu");
      dataPicker.valueAsDate = new Date();
      checkFreeVisitsHours();
    }
  } else if (currentCallendarDay > currentDay + 2) {
    window.alert("Wybierz max do 2 dni do przodu");
    dataPicker.valueAsDate = new Date();
    checkFreeVisitsHours();
  }

  //czy z przeszlosci
  const TodayDate = new Date().setHours(0, 0, 0, 0);
  if (TodayDate > checkDate) {
    alert("Nie można wybrac daty z przeszłości");
    dataPicker.valueAsDate = new Date();
    checkFreeVisitsHours();
    return;
  }

  if (day == 3) {
    hours = [
      "13:00",
      "13:15",
      "13:30",
      "13:45",
      "14:00",
      "14:15",
      "14:30",
      "14:45",
      "15:00",
      "15:15",
      "15:30",
      "15:45"
    ];
  } else if (day == 5 || day == 6 || day == 0) {
    hours = [];
  } else if (day == 1 || day == 2 || day == 4) {
    hours = [
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
      "11:15",
      "11:30",
      "11:45",
      "12:00",
      "12:15",
      "12:30",
      "12:45"
    ];
  }

  for (let i = 0; i < hours.length; i++) {
    let option = document.createElement("option");
    option.classList.add("timePickerOption");
    hours.value = hours[i];
    option.textContent = hours[i];
    timePicker.appendChild(option);
  }
}

function checkFreeVisitsHours(e) {
  setDefoultOptionsTimePikcer();
  const dataPicker = document.querySelector(".dataPicker");
  const date = dataPicker.value;
  // it return hours which arent free
  axios
    .get(`/checkFreeVisitsHours/${date}`)
    .then(function(response) {
      console.log(response);
      blockInaccessibleHours(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function visit() {
  const formVisit = document.querySelector(".addVisitForm");
  if (!formVisit) {
    return;
  }
  const dataPicker = document.querySelector(".dataPicker");
  dataPicker.valueAsDate = new Date();
  checkUserHasVisits();
  checkFreeVisitsHours();
  dataPicker.addEventListener("change", checkFreeVisitsHours);
  formVisit.addEventListener("submit", addVisitToFirestore, true);
}
export default visit;

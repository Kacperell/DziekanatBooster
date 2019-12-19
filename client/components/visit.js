import axios from 'axios';

function removeVisitFiresotre(e) {
    const visitId = e.target.parentNode.id;
    axios.post(`/deleteVisit/${visitId}`)
        .then(function (response) {
            console.log(response);
            e.target.parentNode.remove();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function pushToUl(id, date, time, category) {
    const visitList = document.querySelector('.mp-visitsList ul');
    let li = document.createElement('li');
    li.id = id;
    let spanTime = document.createElement('span');
    let spanDate = document.createElement('span');
    let spanCategory = document.createElement('span');
    let buttonCancel = document.createElement('button');
    buttonCancel.classList.add('buttonCancelVisist');
    buttonCancel.textContent = 'Odowłaj wizytę';
    spanTime.textContent = time;
    spanDate.textContent = date;
    spanCategory.textContent = category;
    li.appendChild(spanTime);
    li.appendChild(spanDate);
    li.appendChild(spanCategory);
    li.appendChild(buttonCancel);
    visitList.appendChild(li);
    buttonCancel.addEventListener('click', removeVisitFiresotre, true);
}

function removeOneOptionsAfterAddingToDatabase(time) {
    let timePickerOptions = document.querySelectorAll('.timePickerOption');
    timePickerOptions.forEach(option => {
        if (option.value == time) {
            option.remove();
            return;
        }
    });
}

function addVisitToUlStudentPanel(visitID) {
    axios.get(`/readVisit/${visitID}`)
        .then(function (response) {
            pushToUl(visitID, response.data.date, response.data.time, response.data.category);
            removeOneOptionsAfterAddingToDatabase(response.data.time);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function addVisitToFirestore(e) {
    e.preventDefault();
    const dataPicker = document.querySelector('.dataPicker');
    const timePicker = document.querySelector('.timePicker');
    const categorySelect = document.querySelector('.categorySelect');
    axios.post(`/addVisist/${dataPicker.value}/${timePicker.value}/${categorySelect.value}`)
        .then(function (response) {
            addVisitToUlStudentPanel(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function checkUserHasVisits() {
    axios.get(`/checkUserVisits`)
        .then(function (response) {
            console.log(response);
            response.data.forEach(function (item) {
                pushToUl(item[0], item[1].date, item[1].time, item[1].category);
            });
        })
        .catch(function (error) {
            console.log(error);
        });

}

function blockInaccessibleHours(hours) {
    let timePickerOptions = document.querySelectorAll('.timePickerOption');
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
    const timePicker = document.querySelector('.timePicker');
    timePicker.innerHTML = '';
    const hours = ['10:00', '10:15', '10:30', '10:45','11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45'];
    for (let i = 0; i < hours.length; i++) {
        let option = document.createElement('option');
        option.classList.add("timePickerOption");
        hours.value = hours[i];
        option.textContent = hours[i];
        timePicker.appendChild(option);
    }
}

function checkFreeVisitsHours(e) {
    setDefoultOptionsTimePikcer();
    const dataPicker = document.querySelector('.dataPicker');
    const date = dataPicker.value;
    // it return hours which arent free
    axios.get(`/checkFreeVisitsHours/${date}`)
        .then(function (response) {
            console.log(response);
            blockInaccessibleHours(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

}


function visit() {
    const formVisit = document.querySelector('.addVisitForm');
    if (!formVisit) {
        return;
    }
    const dataPicker = document.querySelector('.dataPicker');
    dataPicker.valueAsDate = new Date();
    checkUserHasVisits();
    checkFreeVisitsHours();
    dataPicker.addEventListener("change", checkFreeVisitsHours);
    formVisit.addEventListener('submit', addVisitToFirestore, true);
}
export default visit;
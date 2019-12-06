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

function pushToUl(id, time, category) {
    const visitList = document.querySelector('.mp-visitsList ul');
    let li = document.createElement('li');
    li.id = id;
    let spanTime = document.createElement('span');
    let spanCategory = document.createElement('span');
    let buttonCancel = document.createElement('button');
    buttonCancel.classList.add('buttonCancelVisist');
    buttonCancel.textContent = 'Odowłaj wizytę';
    spanTime.textContent = time;
    spanCategory.textContent = category;
    li.appendChild(spanTime);
    li.appendChild(spanCategory);
    li.appendChild(buttonCancel);
    visitList.appendChild(li);
    buttonCancel.addEventListener('click', removeVisitFiresotre, true);
}

function addVisitToUlStudentPanel(visitID) {
    axios.get(`/readVisit/${visitID}`)
        .then(function (response) {
            pushToUl(visitID, response.data.time, response.data.category);
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
    const dateParts = dataPicker.value.split("-");
    const timeParts = timePicker.value.split(":");
    const visitTime = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1]);
    const visitTimeIso = visitTime.toISOString();
    axios.post(`/addVisist/${visitTimeIso}/${categorySelect.value}`)
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
                pushToUl(item[0], item[1].time, item[1].category);
            });
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
    formVisit.addEventListener('submit', addVisitToFirestore, true);
}
export default visit;
import axios from 'axios';


class Visit {
    constructor() {
        this.elements = {
            dataPicker: document.querySelector('.dataPicker'),
            timePicker: document.querySelector('.timePicker'),
            categorySelect: document.querySelector('.categorySelect'),
            formVisit: document.querySelector('.addVisitForm'),
            dataPicker: document.querySelector('.dataPicker')
        }

        this.callbacks = {
            addVisitToFirestore: () => this.addVisitToFirestore(),
            checkFreeVisitsHours: () => this.checkFreeVisitsHours(),
            blockInaccessibleHours: (hours) => this.blockInaccessibleHours(hours)
        }

    }

    init() {
        if(window.location.pathname !== '/student') return

        this.elements.dataPicker.value = new Date();
        this.checkUserHasVisits();
        this.checkFreeVisitsHours(this);
        this.elements.dataPicker.addEventListener("change", this.callbacks.checkFreeVisitsHours);
        this.elements.formVisit.addEventListener('submit', this.callbacks.addVisitToFirestore);
    }

    checkFreeVisitsHours(e) {
        this.setDefoultOptionsTimePikcer();
        const date = this.elements.dataPicker.value;

        // TODO: remove all redundancy with axios and create one helper which will handle all requests
        axios.get(`/checkFreeVisitsHours/${date}`)
        .then((response) =>  {
                this.callbacks.blockInaccessibleHours(response.data).bind(this);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addVisitToFirestore(e) {
        e.preventDefault();
        axios.post(`/addVisist/${this.elements.dataPicker.value}/${this.elements.timePicker.value}/${this.elements.categorySelect.value}`)
            .then(function (response) {
                this.addVisitToUlStudentPanel(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addVisitToUlStudentPanel(visitID) {
        axios.get(`/readVisit/${visitID}`)
            .then(function (response) {
                this.pushToUl(visitID, response.data.date, response.data.time, response.data.category);
                this.removeOneOptionsAfterAddingToDatabase(response.data.time);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    pushToUl(id, date, time, category) {
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

    removeOneOptionsAfterAddingToDatabase(time) {
        let timePickerOptions = document.querySelectorAll('.timePickerOption');
        timePickerOptions.forEach(option => {
            if (option.value == time) {
                option.remove();
                return;
            }
        });
    }


    removeVisitFiresotre(e) {
        const visitId = e.target.parentNode.id;
        axios.post(`/deleteVisit/${visitId}`)
            .then(function (response) {
                e.target.parentNode.remove();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkUserHasVisits() {
        axios.get(`/checkUserVisits`)
            .then(function (response) {
                response.data.forEach(function (item) {
                    this.pushToUl(item[0], item[1].date, item[1].time, item[1].category);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    blockInaccessibleHours(hours) {
        let timePickerOptions = document.querySelectorAll('.timePickerOption');
        timePickerOptions.forEach(option => {
            for (let i = 0; i < hours.length; i++) {
                if (hours[i] == option.value) {
                    option.remove();
                }
            }
        });
    }

    setDefoultOptionsTimePikcer() {
        const timePicker = document.querySelector('.timePicker');
        timePicker.innerHTML = '';
        const dataPicker = document.querySelector('.dataPicker');
        const date = dataPicker.value;
        const checkDate = new Date(dataPicker.value);
        // const day = checkDate.getDay();
        const day = 1
        let hours=[];
        console.log(timePicker)
        if (day==3){
        hours = ['13:00','13:15','13:30','13:45','14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45'];
        }else if(day==5 || day== 6 ||day== 0){
        hours =['13:00','13:15','13:30'];
        } else if(day==1 || day== 2 ||day== 4){
         hours = ['10:00','10:15','10:30','10:45','11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45'];
         }
    
        for (let i = 0; i < hours.length; i++) {
            let option = document.createElement('option');
            option.classList.add("timePickerOption");
            hours.value = hours[i];
            option.textContent = hours[i];
            timePicker.appendChild(option);
        }
    }
}







export default Visit;
import debounce from 'debounce';

function registerValidation() {

    const mpform = document.querySelector('.DOMformContainer');
    if (!mpform){
        return;
    }
    const passwd1 = document.querySelector('.DOMpassword1Container');
    const passwd2 = document.querySelector('.DOMpassword2Container');

    passwd1.addEventListener("change", debounce(checkPassword, 1600));
    passwd2.addEventListener("change", debounce(checkPassword, 1600));

    function checkPassword() {
        if(passwd1.value==''){return;}
        if(passwd2.value==''){return;}
        if (passwd1.value != passwd2.value) {
            alert("Passwords dont match!");
        }
    }
}
export default registerValidation;
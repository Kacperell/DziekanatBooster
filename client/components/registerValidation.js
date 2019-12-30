function registerValidation (){
    const signInButton = document.querySelector(".mp-form__input--submit");
    const mpform = document.querySelector('.DOMformContainer');
    const passwd1 = document.querySelector('.DOMpassword1Container');
    const passwd2 = document.querySelector('.DOMpassword2Container');
    if (!mpform){
        return;
    }
    signInButton.addEventListener("click", function(){
        if (passwd1.value != passwd2.value) {
            return;
        }
    });
}
export default registerValidation;
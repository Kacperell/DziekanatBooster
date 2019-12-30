function okayBackToRegister() {
    const okayButton = document.querySelector(".DOMOkay");
    const errorContainer = document.querySelector('.mp-error-background');
    if (!errorContainer){
        return;
    }
    okayButton.addEventListener("click", function(){
        errorContainer.remove();       
    });
}
export default okayBackToRegister;
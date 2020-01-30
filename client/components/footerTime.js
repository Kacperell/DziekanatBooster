function footerTime(){
const errorContainer=document.querySelector('.mp-error-background');
if(errorContainer){
    return;
}
    var czas = new Date();
    var h = czas.getHours(); // 0 - 23
    var m = czas.getMinutes(); // 0 - 59
    var s = czas.getSeconds(); // 0 - 59
    var d = czas.getDate();
    var month1 = czas.getMonth()+1;
    var y = czas.getYear()+1900;

    let displayFooterTime=document.querySelector('.mp-footer__text');
    let displayFooterDate=document.querySelector('.mp-footer__text1');

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    month1=(month1<10) ? "0" + month1 : month1;
   var time1 = h + ":" + m + ":" + s + " ";
   var date1 = + d +':' + month1 + ':' + y;
   displayFooterTime.innerText = time1;
   displayFooterDate.innerText = date1;

    setTimeout(footerTime, 1000);
}
export default footerTime;
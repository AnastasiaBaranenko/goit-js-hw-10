
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const submitBtn = document.querySelector('button');
const inputValue = document.querySelector('.input-label');


submitBtn.addEventListener('click',(event) =>{
    event.preventDefault();
let delay = Number(inputValue.value);
const valueBtn = document.querySelector('input[name="state"]:checked');
const values = valueBtn.value ;
    const promise = new Promise((resolve, reject) =>
    {
        setTimeout(() => {
if(values == "fulfilled"){
    resolve(delay);
}else{
    reject(delay)
};
    }, delay);});

    promise.then((delay) =>{
iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    messageColor: '#fff',
backgroundColor: '#59a10d',
position: 'topRight',
messageLineHeight: '64px',
maxWidth: '383px'
})});
    
    promise.catch((delay) => {
         iziToast.show({
message:`❌ Rejected promise in ${delay}ms`,
messageColor: '#fff',
backgroundColor: '#ef4040',
position: 'topRight',
messageLineHeight: '64px',
maxWidth: '383px'
})});

});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    body: document.body,
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}
const changeBtnStatus = (remove, add) => {
    refs.startBtn.disabled = add;
    refs.stopBtn.disabled = remove;
};

let colorSwitch = null;

refs.startBtn.addEventListener('click', () => {
    changeBtnStatus(false,true);
    colorSwitch = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
})
refs.stopBtn.addEventListener('click', () => {
    clearInterval(colorSwitch);
    changeBtnStatus(true,false)
})
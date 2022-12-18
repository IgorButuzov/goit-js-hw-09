const refs = {
    bodyColor: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}

refs.startBtn.addEventListener('click', chgColor);
refs.stopBtn.addEventListener('click', stopChgColor);

function chgColor() {
    intervalChgColor = setInterval(() => {
    refs.bodyColor.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  refs.startBtn.setAttribute('disabled', 'true');
}

function stopChgColor() {
    console.log('click');
    clearInterval(intervalChgColor);
    refs.startBtn.removeAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startTime() {
    const today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let day = today.getDay();
    let month = today.getMonth();
    let year = today.getFullYear();
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.querySelector('.dateTime').innerHTML =  hour + ":" + minutes + ":" + seconds;
    document.querySelector('.day').innerHTML =  day + "/" + month + "/" + year;
    setTimeout(startTime, 1000);
  }

  setTimeout(startTime, 1000);

  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

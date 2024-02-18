let buttons = document.querySelectorAll("button");
let current = document.querySelectorAll("h2");
let previous = document.querySelectorAll(".bottom");
let images = document.querySelectorAll("img");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((e) => e.classList.remove("show"));
    button.classList.add("show");

    let time = button.innerText.toLowerCase();

    fetch("./data.json")
      .then((response) => response.json())
      .then(function (fullData) {
        for (i = 0; i < fullData.length; i++) {
          current[i].textContent = `${
            fullData[i].timeframes[`${time}`].current
          }hrs`;
          previous[i].textContent = `${button.getAttribute("data-text")} - ${
            fullData[i].timeframes[`${time}`].previous
          }hrs`;
        }
      });
  });
});

fetch("./data.json")
  .then((response) => response.json())
  .then(function (fullData) {
    let i = 0;
    images.forEach((img) => {
      if (img.getAttribute("src") === "images/icon-ellipsis.svg") {
        img.title = `Monthly: ${fullData[i].timeframes.monthly.current}hrs, Weekly: ${fullData[i].timeframes.weekly.current}hrs, Daily: ${fullData[i].timeframes.daily.current}hrs`;
        i === 6 ? (i = 0) : i++;
      }
    });
  });

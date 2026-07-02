//Reference : https://medium.com/@akshaykrdas001/how-to-fetch-data-from-local-json-file-and-render-it-to-html-document-with-using-vanilla-javascript-a0191a894f25
import data from './data.json' with { type: 'json' };

console.log(data);
console.log("JavaScript up and running");

//Get textToType div
const textDiv = document.querySelector(".textToType");

//Store buttons of all levels
const easyButton = document.querySelector(".easyBtn");
const medButton = document.querySelector(".medBtn");
const hardButton = document.querySelector(".hardBtn");

//For later if user changes difficulty level
const dataItems =  Object.entries(data);

//Reference : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const handleEasyClick = () => {
    //generate random integer between 0 to 10.
    const randomIndex = getRandomInt(10)
    //print on console
    console.log("random index", randomIndex);
    //set content to text at the random index in easy array of objects
    //create paragraph element
    const paraToType = document.createElement("p");
    //set text
    paraToType.textContent =  data.easy[randomIndex].text;
    console.log(paraToType);
    textDiv.appendChild(paraToType);
   
}


easyButton.addEventListener("click", handleEasyClick);

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

//start button
const startButton = document.querySelector(".startBtn");
//time
let seconds = 1;
let timer = null;

const timeDisplay = document.getElementById("time");
//formDiv
const formDiv = document.querySelector(".formDiv");
const handleStartBtnClick = () => {
  //set textarea of form visible
  formDiv.style.visibility = "visible";
   //set content if not set already
   if(!textDiv.hasChildNodes()){
    //create paragraph element
    const paraToType = document.createElement("p");
    //set text
    paraToType.textContent =  data.easy[0].text;
    console.log(paraToType);
    textDiv.appendChild(paraToType); 
    startTimer();
   }

}

//Reference : https://youtu.be/0JQASwPuNB0?si=b10lxviyPTfVueap
function updateDisplay () {
 timeDisplay.textContent = seconds;
}

function startTimer () {
  if(timer === null){
    timer = setInterval(()=>{
      seconds++;
      updateDisplay();
    },1000)//1s
  }
}

startButton.addEventListener("click", handleStartBtnClick);

//For later if user changes difficulty level
const dataItems =  Object.entries(data);

//Reference : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const handleEasyClick = () => {
    //Remove previous child/children
    while (textDiv.hasChildNodes()) {
      textDiv.removeChild(textDiv.firstChild);
    }
    //Remove styles for other two buttons
    hardButton.style.color = "white";
    hardButton.style.borderColor = "gray";
    medButton.style.color = "white";
    medButton.style.borderColor = "gray";
    //set styles for button text and border
    easyButton.style.color= "blue";
    easyButton.style.borderColor="blue";
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

// Handle medium difficulty level  button click
const handleMediumClick = () => {
    //Remove previous child/children
    while (textDiv.hasChildNodes()) {
      textDiv.removeChild(textDiv.firstChild);
    }
    //Remove styles for other two buttons
    hardButton.style.color = "white";
    hardButton.style.borderColor = "gray";
    easyButton.style.color = "white";
    easyButton.style.borderColor = "gray";
    //set styles for button text and border
    medButton.style.color= "blue";
    medButton.style.borderColor="blue";
    //generate random integer between 0 to 10.
    const randomIndex = getRandomInt(10)
    //print on console
    console.log("random index", randomIndex);
    //set content to text at the random index in easy array of objects
    //create paragraph element
    const paraToType = document.createElement("p");
    //set text
    paraToType.textContent =  data.medium[randomIndex].text;
    console.log(paraToType);
    textDiv.appendChild(paraToType);   
}


medButton.addEventListener("click", handleMediumClick);

// Handle hard difficulty level  button click
const handleHardClick = () => {
    //Remove previous child/children
    while (textDiv.hasChildNodes()) {
      textDiv.removeChild(textDiv.firstChild);
    }
     //Remove styles for other two buttons
    easyButton.style.color = "white";
    easyButton.style.borderColor = "gray";
    medButton.style.color = "white";
    medButton.style.borderColor = "gray";
    //set styles for button text and border
    hardButton.style.color= "blue";
    hardButton.style.borderColor="blue";
    //generate random integer between 0 to 10.
    const randomIndex = getRandomInt(10)
    //print on console
    console.log("random index", randomIndex);
    //set content to text at the random index in easy array of objects
    //create paragraph element
    const paraToType = document.createElement("p");
    //set text
    paraToType.textContent =  data.hard[randomIndex].text;
    console.log(paraToType);
    textDiv.appendChild(paraToType);   
}


hardButton.addEventListener("click", handleHardClick);
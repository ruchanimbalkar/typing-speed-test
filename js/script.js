//Reference : https://medium.com/@akshaykrdas001/how-to-fetch-data-from-local-json-file-and-render-it-to-html-document-with-using-vanilla-javascript-a0191a894f25
import data from './data.json' with { type: 'json' };

//localstorage
const prevBestWPM = localStorage.getItem("bestWPM");

//set personal best to previous score next to trophy icon
const prevBest = document.querySelector(".personalbestspan");
prevBest.textContent = `${prevBestWPM} WPM`;

//Get textToType div
const textDiv = document.querySelector(".textToType");

//Get resultDiv
const resultDiv = document.querySelector(".resultDiv");

//confetti image
const confettiImg = document.createElement("img");
confettiImg.src="images/pattern-confetti.svg";

//Store buttons of all levels
const easyButton = document.querySelector(".easyBtn");
const medButton = document.querySelector(".medBtn");
const hardButton = document.querySelector(".hardBtn");

//goAgainBtn
const goAgainBtn = document.querySelector(".goAgainBtn");
//hide go Again button
goAgainBtn.style.display="none";

//start button
const startButton = document.querySelector(".startBtn");
//time
let seconds = 0;
let timer = null;

//input typed by user
const input  =  document.getElementById("userInput");

//wpm
const wpmResult = document.querySelector(".wpm");

const timeDisplay = document.getElementById("time");
//formDiv
const formDiv = document.querySelector(".formDiv");

const clearResultDiv = () =>{
  //Remove previous child/children
  //Reference : https://www.w3schools.com/jsref/met_node_removechild.asp
  while (resultDiv.hasChildNodes()) {
      resultDiv.removeChild(resultDiv.firstChild);
  }
}
const handleStartBtnClick = () => {
  //reset seconds
  seconds = 0;
  //clear resultDiv
  clearResultDiv();
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
   }
   //hide start button
   startButton.style.display = "none";
   //clear textarea 
   //Reference : https://forum.freecodecamp.org/t/cant-clear-text-from-textarea-after-button-click/514410/3
   input.value = "";
    //start timer
    startTimer();
}


//Reference : https://youtu.be/liNltrT-ULg?si=WcyPn1t3HpkXOFz-
function calculateResult() {
  const numberOfWords = input.value.split(" ").length;
  const wordsPerMinute = (numberOfWords * 60 )/ 60;
  wpmResult.textContent = wordsPerMinute;
  input.disabled = true;
  //create paragraph element for result div
  const resultPara = document.createElement("p");
  const resultStr= `Test Complete! Solid run. Keep pushing to beat your high score. WPM:${wordsPerMinute}`;
  //set text
  resultPara.textContent =  resultStr;
  resultDiv.appendChild(resultPara);  
  //if prev score of best WPM is less than current 
  if(prevBestWPM <  wordsPerMinute){
    //set the current score as personal best in local storage
    localStorage.setItem("bestWPM", wordsPerMinute);
    resultDiv.appendChild(confettiImg);
  }
  //show go again button
  goAgainBtn.style.display="block";
}

//update time in real time
//Reference : https://youtu.be/0JQASwPuNB0?si=b10lxviyPTfVueap
function updateDisplay () {
  console.log("Inside update display : ", seconds);
 timeDisplay.textContent = seconds;
}

function startTimer () {
  console.log("Inside start timer : ");
  if(timer === null){
    timer = setInterval(() => {
    seconds++; // Decrease by 1 every second
    updateDisplay();
    if(seconds >= 60){
      clearInterval(timer);
      timer = null;
      calculateResult();
    }
  },1000);
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
   //show start button if it is hidden
   if(startButton.style.display === "none"){
    startButton.style.display = "block";
   }
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
      //show start button if it is hidden
   if(startButton.style.display === "none"){
    startButton.style.display = "block";
   }
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
    //show start button if it is hidden
   if(startButton.style.display === "none"){
    startButton.style.display = "block";
   }
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


//Go again Button
function handleGoAgain(){
  //clear result div
  clearResultDiv();
  //show start button
  startButton.style.display="block";
  //set seconds to zero
  seconds=0;
  //set timer to null
  timer=null;
  //enable text area
  //Reference : https://www.w3schools.com/Jsref/prop_textarea_disabled.asp
  input.disabled = false;
  input.value="";
  //hide form div
  formDiv.style.visibility="hidden";
  //hide go again button
  goAgainBtn.style.display="none";
}

goAgainBtn.addEventListener("click", handleGoAgain);
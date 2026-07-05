//Reference : https://medium.com/@akshaykrdas001/how-to-fetch-data-from-local-json-file-and-render-it-to-html-document-with-using-vanilla-javascript-a0191a894f25
import data from './data.json' with { type: 'json' };

//localstorage
const prevBestWPM = localStorage.getItem("bestWPM");

//set personal best to previous score next to trophy icon
const prevBest = document.querySelector(".personalbestspan");
if(prevBestWPM != null){
  prevBest.textContent = `${prevBestWPM} WPM`;
} else{
   prevBest.textContent = "0 WPM";
}


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

//resetBtn
const resetBtn = document.querySelector(".resetBtn");
//hide reset button
resetBtn.style.display="none";

//timed button
const timedBtn = document.querySelector(".timeLimit");
//passage button
const passageBtn = document.querySelector(".passage");
//start button
const startButton = document.querySelector(".startBtn");
//input typed by user
const input  =  document.getElementById("userInput");

//wpm
const wpmResult = document.querySelector(".wpm");

const timeDisplay = document.getElementById("time");
//formDiv
const formDiv = document.querySelector(".formDiv");


let seconds, timer, timeSet;

//difficulty level
let level;


//If user does a timed typing test:
function handleTimedTest(){
  //set seconds to zero
   seconds = 0;
   //set timer to null
   timer = null;
   //test is timed
   timeSet = true;
   //disable timed button
   timedBtn.disabled = true;
  //hide passage button
  passageBtn.style.display = "none";
}

timedBtn.addEventListener("click", handleTimedTest);

function handlePassagePreference(){
  //set timeSet to false because test is not timed
  timeSet = false;
  //disable passage button
  passageBtn.disabled = true;
  //hide timed button
  timedBtn.style.visibility = "hidden";
  //set time to N/A because the test is not timed
  timeDisplay.textContent = "N/A";
}

passageBtn.addEventListener("click", handlePassagePreference)

//clear result div content for new test function
const clearResultDiv = () =>{
    //Remove previous child/children
    //Reference : https://www.w3schools.com/jsref/met_node_removechild.asp
    while (resultDiv.hasChildNodes()) {
        resultDiv.removeChild(resultDiv.firstChild);
    }
}

//Reference : https://youtu.be/liNltrT-ULg?si=WcyPn1t3HpkXOFz-
function calculateResult() {
  const numberOfWords = input.value.split(" ").length;
  const wordsPerMinute = (numberOfWords * 60 )/ 60;
  wpmResult.textContent = wordsPerMinute;
  input.disabled = true;
  //create paragraph element for result div
  const resultPara = document.createElement("p");
  const resultStr= `Test Complete! Solid run. Keep pushing to beat your high score. Difficuley level : ${level} | WPM:${wordsPerMinute}`;
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
  //show reset button
  resetBtn.style.display = "block";
  //hide difficulty level buttons
  easyButton.style.visibility = "hidden";
  medButton.style.visibility = "hidden";
  hardButton.style.visibility = "hidden";
  //disable passage and timed button
  timedBtn.disabled = true;
  passageBtn.disabled = true;
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
    //start timer if test is timed
  if(timeSet === true){
      startTimer();
  } else{
    console.log("inside else even though timeSet is true")
    //only calculate result and show result div once the user completes the test
    input.addEventListener("change",calculateResult); //focus lost from textarea user is done typing!
  }  
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
     //set diffculty level
    level="easy";
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
     //set diffculty level
    level="medium";
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
    //set diffculty level
   level="hard";
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
  //if previous test was timed, then when user clicks go again button, the next test will also be timed
  if(timeSet === true){
    handleTimedTest();
  }else{
    //if previous test was not timed and user prefers passage, then next test will also be passage
    handlePassagePreference();
  }
  //enable text area
  //Reference : https://www.w3schools.com/Jsref/prop_textarea_disabled.asp
  input.disabled = false;
  input.value="";
  //hide form div
  formDiv.style.visibility="hidden";
  //hide go again button
  goAgainBtn.style.display="none";
 //show difficulty level buttons
  easyButton.style.visibility = "visible";
  medButton.style.visibility = "visible";
  hardButton.style.visibility = "visible";
  //show reset button
  resetBtn.style.display = "block";
}

goAgainBtn.addEventListener("click", handleGoAgain);

function handleResetClick(){
  //show difficulty level buttons
  easyButton.style.visibility = "visible";
  medButton.style.visibility = "visible";
  hardButton.style.visibility = "visible";
  //enable text area
  input.disabled = false;
  input.value="";
  //hide form div
  formDiv.style.visibility="hidden";
  //hide go again button
  goAgainBtn.style.display="none";
  //hide reset button
  resetBtn.style.display = "none";
   //clear result div
  clearResultDiv();
  //show start button
  startButton.style.display="block";
  //enable passage and timed button
  timedBtn.disabled = false;
  passageBtn.disabled = false;
  //show passage button
  passageBtn.style.visibility = "visible";
  //show timed button
  timedBtn.style.visibility = "visible";
}

resetBtn.addEventListener("click", handleResetClick)
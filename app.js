const gameContainer = document.getElementById("game");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let revealedCount = 0;
let firstClick;
let secondClick;
let endOfMove = false;
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}



// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
if (event.target.classList.contains('faceup')) return;
if (endOfMove) return;
  
// setting flipped card to background color when clicked
let flippedCard = event.target;
flippedCard.style.backgroundColor = flippedCard.classList[0];

if (!firstClick || !secondClick){
  flippedCard.classList.add('faceup');
  firstClick = firstClick || flippedCard;
  secondClick = flippedCard === firstClick ? null : flippedCard;
}
// logic over two clicked divs 
if(firstClick && secondClick){
  endOfMove = true;
  // if classNames are exact match - revealed count + 2, and remove event listener so they cannot be clicked again
  if (firstClick.className === secondClick.className){
    revealedCount += 2;
    firstClick.removeEventListener('click', handleCardClick);
    secondClick.removeEventListener('click', handleCardClick);
    //reset first and second click to allow for next turn
    firstClick = null;
    secondClick = null; 
    endOfMove = false;
  }
  //set timeout function to let incorrect guesses to reset
  else {
    setTimeout(function(){
      //background color set to empty string to reset from background color
    firstClick.style.backgroundColor = ''
    secondClick.style.backgroundColor = ''
    firstClick.classList.remove('faceup');
    secondClick.classList.remove('faceup');
    firstClick = null;
    secondClick = null;
    endOfMove = false;
  }, 1000)
  }
}
}

// when the DOM loads
createDivsForColors(shuffledColors);

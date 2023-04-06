pi = "3.14159265358979237218";


// Initialize the current index.
let index = 0;
// digit refers to which digit to compare to pi.
let digit;

// The following variables are to hold the state of which key is moused over
// and which key is currently pressed down.
// These will be changed by the events mouseover, mouseleave, keydown, and keyup.
// The number 12 is to indicate that none of the keys are selected,
// and the numbers 0-11 will indicate that that key is selected.
// keydown is an array of booleans since more than one key can be pressed at a time.
let mouse=12;
let keydown=[false,false,false,false,false,false,false,false,false,false];

// This is the a string representing the keys on the keyboard in order
const keyboardString = "0123456789. ";
const keyboard = document.getElementById("keyboard");


displayKeyboard();

function displayKeyboard() {
  // Create the number keyboard grid

  // orderArray shows the order that the keys will be displayed, to match a typical numpad.
  const orderArray = [10,6,7,8,3,4,5,0,1,2,11,9]
  for (i=0; i<12; i++) {
    let key = document.createElement("div");
    key.className = "key";
    key.style.order=orderArray[i];
    key.style.borderWidth="2px 4px 4px 2px";
    key.textContent = keyboardString[i];
    keyboard.appendChild(key);
  }
}

//for (i=0; i<12; i++) {
//  keyboard.children[i].addEventListener("mouseover", function(){
//    mouse = i;
//    keydownDisplay(i);
//  });
//  keyboard.children[i].addEventListener("mouseleave", function(){
//    mouse = 12;
//    keyupDisplay(i);
//  });
//}

document.addEventListener("keydown", function(event) {
  keydown[event.key]=true;
  keydownDisplay(event.key);
});

document.addEventListener("keyup", function(event) {
  digit = event.key; // The key entered to be compared to pi
  keydown[event.key]=false; // Indicating the key is no longer pressed.
  keyupDisplay(event.key);
});


function keydownDisplay(keyString) {
  if (!isNaN(Number(keyString))) {
    keyboard.children[keyString].style.borderWidth="4px 2px 2px 4px";
  }
}

function keyupDisplay(keyString) {
  if (!isNaN(Number(keyString))) {
    keyboard.children[keyString].style.borderWidth="2px 4px 4px 2px";
  } 
}
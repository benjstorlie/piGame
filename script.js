pi = "3.14159265358979237218";


// Initialize the current index.
let index = 0;
// digit refers to which digit to compare to pi.
let digit;

// This is the a string representing the keys on the keyboard in order
const keyboardString = "0123456789";
  // orderArray shows the order that the keys will be displayed, to match a typical numpad.
const orderArray = [10,6,7,8,3,4,5,0,1,2,11,9];

$(function() {
  const keyboard = $("#keyboard");

  for (i=0; i<10; i++) {
    keyboard.append(addKey(i));
  }
  const backButton = $("<button>").attr("id","back-button").addClass("key").css("order","9");
  backButton.click(function() {console.log("back")});
  keyboard.append(backButton);

  $(document).click(debugBorder);
});

function addKey(i) {
  const key=$("<div>");
  key.addClass("key");
  key.css("order",orderArray[i]);
  key.attr("id","key"+i)
  key.attr("role","button");
  key.text(keyboardString[i]);

  key.click(function() {
    digit = i;
    console.log("digit="+digit);
    $("#pi").prepend($("<span>"+i+"</span>"));
  })

  return key;
}
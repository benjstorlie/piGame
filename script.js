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

  $(document).keydown( function(event) {
    const k=event.key;
    if (!isNaN(k)) {
      $("#key"+k).click();
      $("#key"+k).addClass("key-down");
    }
    console.log("keydown "+k);
  });

  $(document).keyup( function(event) {
    if (!isNaN(event.key)) {
      $("#key"+event.key).removeClass("key-down");
    }
  });
});

function addKey(i) {
  // Returns a jQuery <div> element to be a clickable button for the number i
  const key=$("<div>");
  key.addClass("key");
  key.css("order",orderArray[i]);
  key.attr("id","key"+i);
  key.attr("role","button");
  key.text(keyboardString[i]);

  key.click(function() {
    digit = i;
    console.log("digit="+digit);
    const piEl = $("#pi");
    piEl.addClass("translate");
    setTimeout(function() {
      piEl.append($("<span class='pi-digit'>"+i+"</span>"));
      piEl.removeClass("translate");
    },500);
  })

  return key;
}

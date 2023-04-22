let pi = {
  pi: "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989",
  index: 0,
  plus: function(){
    if (this.index < this.pi.length-1){
      this.index++;
  }},
  equals: function(i){return (i==this.pi[this.index])},
  nextDigit: function(i=1) {
    return this.pi[this.index+i];
  }
}

const speed=2000;
let finished=true; //Boolean for animations

// This is the a string representing the keys on the keyboard in order
const keyboardString = "0123456789";
  // orderArray shows the order that the keys will be displayed, to match a typical numpad.
const orderArray = [10,6,7,8,3,4,5,0,1,2,11,9];

$(function() {
  const practice = ($("h1").text()=="Pi Game Practice");
  const keyboard = $("#keyboard");
  const piEl = $("#pi");
  
  const errorBox = $("#error-box");
  
  $("header").append($("<p>You can click the buttons or use your keyboard!</p>"));

  piDigitsStylingInit()

  for (i=0; i<10; i++) {
    keyboard.append(addKey(i));
  }
  
  const backButton = $("<div id='back-button' class='key'>Back</div>");
  
  backButton.click(function() {
    if (confirm("This will clear your progress and take you to the main menu.\nProceed?")) {
      window.location.href="./index.html";
    }
  });

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


  function addKey(i) {
    // Returns a jQuery <div> element to be a clickable button for the number i
    const key=$("<div>");
    key.addClass("key");
    key.css("order",orderArray[i]);
    key.attr("id","key"+i);
    key.attr("role","button");
    key.text(keyboardString[i]);

    key.click(function() {
      // finish any running animations
      piEl.children().add(piEl).finish();

      if (finished){
        finished=false;
        if ((pi.equals(i))) {
          piShift(i);
        } else {

          // add error mark to error-box
          errorBox.append("<span>✗</span>");
        }
        finished=true;
      }
    })

    return key;
  }

  function piShift(i) {
    // Shift all the digits over, with change in style, and text.
    const piDigits = piEl.children();
    piFontSize = piEl.css("font-size");

    // increment pi to next digit
    pi.plus();

    // add new invisible digit to right
    newDigit = $("<div>").css("color","#4e4eff").css("display","none")
    if (practice) {
      newDigit.text(pi.nextDigit(3));
    } else {
      newDigit.text("?");
      piDigits.eq(4).text(i);
    }
    piEl.append(newDigit);

    // Make everything happen with the JQuery .animate method.

    // Shift piEl -- the leftmost digit is still a child
    piEl
      .animate({left: '-20px'},speed);
    // Change colors
    // Orange #ffa74e = rgb(100,63,31 )
    // Blue   #4e4eff = rgb(63 ,63,100)
    piDigits.eq(3)
      .animate({color: "#ffa74e", fontSize: piFontSize},speed);
    piDigits.eq(4)
      .animate({color: "#ffffff", fontSize: "80px"},speed);
    // fade in right-most question mark
    piDigits.last()
      .fadeIn(speed);
    // fadeout left-most pi-digit
    piDigits.first()
      .fadeOut(speed, piReset);
  }

  function piReset() {
    // functions to follow the animations
    // remove left-most now hidden pi-digit
    piEl.children().first().remove();

    // reset element style attribute
    piEl.attr("style","");
  }

  function piDigitsStylingInit() {
    const piDigits = piEl.children();
    piDigits.slice(0,3)
      //.addClass("orange");
      .css("color","#ffa74e");
    piDigits.slice(3,4)
      //.addClass("white");
      .css("color","#ffffff").css("font-size","80px");
    piDigits.slice(4  )
      //.addClass("blue");
      .css("color","#4e4eff");
    piDigits.last()
      //.addClass("hidden");
      .css("display","none");
  }

});
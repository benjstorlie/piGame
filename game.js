const pi = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";

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
  const piEl = $("#pi");
  const questionMark = $("#question");
  

  for (i=0; i<10; i++) {
    keyboard.append(addKey(i));
  }
  
  $("#back-button").click(function() {
    window.location.href="./index.html";
  });

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
      digit = i;
      console.log("digit="+digit);

      if ((i==pi[index])) {
        if (piEl.hasClass("translate")) {
          piEl.removeClass("translate");
          questionMark.addClass("hidden");
          questionMark.before($("<div class='pi-digit'>"+i+"</div>"));
        } else {
          $(".error").text(i).removeClass("error");
        }
        index++;
        shift();
      } else {
          if (piEl.hasClass("translate")) {
            questionMark.before($("<div class='pi-digit error'>"+i+"</div>"));
            piEl.removeClass("translate");
            questionMark.addClass("hidden");
          } else {
            $(".error").text(i);
          }
      }
      
    })

    return key;
  }

  function shift() {

    

    questionMark.fadeIn(200,function(){
      questionMark.removeClass("hidden");
      piEl.addClass("translate");
    });
  }

  function isMatch(i) {
    if (i==pi[index]) {
      index++;
      if ($(".pi-digit ~ #question").hasClass("error")) {
        
      }
      return true;
    }
    return false;
  }





});
//DEFAULT VALUES

var default_suggest="Use 8 or more characters with a mix of letters, numbers and symbols";
var levels = [ 
  {
    "text" : "Too weak",
    "class" : "too-weak",
  }, 
  {
    //Weak = 6 or more characters
   "text" : "Weak",
    "class" : "weak",
    "guesses" : 1000
  },  
  {
    //Average = 8 or more characters
    "text" : "could be stronger",
    "class" : "average",
    "guesses" : 100000
  }, 
  {
    //Strong = 10 or more characters
    "text" : "Strong",
    "class" : "strong",
    "guesses" : 10000000
  }, 
 ];

// Use the loaded regex's to caluclate the strength of the text in the input box
function checkStrength(event) {
  var klass = levels[0];
  var bar = document.querySelector('#bar');
  var pass = document.querySelector('#pass').value;

  var result = zxcvbn(pass);
  var guesses = result.guesses;
  var suggestions = result.feedback.suggestions;

  var level = 0;
  for(var i =1; pass.length >= 8 && i<levels.length; i++) 
    if (levels[i].guesses < guesses) level=i

  klass = guesses >= levels[level].guesses ? levels[level] : klass

  document.querySelector('#bar').className = klass.class;
  document.querySelector('#str-text').className = klass.class+"-text";
  document.querySelector('#str-text').innerHTML = klass.text;
  
  var suggest = default_suggest;
  if (level == 3) suggest = "";
  // if (pass.length >= 8) {
  //   console.log(pass.length);
    
  //   switch (level) {
  //     case 0:     break;
  //     case 1,2:   if (suggestions.length > 0) suggest = suggestions[0];
  //                 break;
  //     case 3: suggest = ""; 
  //                 break;
  //   }
  // }

  document.querySelector("#suggest").innerHTML = suggest;

  return true;
}

window.onload = function(){
  //Key listener for password entry
  document.querySelector('#pass').onkeyup = checkStrength;
  checkStrength(null);
};

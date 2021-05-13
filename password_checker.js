//DEFAULT VALUES

var default_suggest="Use 8 or more characters with a mix of letters, numbers and symbols";
var levels = [ 
  {
    "text" : "Too weak",
    "class" : "too-weak",
  }, 
  {
   "text" : "Weak",
    "class" : "weak",
    "guesses" : 10000
  },  
  {
    "text" : "could be stronger",
    "class" : "average",
    "guesses" : 1000000
  }, 
  {
    "text" : "Strong",
    "class" : "strong",
    "guesses" : 100000000
  }, 
 ];

// Check the strength of the current input using zxcvbn
function checkStrength(event) {
  var klass = levels[0];
  var bar = document.querySelector('#bar');
  var pass = document.querySelector('#pass').value;

  var result = zxcvbn(pass);
  var guesses = result.guesses;
  var suggestions = result.feedback.suggestions;

  var level = 0;
  for(var i =1; pass.length && i<levels.length; i++) 
    if (levels[i].guesses < guesses) level=i

  if (pass.length < 8 && level >= 3) level = 2;

  klass = guesses >= levels[level].guesses ? levels[level] : klass

  document.querySelector('#bar').className = klass.class;
  document.querySelector('#str-text').className = klass.class+"-text";
  document.querySelector('#str-text').innerHTML = klass.text;
  
  var suggest = default_suggest;
  if (level == 3) suggest = "";
  document.querySelector("#suggest").innerHTML = suggest;

  return true;
}

window.onload = function(){
  //Key listener for password entry
  document.querySelector('#pass').onkeyup = checkStrength;
  checkStrength(null);
};

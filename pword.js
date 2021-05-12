//DEFAULT VALUES
var levels = [ 
  {
    "text" : "Too weak",
    "class" : "too-weak",
  }, 
  {
    //Weak = 6 or more characters
   "text" : "Weak",
    "class" : "weak",
    "regex" : new RegExp(".{6,}")
  },  
  {
    //Average = 8 or more characters
    "text" : "could be stronger",
    "class" : "average",
    "regex" : new RegExp(".{8,}")
  }, 
  {
    //Strong = 10 or more characters
    "text" : "Strong",
    "class" : "strong",
    "regex" : new RegExp(".{10,}")
  }, 
 ];

// Use the loaded regex's to caluclate the strength of the text in the input box
function checkStrength(event) {
  var klass = levels[0];
  var bar = document.querySelector('#bar');
  var pass = document.querySelector('#pass').value;

  for(var i =1; pass.length && i<levels.length; i++) 
    klass = levels[i].regex.test(pass) ? levels[i] : klass
  document.querySelector('#bar').className = klass.class;
  document.querySelector('#str-text').className = klass.class+"-text";
  document.querySelector('#str-text').innerHTML = klass.text;
  return true;
}

// Copies the regex's from the input boxes into the levels array. Displays error if regex cant compile
function loadReg(event) {
  var reg = null; var flags = null; var pattern = null; var inputstring = null;

  for (var i=1; i<=3; i++)
    try {
      inputstring = document.querySelector("#reg" + i).value
      flags = inputstring.replace(/.*\/([gimy]*)$/, '$1');
      pattern = inputstring.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
      levels[i].regex = new RegExp(pattern, flags);
      document.querySelector("#reg"+i+"-err").style.display = "none";
    } catch (err) {
      document.querySelector("#reg"+i+"-err").style.display = "inline-block";
    }
  checkStrength(null);
}

window.onload = function(){
  //Key listener for password entry
  document.querySelector('#pass').onkeyup = checkStrength;
  for (var i=1; i<=3; i++) {
    //Copy defaults into the input boxes & attach key listener
    reg = document.querySelector("#reg"+i);
    reg.onkeyup = loadReg;
    reg.value=levels[i].regex
  }
  //Initial run
  loadReg(null);
};

var synth = window.speechSynthesis;

var inputTxt = document.querySelector('.main-text');
var start = document.querySelector('.start');
var stop = document.querySelector('.stop');
var title = document.querySelector('.page-title');
var idk = document.querySelector('.idk');

var voices = [];

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.textContent);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    };
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    };
    var selectedOption = 'en-US';
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }
}

function speakIDK(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (idk.value !== '') {
        var utterThis = new SpeechSynthesisUtterance(idk.textContent);
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        };
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        };
        var selectedOption = 'en-US';
        for(i = 0; i < voices.length ; i++) {
            if(voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
            }
        }
        utterThis.pitch = 1;
        utterThis.rate = 1;
        synth.speak(utterThis);
    }
}

function speakTitle(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (title.value !== '') {
        var utterThis = new SpeechSynthesisUtterance(title.textContent);
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        var selectedOption = 'en-US';
        for(i = 0; i < voices.length ; i++) {
            if(voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
            }
        }
        utterThis.pitch = 1;
        utterThis.rate = 1;
        synth.speak(utterThis);
    }
}

window.onload = function(event) {
  event.preventDefault();
  speak();
  inputTxt.blur();
};

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var links = [ 'about' , 'homepage' , 'history', 'departments', 'faculties', 'campus'];
var grammar = '#JSGF V1.0; grammar links; public <color> = ' + links.join(' | ') + ' ;';

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');


document.body.onclick = function() {
    recognition.start();
    console.log('Ready to receive a color command.');
};

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var voice = event.results[last][0].transcript;
    //diagnostic.textContent = 'Result received: ' + color + '.';
    console.log(voice);
    if(links.includes(voice)){
        window.location = "/speech/" + voice + ".html" ;
        synth.cancel();
    }else if(voice === "where is here"){
        speakTitle();

    }else if(voice === "stop"){
        synth.cancel();
    }else if(voice==="repeat"){
        speak();
    }
    else{
        synth.cancel();
        idk.textContent = "You have entered an invalid command. You said sentence :" + voice;
        speakIDK();
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
};

recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onnomatch = function(event) {
    diagnostic.textContent = "I didn't recognise that.";
};

recognition.onerror = function(event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
};




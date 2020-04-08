/*
VOLTAIRE CONNECT
This extension dump the sentence shown on screen then send it to a server 
to process and check spelling mistakes.
This work is licensed under GNU GPL 3.0 license.
*/

// Time before fetching sentence again
const TIME_REPEAT = 3000;
const LANGUAGE_TOOL_API = "https://www.languagetool.org/api/v2/check";
const VERSION = "DEV";

//Old sentence 
var oldSentence = [];

/*
    MAIN
*/
function fetchContent() {
    //Get sentence from website
    var sentence = getSentenceArray();
    
    if (sentence.toString() != oldSentence.toString()) {
        //Replace old sentence
        oldSentence = sentence;
        
        //Just to inform
        console.warn("VC: Sentence Detected: " + sentenceArrayStringify(sentence));

        //Send sentence and change color of the word desired
        fixSentence(sentence);
    }
}

/*
    Merge sentence list into a string
*/
function sentenceArrayStringify(sentenceArray) {
    var sentenceOut = "";

    for (i = 0; i < sentenceArray.length; i++) { 
        sentenceOut += sentenceArray[i];
    }
    
    return sentenceOut;
}

/*
    Get word at a given index 
    Example :
    "This is a sentence" -> ["This", " ", "is", " ", "a", " ", "sentence"]
    index: 2 = 0 
    index: 5 = 2
    index: 8 = 4
*/
function getWordIndex(sentenceArray, offset) {
    //Keep track of the current index
    var currentIndex = 0;

    for (word = 0; word < sentenceArray.length; word++) {
        for (letter = 0; letter < sentenceArray[word].length; letter++) {
            if (currentIndex == offset) {
                return word;
            }
            currentIndex++;
        }
    }

    //Error then
    return -1;
}


/*
    Language tool json spelling mistake parser
    Get the word index the spelling mistake
*/
function parseLanguageToolError(jsonInput, sentence) {
    //Check if we of any json at all
    console.log(jsonInput);

    //Parse raw text into JSON
    var parsedContent = JSON.parse(jsonInput);

    //Says how many error is in the sentence
    console.log("VC: " + parsedContent.matches.length + " error(s) detected");

    //Check if there is not matches using LT
    if (parsedContent.matches.length == 0)
        return;

    //There is something, color it in red...
    for (match = 0; match < parsedContent.matches.length; match++) {
        console.log("Match:" + parsedContent.matches[match], "- word: " + sentence[getWordIndex(sentence, parsedContent.matches[match].offset)]);
        setWordColor(getWordIndex(sentence, parsedContent.matches[match].offset), "red");
    }
}

/*
    Change the color of the word
*/
function setWordColor(wordId, color) {

    var content = document.getElementsByClassName("pointAndClickSpan");

    if (wordId == undefined || wordId > content.length) {
        console.error("WordID error, got " + wordId);
        return;
    }

    //Set color
    content[wordId].style["color"] = color;
}

/*
Do a request to Langage tool website and propose correcion
*/
function fixSentence(sentence) {
    
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", LANGUAGE_TOOL_API, true);
    
    //From language tool API
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");
    
    //Send request
    xhr.send("text=" + sentenceArrayStringify(sentence) + "&language=fr&enabledOnly=false");

    //Try to get the JSON from the API
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.warn("VC: Recieved response from LT");
                parseLanguageToolError(xhr.responseText, sentence);

            } else {
                console.error("VC: Couldn't get response from LanguageTools, the API may be down or you may have been banned");
                console.error("VC - Debug: " + xhr.statusText + " - " + e.type);
                console.error("VC - Debug: Got " + xhr.status + " from API")
            }
        }
        else
        {
            console.error("VC: Got " + xhr.readyState + " in readyState");
        }
    };
    
    //Error handler
    xhr.onerror = function (e) {
        console.error("VC: " + xhr.statusText);
    };

}

function initExtension () {
    
    //Just says that the extension is loaded
    console.warn("Voltaire Connect Init - " + VERSION);
}

//Init extension
initExtension();


//Fetches every TIME ms to check if there is something new
setInterval(fetchContent, TIME_REPEAT);
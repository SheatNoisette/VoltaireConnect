/*
VOLTAIRE CONNECT
This extension dump the sentence shown on screen then send it to a server 
to process and check spelling mistakes.
This work is licensed under GNU GPL 3.0 license.
*/

// Time before fetching sentence again
const LANGUAGE_TOOL_API = "https://www.languagetool.org/api/v2/check";

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
    for (let match = 0; match < parsedContent.matches.length; match++) {
        console.log("Match:" + parsedContent.matches[match], "- word: " + sentence[StringUtils.getWordIndex(sentence, parsedContent.matches[match].offset)]);
        VoltaireParser.setWordColor(StringUtils.getWordIndex(sentence, parsedContent.matches[match].offset), "red");
    }
}

/*
Do a request to Langage tool website and propose correcion
*/
function fixSentence(sentence) {
    //Create request
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", LANGUAGE_TOOL_API, true);
    
    //From language tool API
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");
    
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
    
    //Send request
    xhr.send("text=" + encodeURI(StringUtils.sentenceStringify(sentence)) + "&language=fr&enabledOnly=false");
}

/*
Main extension class
*/
class VoltaireConnect {
    constructor() {
        //Variables

        //Version of the extension
        this.VERSION = "DEV";

        //Delay before updating content
        this.TIME_REPEAT = 3000;

        //Old sentence detected
        this.oldSentence = []

        //Just says that the extension is loaded
        console.warn("Voltaire Connect Init - " + this.VERSION);
    }

    fetchContent() {
        //Get sentence from website
        let sentence = VoltaireParser.getSentenceArray();

        // Check if oldSentence if declared or not
        if (this.oldSentence == undefined) 
            this.oldSentence = [];
        
        if (sentence.toString() != this.oldSentence.toString()) {
            //Replace old sentence
            this.oldSentence = sentence;
            
            //Just to inform
            console.warn("VC: Sentence Detected: " + StringUtils.sentenceStringify(sentence));
            
            //Send sentence and change color of the word desired
            fixSentence(sentence);
        }
    }
}

let VoltaireExt = new VoltaireConnect();

//Fetches every TIME ms to check if there is something new
setInterval(VoltaireExt.fetchContent, VoltaireExt.TIME_REPEAT);
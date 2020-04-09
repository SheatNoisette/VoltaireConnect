/*
VOLTAIRE CONNECT
This extension dump the sentence shown on screen then send it to a server 
to process and check spelling mistakes.
This work is licensed under GNU GPL 3.0 license.
*/

// Time before fetching sentence again
const LANGUAGE_TOOL_API = "https://www.languagetool.org/api/v2/check";

/*
Main extension class
*/
class VoltaireConnect {
    constructor(languageToolApi) {
        //Variables

        //Version of the extension
        this.VERSION = "DEV";

        //Delay before updating content
        this.TIME_REPEAT = 3000;

        //Old sentence detected
        this.oldSentence = [];

        //Api string for LT
        this.languageToolApiString = languageToolApi;

        //Just says that the extension is loaded
        console.warn("Voltaire Connect Init - " + this.VERSION);
    }

    fetchContent (){

        //LT Object API
        let languageToolApi = new LanguageToolAPI(this.languageToolApiString);

        //Get sentence from website
        let sentence = VoltaireParser.getSentenceArray();

        // Check if oldSentence if declared or not
        if (this.oldSentence == undefined) this.oldSentence = [];
        
        if (sentence.toString() != this.oldSentence.toString()) {
            //Replace old sentence
            this.oldSentence = sentence;
            
            //Just to inform
            console.warn("VC: Sentence Detected: " + StringUtils.sentenceStringify(sentence));
            console.warn("VC: Raw: [" + sentence.toString() + "]");
            
            //Send sentence and change color of the word desired
            languageToolApi.fixSentence(sentence);
        }
    }
}

//Main extension class
let VoltaireExt = new VoltaireConnect(LANGUAGE_TOOL_API);

//Fetches every TIME ms to check if there is something new
setInterval(VoltaireExt.fetchContent, VoltaireExt.TIME_REPEAT);
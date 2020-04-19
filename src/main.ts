/*
            ___                            _
    /\   /\/ __\___  _ __  _ __   ___  ___| |_
    \ \ / / /  / _ \| '_ \| '_ \ / _ \/ __| __|
     \ V / /__| (_) | | | | | | |  __/ (__| |_
      \_/\____/\___/|_| |_|_| |_|\___|\___|\__|

        Sentence checker for Projet-Volatire
          This extension dump the sentence 
      shown on screen then send it to a server
        to process and check spelling mistakes.
     This work is licensed under GNU GPL 3.0 license.
*/

/*
Main extension class
*/
class VoltaireConnect {

    //Class definition
    //Version of the extension
    VERSION: string = "DEV";

    //Delay before updating content
    TIME_REPEAT: number = 3000;

    // Old sentence detected from PV
    private oldSentence: Array<string>;

    //Api string for LT
    languageToolApiString: String;

    //Language tool object
    languageTool: LanguageToolAPI;

    //Cordial-Reverso spellchecker
    cordialAPI: CordialAPI;

    // Warning Tree
    private VTree = new VoltaireTree();

    //Feature toggle
    enabledLanguageTool: boolean; /* Language Tool */
    enabledWordList: boolean; /* Wordlist */
    enabledCordial: boolean; /* Cordial */

    constructor(public languageToolApi:String) {

        //Api string for LT
        this.languageToolApiString = languageToolApi;

        //Create object for correction
        this.languageTool = new LanguageToolAPI(this.languageToolApiString);

        //Create Cordial API
        this.cordialAPI = new CordialAPI();

        //Generate warning tree
        this.VTree.Gen_Tree();

        //Assign oldSentence
        this.oldSentence = [];

        //Enable features
        this.enabledLanguageTool = true;
        this.enabledWordList = true;
        //Cordial is disabled by default - EULA forbid it
        this.enabledCordial = false;

        //Just says that the extension is loaded
        console.warn("Voltaire Connect Init - " + this.VERSION);
    }

    fetchContent (){

        //Get sentence from website
        let sentence:Array<string> = VoltaireParser.getSentenceArray();

        // Refresh
        if (sentence.toString() != this.oldSentence.toString()) {
            //Replace old sentence
            this.oldSentence = sentence;

            //Just to inform
            console.warn("VC: Sentence Detected: " + StringUtils.sentenceStringify(sentence));
            console.warn("VC: Raw: [" + sentence.toString() + "]");

            //Word list system
            if (this.enabledWordList) {
                // Get Yellow words position (possible error/truth | focus point )
                var IDS = this.VTree.AreError(sentence);

                console.warn("WL answer => ", IDS);
                //Color the obtained words into the webpage
                for (var i = 0; i < IDS.length; i++) {
                    var elem = IDS[i];
                    for (var j = elem[0]; j <= elem[1]; j++) {
                        VoltaireParser.setWordColor(j,"gold");
                    }
                }
            }

            //Send sentence and change color of the word desired

            //LanguageTool
            if (this.enabledLanguageTool)
                this.languageTool.fixSentence(sentence);
            
            //Cordial checker
            if (this.enabledCordial)
                this.cordialAPI.fixSentence(sentence);
        }
    }
    /*
        Handler internal messages from popup
    */
    handleMessage(request, sender, sendResponse) {

        //Enable Language tools
        if (request.enable == "languagetools") {
            this.enabledLanguageTool = !this.enabledLanguageTool;
            sendResponse({enabled: this.enabledLanguageTool});
        }
        //Wordlist enable
        else if (request.enable == "wordlist") {
            this.enabledWordList = !this.enabledWordList;
            sendResponse({enabled: this.enabledWordList});
        }
        //Wordlist enable
        else if (request.enable == "cordial") {
            this.enabledCordial  = !this.enabledCordial ;
            sendResponse({enabled: this.enabledCordial});
        } 
        //Fake Reset color attributes
        else if (request.enable == "clear") {
            VoltaireParser.resetWordColor();
        }

        //Status
        console.warn("VC : - LT: " + this.enabledLanguageTool + " WL: " + this.enabledWordList + " CD: " + this.enabledCordial);
    }
}

//Language tool API
const LANGUAGE_TOOL_API = "https://www.languagetool.org/api/v2/check";

//Main extension class
var VoltaireExt = new VoltaireConnect(LANGUAGE_TOOL_API);

//Handle message from popup
browser.runtime.onMessage.addListener(
    (request, sender, sendResponse) => VoltaireExt.handleMessage(request, sender, sendResponse)
);

//Fetches every TIME ms to check if there is something new
setInterval(() => VoltaireExt.fetchContent(), VoltaireExt.TIME_REPEAT);

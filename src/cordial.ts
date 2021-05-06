/*
            ___                            _   
    /\   /\/ __\___  _ __  _ __   ___  ___| |_ 
    \ \ / / /  / _ \| '_ \| '_ \ / _ \/ __| __|
     \ V / /__| (_) | | | | | | |  __/ (__| |_ 
      \_/\____/\___/|_| |_|_| |_|\___|\___|\__|
                                                
        Sentence checker for Projet-Volatire
*/

/*
    This class is the simple Cordial API from Reverso implementation
    !! This should not be used as the primary API because the EULA forbid it. !!
*/

class CordialAPI implements ISpellChecker {

    //Class definition
    API_URL;

    /*
       constructor of the Reverso - Cordial API
   */
    constructor() {

        // Cordial Api based on Reverso
        this.API_URL = "https://orthographe.reverso.net/RISpellerWS/RestSpeller.svc/v1/CheckSpellingAsXml/language=fra?outputFormat=json&doReplacements=true&interfLang=fr&dictionary=both&spellOrigin=interactive&includeSpellCheckUnits=true&includeExtraInfo=true&isStandaloneSpeller=true";
    }

    /*
        Parse Cordial error and change the word color to red
        jsonInput: Raw response from server
        sentenceArray: Raw PV array representing the sentence
    */
    static parseError(jsonInput, sentenceArray) {
        //Parse raw text into JSON
        let parsedContent = JSON.parse(jsonInput);

        //Corrections detected 
        let XMLCorrectionString: string = parsedContent.Corrections;

        //Create a new XMLParser and parse string
        let XMLparser = new DOMParser();
        let XMLCorrection = XMLparser.parseFromString(XMLCorrectionString, "text/xml");

        //Debug - Get number of errors
        let errorNumber = XMLCorrection.getElementsByTagName("error").length;

        //Says number of errors
        console.log("VC: Cordial : " + errorNumber + " error(s) detected");

        //Iterate through
        for (let currentError = 0; currentError < errorNumber; currentError++) {

            //Get the first error and get positons
            let errorPosition: number = parseInt(XMLCorrection.getElementsByTagName("error")[currentError].getAttribute("start"), 10);

            //Check if the number if valid
            if (errorPosition == NaN) {
                console.error("VC : Cordial - Error while parsing number, got NaN!");
                return;
            }

            //Get index
            let wordIndex = StringUtils.getWordIndex(sentenceArray, errorPosition);

            //Get links if it's a composed word
            let wordsLinks = StringUtils.linkWord(sentenceArray, wordIndex);

            //Debug
            console.warn("VC : Cordial - Word: " + sentenceArray[wordIndex], " - Links :" + wordsLinks.toString() + " \n Error Offset : " + errorPosition);
            console.warn(XMLCorrection.all);
            console.warn(XMLCorrection.getElementsByTagName("error")[currentError].getAttribute("start"));

            //Paint links red
            for (let link = 0; link < wordsLinks.length; link++) {
                console.warn("Painting: " + sentenceArray[wordsLinks[link]]);
                VoltaireParser.setWordColor(wordsLinks[link], "darkorange");
            }
        }
    }

    async fixSentence(sentenceArray: Array<string>) {

        //Create request
        var xhr = new XMLHttpRequest();

        //Create POST request
        xhr.open("POST", this.API_URL, true, "OnlineSpellerWS");

        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; Slackware; Linux x86_64; rv:42.0) Gecko/20100101 Firefox/42.0");
        xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
        xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.5");
        xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.setRequestHeader("Created", "01/01/0001 00:00:00");
        xhr.setRequestHeader("Username", "OnlineSpellerWS");
        xhr.setRequestHeader("Content-Length", StringUtils.sentenceStringify(sentenceArray).length.toString());
        xhr.setRequestHeader("DNT", "1");
        xhr.setRequestHeader("Connection", "keep-alive");
        xhr.setRequestHeader("Referer", "https://www.reverso.net/orthographe/correcteur-francais/");
        xhr.setRequestHeader("TE", "Trailers");
        xhr.setRequestHeader("Pragma", "no-cache");
        xhr.setRequestHeader("Cache-Control", "no-cache");

        //Try to get the JSON from the API
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.warn("VC: Recieved response from Reverso-Cordial");
                    CordialAPI.parseError(xhr.responseText, sentenceArray);

                } else {
                    console.error("VC: Couldn't get response from Reverso-Cordial, the API may be down or you may have been banned");
                    console.error("VC - Debug: " + xhr.statusText + " - " + e.type + " - " + xhr.responseText);
                    console.error("VC - Debug: Got " + xhr.status + " from Reverso-Cordial API")
                }
            }
        };

        //Error handler
        xhr.onerror = function (e) {
            console.error("VC - Reverso-Cordial: " + xhr.statusText);
        };

        //Send request
        xhr.send(StringUtils.sentenceStringify(sentenceArray));
    }
}
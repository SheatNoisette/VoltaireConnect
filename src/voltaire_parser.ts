/*
            ___                            _   
    /\   /\/ __\___  _ __  _ __   ___  ___| |_ 
    \ \ / / /  / _ \| '_ \| '_ \ / _ \/ __| __|
     \ V / /__| (_) | | | | | | |  __/ (__| |_ 
      \_/\____/\___/|_| |_|_| |_|\___|\___|\__|
                                                
        Sentence checker for Projet-Volatire
*/

/*
    This class parse the content of the page to get the sentence and change
    the color of the word ip we want
*/

class VoltaireParser {
    /*
        Change the color of the word required
        wordId: id of the word
        color: color of the word (css style color)
    */
    static setWordColor(wordId, color):void {
        let content = document.getElementsByClassName("pointAndClickSpan");

        //If there is a problem using
        if (wordId == undefined || wordId > content.length) {
            console.error("WordID error, got " + wordId);
            return;
        }

        //Set color
        content[wordId].setAttribute("style", "color:" + color + ";");
    }

    /*
        Get sentence from website as an array
    */
    static getSentenceArray():Array<string> {
        var content = document.getElementsByClassName("pointAndClickSpan");

        var sentence = [];

        //Merge word into a sentence
        for (let i = 0; i < content.length; i++) { 
            sentence.push(content[i].textContent);
        }
        
        return sentence;
    }
}
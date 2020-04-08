/*
            ___                            _   
    /\   /\/ __\___  _ __  _ __   ___  ___| |_ 
    \ \ / / /  / _ \| '_ \| '_ \ / _ \/ __| __|
     \ V / /__| (_) | | | | | | |  __/ (__| |_ 
      \_/\____/\___/|_| |_|_| |_|\___|\___|\__|
                                                
        Sentence checker for Projet-Volatire
*/

/*
    This class contains tools to help parsing sentence from PV
*/
class StringUtils {
    /*
        Merge sentence list into a string
        sentenceArray: Raw sentence array from PV parser

        Example:
        ["This", " ", "is", "a", "test", "!"] -> "This is a test!"

    */
    static sentenceStringify(sentenceArray) {
        var sentenceOut = "";

        for (let i = 0; i < sentenceArray.length; i++) { 
            sentenceOut += sentenceArray[i];
        }
    
        return sentenceOut;
    }

    /*
    Get word at a given index 
    sentenceArray: Raw sentence array from PV
    offset: letter offset

    Example :
        SentenceArray: ["This", " ", "is", " ", "a", " ", "sentence"]
        offset: 2 = 0 
        offset: 5 = 2
        offset: 8 = 4
    */
    static getWordIndex(sentenceArray, offset) {
        //Keep track of the current index
        let currentIndex = 0;
        
        for (let word = 0; word < sentenceArray.length; word++) {
            for (let letter = 0; letter < sentenceArray[word].length; letter++) {
                if (currentIndex == offset) {
                    return word;
                }
                currentIndex++;
            }
        }
        
        //Error then
        return -1;
    }


}
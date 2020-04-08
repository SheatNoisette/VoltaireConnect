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

}
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
    static sentenceStringify(sentenceArray):string {
        var sentenceOut = "";

        for (let i = 0; i < sentenceArray.length; i++) { 
            sentenceOut += sentenceArray[i];
        }
    
        return sentenceOut;
    }

    /*
    Get word at a given index 
    sentenceArray: Raw sentence array from PV
    offset: letter offset (space is counted)

    Example :
        SentenceArray: ["This", " ", "is", " ", "a", " ", "sentence"]
        offset: 2 = 0 
        offset: 5 = 2
        offset: 8 = 4
    */
    static getWordIndex(sentenceArray:Array<string>, offset:number):number {
        //Keep track of the current index
        let currentIndex:number = 0;
        
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

    /*
        Link a group of words together
        
        Example:
        sentenceArray: ["Est", "-", "ce", " ", "qu", "'", "il", " ", "est", " ", "là", "?"]
        wordIndex: 0 - Return: 0 1 2
        wordIndex: 4: Return 4 5 6

    */
    static linkWord(sentenceArray:Array<string>, wordIndex:number):Array<number> {

        //Detected WordId
        let links: Array<number> = [];
        
        // Push word Index
        links.push(wordIndex);
        
        //Check if it's a space
        if (sentenceArray[wordIndex] == " ") return links;

        // Iterate right
        let x = wordIndex + 1;
        while (x < sentenceArray.length && sentenceArray[x] != " ") {
            links.push(x);
            x++;
        }
        
        // Iterate left
        x = wordIndex - 1;
        while (x >= 0 && sentenceArray[x] != " ") {
            links.push(x);
            x--;
        }

        return links;
    }
}
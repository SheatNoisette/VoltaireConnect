/*
            ___                            _   
    /\   /\/ __\___  _ __  _ __   ___  ___| |_ 
    \ \ / / /  / _ \| '_ \| '_ \ / _ \/ __| __|
     \ V / /__| (_) | | | | | | |  __/ (__| |_ 
      \_/\____/\___/|_| |_|_| |_|\___|\___|\__|
                                                
        Sentence checker for Projet-Volatire
                PV Website parser
*/

//Get sentence from website
function getSentenceArray() {
    var content = document.getElementsByClassName("pointAndClickSpan");
    var sentence = [];

    //Merge word into a sentence
    for (i = 0; i < content.length; i++) { 
        sentence.push(content[i].textContent);
    }

    return sentence;
}
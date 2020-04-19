/*
            ___                            _   
    /\   /\/ __\___  _ __  _ __   ___  ___| |_ 
    \ \ / / /  / _ \| '_ \| '_ \ / _ \/ __| __|
     \ V / /__| (_) | | | | | | |  __/ (__| |_ 
      \_/\____/\___/|_| |_|_| |_|\___|\___|\__|
                                                
        Sentence checker for Projet-Volatire
*/

//Send message to content script enabling LT
document.getElementById("VC_enableLT").onclick = function () { 
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {enable: "languagetools"}, function(response) {
            //LT enable ?
            document.getElementById("VC_enableLT").textContent = response.enabled;
        });
    });
};

//Send message to content script enabling Wordlist
document.getElementById("VC_enableWL").onclick = function () { 
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {enable: "wordlist"}, function(response) {
            //WL enable ?
            document.getElementById("VC_enableWL").textContent = response.enabled;
        });
    });
};

//Send message to content script enabling Wordlist
document.getElementById("VC_reset").onclick = function () { 
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {enable: "clear"}, function(response) {});
    });
};

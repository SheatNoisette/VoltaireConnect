/*
            ___                            _
    /\   /\/ __\___  _ __  _ __   ___  ___| |_
    \ \ / / /  / _ \| '_ \| '_ \ / _ \/ __| __|
     \ V / /__| (_) | | | | | | |  __/ (__| |_
      \_/\____/\___/|_| |_|_| |_|\___|\___|\__|

        Sentence checker for Projet-Volatire
*/

//Base interface for spellcheckers
interface ISpellChecker {
    fixSentence(sentenceArray:Array<string>):any;
}
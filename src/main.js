/*
VOLTAIRE CONNECT
This extension dump the sentence shown on screen then send it to a server
to process and check spelling mistakes.
This work is licensed under GNU GPL 3.0 license.
*/

// Time before fetching sentence again
const TIME_REPEAT = 3000;
const LANGUAGE_TOOL_API = "https://www.languagetool.org/api/v2/check";
const VERSION = "DEV";

//List of all possible error
var error_list = "il est intéressé de venir|cela l’intéresse de venir|subi|subit|malgré|malgrés|es|ès|Forces conseils|force conseils|mystifier|mythifier|démystifier|démythifier|arête|arrête|recouvrer|recouvrir|retrouver|décade|décennie|empirer|s’empirer|gril|grill|satire|satyre|détoner|détonner|détonant|détonnant|nombre de|nombres de|quantité de|quantités de|entracte|entr’acte|tu mange|tu manges|tu mangeras|nous jouons|nous jouont|aborigène|arborigène|c’en|sans|s’en|elles sont venu|elles sont venues|fabricant|fabriquant|si|s’y|à votre dépens|à vos dépens|à vos dépends|des gaz|des gazs|hormi|hormis|sceptique|septique|certe|certes|tache|tâche|il croit|il croît|notre|nôtre|votre|vôtre|plutôt|plus tôt|soi-disant|soit-disant|tu tries|tu tris|quoique|quoi que|des nuages blanc|des nuages blancs|peu de chose|peu de choses|tout autre|toute autre|martyr|martyre|je ferai|je ferais|il travail|il travaille|collision|collusion|biensûr|bien sûr|1,5 kilomètre|1,5 kilomètres|parti|partie|les quatre|les quatres|mange !|manges !|foi|fois|foie|apporter|amener|emporter|emmener|panacée|panacée universelle|elle a l’air sérieux|elle a l’air sérieuse|un acceuil chaleureux|un accueil chaleureux|ces|ses|parmi|parmis|pénitentier|pénitentiaire|diagnostic|diagnostique|fut-ce|fût-ce|pause|pose|rémunérer|rénumérer|cent|cents|krach|crack|crac|craque|obnubiler|omnibuler|omnubiler|exprès|express|faire bonne chair|faire bonne chère|raisonner|résonner|bâiller|bailler|bayer|lune|Lune|je lui ai donné tous les conseils que j’ai pu|que j’ai pus|tous les|tout les|presqu’|presque|ayant droit|ayants droit|en fesant|en faisant|avenir|à venir|tout heureuse|toute heureuse|tout honteuse|toute honteuse|peut être|peut-être|s’avérer|parce que|par ce que|balade|ballade|les fraises que j’ai mangé|les fraises que j’ai mangées|tout à vous|toute à vous|huit heure|huit heures|quelque|quel que|l’ouest|l’Ouest|auparavant|auparavent|au paravant|au par avant|sans dessus dessous|sens dessus dessous|censé|sensé|des erreurs, j’en ai fait|des erreurs, j’en ai faites|il a mangé|il a manger|négligeant|négligent|négligeance|négligence|si il fait beau|s’il fait beau|ils sont légions|ils sont légion|on|ont|caporal chef|caporal-chef|chef-correcteur|chef correcteur|a|à|inclinaison|inclination|le dit|ledit|rien moins que|rien de moins que|convaincant|convainquant|ils chantent|ils chantes|développement|dévelopement|dévellopement|M.|Mr|MM.|Mrs|à l’envi|à l’envie|qu’il ait|qu’il est|est-ce que le repas est prêt ?|est-ce que le repas est-il prêt ?|excepté eux|exceptés eux|qu’en|quand|vu|vue|accourir|on se demande ce qu’elle va faire|on se demande qu’est-ce qu’elle va faire|des comptables compétent|des comptables compétents|est|et|repaire|repère|je le savais|je le savait|en son for intérieur|en son fort intérieur|les lundi|les lundis|les lundis soir|les lundis soirs|différend|différent|les Duponts|les Dupont|scénette|saynète|je peut|je peux|frustre|fruste|-inds|-ins|-ind|-int|bimensuel|bimestriel|apprendre l’anglais|apprendre l’Anglais|des erreurs, j’en ai fait|des erreurs, j’en ai faites|malgré que|bien que|lorsqu’Anne est arrivée|lorsque Anne est arrivée|m’entend-il|m’entend-t-il|état|État|ce faisant|se faisant|pour ce faire|pour se faire|à l’attention de|à l’intention de|-ouds|-ous|-oud|-out|voir|voire|orange|oranges|acompte|accompte|ayons|ayions|soyez|soyiez|ils sont debout|ils sont debouts|ils sont ensemble|ils sont ensembles|dans|d’en|on a, on en, on y|on n’a, on n’en, on n’y|afin que|accro|accroc|église|Église|répercussion|répercution|eh bien|et bien|-amment|-emment|suggestion|sujétion|entretien|entretient|etc…|etc.|demi|demie|bleu foncé|bleues foncées|fond|fonds|des robes blanc et noir|des robes blanches et noires|leur|leurs|pallier quelque chose|pallier à quelque chose|conjecture|conjoncture|quand|quant|un chiffre d’affaire|un chiffre d’affaires|ou|où|tout énervée|toute énervée|au temps pour moi !|autrement|autrement plus|décrépi|décrépit|les villes que j’ai eu à visiter|que j’ai eues à visiter|de suite|tout de suite|près|prêt|connection|connexion|langage|language|sitôt|si tôt|res-|ress-|vous contrefaisez|vous contrefaites|aussi que|autant que|au jour d’aujourd’hui|caféine|caféïne|moi qui fais|moi qui fait|toi qui mange|toi qui manges|elle s’est faite faire|elle s’est fait faire|cote|côte|ni|n’y|les cent euros que cela m’a coûtés|les cent euros que cela m’a coûté|intéresser|interresser|jusque chez lui|jusqu’à chez lui|les bleu ciel|les bleus ciel|les bleus ciels|s’il neige, je prendrai mes skis|s’il neige, je prendrais mes skis|quelque|quelques|Pierre ou Paul t’aidera|Pierre ou Paul t’aideront|crée|créée|elle se fait fort|elle se fait forte|avoir à faire|avoir affaire|les enfants que j’ai entendu crier|les enfants que j’ai entendus crier|la|là|l’a(s)|les roues arrière|les roues arrières|aie|aies|ais|vous dites|vous dîtes|magasin|magazin|magasine|magazine|opprobe|opprobre|dieu|Dieu|la plupart est|la plupart sont|saint|Saint-|infatigable|infatiguable|j’envoie|j’envois|mieu|mieux|un envoi|un envoie|elle s’est souvenu|elle s’est souvenue|apeller|appeler|rapelle|rappelle|gradation|graduation|inclue|incluse|exigeant|exigent|exigeance|exigence|hiberner|hiverner|remercier|remerçier|vous contredisez|vous contredites|pécuniaire|pécunier|il se détend|il se détent|sans parole|sans paroles|exact|èxact|va-t-en|va-t’en|trois quarts|trois-quarts|j’ai été|je suis allé|prolongation|prolongement|davantage|d’avantage(s)|elle a chanté|elle a chantée|deux à trois|deux ou trois|vous parler|vous parlez|formenter|fomenter|son|sont|ils se sont téléphoné|ils se sont téléphonés|ça|çà|sa|je vous saurais gré|je vous serais gré|après qu’il a|après qu’il ait|nous crions|nous criions|vous criez|vous criiez|voie|voix|personel|personnel|professionnel|professionel|nationnal|national|vingt|vingts|elle s’est rendue compte|elle s’est rendu compte|dilemme|dilemne|ils se sont faits l’écho|ils se sont fait l’écho|ci-joint|ci-joints|ci-jointe|c’est|s’est|ce sont|se sont|pour les voirs|pour les voir|du|dû|une qualitée|une qualité|l’amitiée|l’amitié|une teinte brunatre|une teinte brunâtre|là où le bas blesse|là où le bât blesse|lui même|lui-même|elles-même|elles-mêmes|employer|employé|en l’occurence|en l’occurrence|à l’instar de|je concluerai|je conclurai|je concluerais|je conclurais|cauchemar|cauchemard|il faut mieux|il vaut mieux|va|vas|mille|milles|or|hors|dans toute l’acceptation du terme|dans toute l’acception du terme|somptuaire|somptueux|agonir|agoniser|un espèce de sorcier|une espèce de sorcier|Elle|Je|Il|";

var STree = null;
//Old sentence
var oldSentence = [];

/*
    MAIN
*/


function Tree(key,childs)
{
  this.key = key;
  this.childs = childs;
  this.child_nb = childs.length;
}

function fill_tree(stringArray,index,size,MyTree)
{
  if(index < size)
  {
    var found = 0;
    for (var i = 0; i < MyTree.child_nb; i++) {
      if(MyTree.childs[i].key == stringArray[index])
      {
        found = 1;
        fill_tree(stringArray,index+1,size,MyTree.childs[i]);
        break
      }
    }
    if(found == 0)
    {
      MyTree.childs.push(new Tree(stringArray[index],[]));
      MyTree.child_nb += 1;
      fill_tree(stringArray,index+1,size,MyTree.childs[i]);
    }
  }
}

function Gen_Tree()
{
  var SearchTree = new Tree("",[]);
  var errors = error_list.split("|");
  for (var i = 0; i < errors.length; i++) {
    var tmp = errors[i].split(" ");
    fill_tree(tmp,0,tmp.length,SearchTree);
  }
  return SearchTree;

}


function fetchContent() {
    //Get sentence from website
    var sentence = getSentenceArray();

    if (sentence.toString() != oldSentence.toString()) {
        //Replace old sentence
        oldSentence = sentence;

        //Just to inform
        console.warn("VC: Sentence Detected: " + sentenceArrayStringify(sentence));

        //Send sentence and change color of the word desired
        fixSentence(sentence);
    }
}

/*
    Merge sentence list into a string
*/
function sentenceArrayStringify(sentenceArray) {
    var sentenceOut = "";

    for (i = 0; i < sentenceArray.length; i++) {
        sentenceOut += sentenceArray[i];
    }

    return sentenceOut;
}

/*
    Get word at a given index
    Example :
    "This is a sentence" -> ["This", " ", "is", " ", "a", " ", "sentence"]
    index: 2 = 0
    index: 5 = 2
    index: 8 = 4
*/
function getWordIndex(sentenceArray, offset) {
    //Keep track of the current index
    var currentIndex = 0;

    for (word = 0; word < sentenceArray.length; word++) {
        for (letter = 0; letter < sentenceArray[word].length; letter++) {
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
    Language tool json spelling mistake parser
    Get the word index the spelling mistake
*/
function parseLanguageToolError(jsonInput, sentence) {
    //Check if we of any json at all
    console.log(jsonInput);

    //Parse raw text into JSON
    var parsedContent = JSON.parse(jsonInput);

    //Says how many error is in the sentence
    console.log("VC: " + parsedContent.matches.length + " error(s) detected");

    //Check if there is not matches using LT
    if (parsedContent.matches.length == 0)
        return;

    //There is something, color it in red...
    for (match = 0; match < parsedContent.matches.length; match++) {
        console.log("Match:" + parsedContent.matches[match], "- word: " + sentence[getWordIndex(sentence, parsedContent.matches[match].offset)]);
        setWordColor(getWordIndex(sentence, parsedContent.matches[match].offset), "red");
    }
}

/*
    Change the color of the word
*/
function setWordColor(wordId, color) {

    var content = document.getElementsByClassName("pointAndClickSpan");

    if (wordId == undefined || wordId > content.length) {
        console.error("WordID error, got " + wordId);
        return;
    }

    //Set color
    content[wordId].style["color"] = color;
}

/*
Do a request to Langage tool website and propose correcion
*/
function fixSentence(sentence) {

  /* Disable Error check => Warning Only
    var xhr = new XMLHttpRequest();

    xhr.open("POST", LANGUAGE_TOOL_API, true);

    //From language tool API
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");



    //Try to get the JSON from the API
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.warn("VC: Recieved response from LT");
                parseLanguageToolError(xhr.responseText, sentence);

            } else {
                console.error("VC: Couldn't get response from LanguageTools, the API may be down or you may have been banned");
                console.error("VC - Debug: " + xhr.statusText + " - " + e.type);
                console.error("VC - Debug: Got " + xhr.status + " from API")
            }
        }
        else
        {
            console.error("VC: Got " + xhr.readyState + " in readyState");
        }
    };

    //Error handler
    xhr.onerror = function (e) {
        console.error("VC: " + xhr.statusText);
    };

    //Send request
    xhr.send("text=" + sentenceArrayStringify(sentence) + "&language=fr&enabledOnly=false");

    */

    var IDS = AreError(sentence);

    for (var i = 0; i < IDS.length; i++) {
      var elem = IDS[i]
      for (var j = elem[0]; j < elem[1]; j++) {
        setWordColor(getWordIndex(sentence,sentence[j].length-1),"gold");
      }
    }






}

function AreError(sentence)
{
  var word_id = []
  var error_d = 0;
  var maxsize = sentence.length;

  function explorer(sentence,index,size,actual,mem)
  {
    if(index < size)
    {
      if(sentence[index] == " ")
      {
        return explorer(sentence,index+1,size,actual,mem);
      }else
      {
        for (var i = 0; i < actual.child_nb; i++) {
          if(actual.childs[i].key == sentence[index])
          {
            return explorer(sentence,index+1,size,actual.childs[i],index);
          }
        }
        return mem;
      }
    }else
    {
      return mem;
    }
  }
  while(error_d < maxsize)
  {
    var value = explorer(sentence,error_d,sentence.length,STree,-1)
    if(value >= 0)
    {
      word_id.push([error_d,value])
      error_d = value + 1;
    }else
    {
      break;
    }
  }
  return word_id;
}

function initExtension (error_list) {

  //Just says that the extension is loaded
  console.warn("Voltaire Connect Init - " + VERSION);
  STree = Gen_Tree();
  console.log("Voltaire Connect Word Tree loaded ! ");


}



//Init extension
initExtension(error_list);



//Fetches every TIME ms to check if there is something new
setInterval(fetchContent, TIME_REPEAT);

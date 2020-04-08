/*
            ___                            _
    /\   /\/ __\___  _ __  _ __   ___  ___| |_
    \ \ / / /  / _ \| '_ \| '_ \ / _ \/ __| __|
     \ V / /__| (_) | | | | | | |  __/ (__| |_
      \_/\____/\___/|_| |_|_| |_|\___|\___|\__|

        Sentence checker for Projet-Volatire
                PV Website parser
*/

//Get advice string from the html page
function GetFirstAdvice(HtmlPage)
{
	var el = document.createElement( 'html' );
	el.innerHTML = HtmlPage;
	var adv_obj = el.getElementsByClassName('post-preview-excerpt is-truncated')[0];
	return adv_obj.innerText;

}

//Get advice page request to voltaire
function getAdvice(keyword) {

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://www.projet-voltaire.fr/?s="+keyword+"&p=regles", false);
	// Get the page with searched keyword
	xhr.onreadystatechange=function()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
            return GetFirstAdvice(xhr.responseText);
        }
    }
    xhr.send();

}

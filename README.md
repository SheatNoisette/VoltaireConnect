# VoltaireConnect
A simple web extension for Firefox to detect spelling mistakes in 
Projet-Volatire website. This is a proof of concept to learn WebExtensionAPI and
JavaScript. 

This extension has been tested on Firefox 74 and Projet-Volaire 7.2.26.4.
The extension should work fine on Chrome but has not been tested extensively. 

# Required tools

A POSIX compatible environement is required to build a web extension ready to
be imported in Firefox.

To build the Web Extension, simply do:

`make`

It's possible to build a minified version if 
[Terser](https://www.npmjs.com/package/terser) CLI is installed.

To do so, do:

`make webext-min`

# Load untrusted extension into Firefox

As you can imagine, the extension is not signed and never be signed. Thus, you 
need to load the extension yourself using a debugging tool provided by Firefox. 
First, build the extension as explained earlier.

Then, open a new tab on Firefox, copy this "link" on the address tab:

`about:debugging`

Then press 'enter'

Click on "This Firefox" on the top left corner of the page.
Then, click on "Load Temporary Add-on" and select the zip file contained in the
"export" folden on this git or from wherever you downloaded this extension.

If the extension has been sucessifuly loaded, a new item appeared on the top
right of Firefox.

# Important note

This program can get you in trouble if used.
I won't be responsible for any bad grades and/or expulsion from any intitutions/school.

Use this at your own risk! 

# License

This work is licensed under GNU GPL 3.0 License. See LICENSE for details.

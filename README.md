# VoltaireConnect
[![Actions Status](https://github.com/SheatNoisette/VoltaireConnect/workflows/CI/badge.svg)](https://github.com/SheatNoisette/VoltaireConnect/actions)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

---
# This extension isn't maintained anymore 
---

A simple web extension for Firefox to detect spelling mistakes in
Projet-Voltaire website. This is a proof of concept to learn WebExtensionAPI and
TypeScript and shouldn't be used for malicious intent.

This extension has been tested on Firefox 88 and Projet-Voltaire 7.2.62.
The extension should work fine on Chrome but has not been tested extensively and can break anytime.

Prebuilt versions can be found [here](https://github.com/SheatNoisette/VoltaireConnect/releases)

# Required tools

A POSIX compatible environement and [TypeScript](https://www.typescriptlang.org/index.html#download-links)
are required to build a web extension ready to be imported in Firefox.

Add the necessary dependencies:
`npm install`

Then, to build the Web Extension, simply do:
`make`

It's possible to build a minified version if
[Terser](https://www.npmjs.com/package/terser) CLI is installed.

To do so, do:

`make webext-min`

# Load untrusted extension into Firefox

As you can imagine, the extension is not signed and never be signed. Thus, you
need to load the extension yourself using a debugging tool provided by Firefox.
First, build the extension as explained earlier.

Then, open a new tab on Firefox, copy this "link" to the address tab:

`about:debugging`

Then press 'enter'.

Click on "This Firefox" on the top left corner of the page.
Then, click on "Load Temporary Add-on" and select the zip file contained in the
"export" folder on this git or from wherever you downloaded this extension.

If the extension has been successfully loaded, a new item will appear on the top
right of the Firefox toolbar.

# Important note

This program can get you in trouble. We won't be responsible for any bad grades
and/or expulsion from any institutions/school.

Use this at your own risk!

# License

This work is licensed under GNU GPL 3.0 License. See LICENSE for details.

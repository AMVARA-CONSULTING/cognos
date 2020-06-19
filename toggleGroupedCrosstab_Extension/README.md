Extenion to be uploaded into Cognos CA11.x portal.

Serves to provide a common javascript to be used in any report in the CA11 portal.

It uses the "common" view. So is always loaded.
It also loads the common.css where you can globally declare and overwrite css rules.

Upload the extension to your portal, wait minute or two to sync in the filesystem.
Reload the portal Shift+F5, observe that AmvaraCommonJs.js is loaded in Network TAB of Chrome (Ctrl-Shift-I).

There are two functions "t" + "tx" inside that archive.
There is little documentation inside the archive. So
it is not lost, when as this post gets older.

Use the functions t() + tx() in your report in onclick action of element:
window.top.amvara.t('myClassname')
or
window.top.amvara.tx('mySelector').

myClassname should not have a starting "." Using t function 
you must insert empty boxes into the cells to be grouped and give them the classname.
It must be a single classname on that element. Not two or more! The parent element, which
is the TD with the number, is then selected for toggeling.

mySelector should be a valid css selector selecting the fact cells to group.
E.g "td[style='background-color: #cecece']" 

So, adding and HTML-item with
<span onclick=window.top.amvara.t('cls1')>Toggle Column Group 1</span>
should do the work.

We might think about finetuning HTML-item, adding layout elements, that also provides layouts with "+" and "-", to click on, as seen in your first screenshot.
Ideas are welcome.


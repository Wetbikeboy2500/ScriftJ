
function saveTextAsFile() {
	var textToWrite = savecompress();//document.getElementById("inputTextToSave").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = prompt("Enter File Name:", "") + ".txt";//name of the file
    if (fileNameToSaveAs != null + ".txt") {
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }
}

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
        loaddata(textFromFileLoaded);
		//document.getElementById("inputTextToSave").value = textFromFileLoaded; This is the output
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function loadfile() {
    document.getElementById("fileToLoad").click();
}

function savecompress(){
    return oopsave();
}

function loaddata(a){
    var b = a.split("`");
    console.info(b);
    var c = b[1].split("},");
    console.info(c);
    var le = c.length;
    for (var d = 0; d < le; d++) {
        if (c[d].substr(c[d].length - 1) != "}"){
            c[d] = c[d]+"}";
        } else {
            console.info("Has end bracket");
        }
    }
    console.info(c);
    loadobjects(c, b[0], b[2]);
}
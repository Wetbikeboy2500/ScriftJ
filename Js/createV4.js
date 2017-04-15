"use strict";
//version 4 of create.js
var para, fara, cara, att, node, main;

function createobject(type, id, x, y, color) {
    console.log("Creating Element "+ id);
	para = document.createElementNS("http://www.w3.org/2000/svg","g");
    addatt("class", "bl", para);
    fixg(id, x, y);
	main = document.getElementById("editorWindow");
	switch (type) {
	case 0:
            addatt("onmousedown", 'movestart(' + id + ')', para);
        fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            addatt("points", "0,0 150,0 150,30 0,30", fara);
            addatt("style", "fill:"+ color +";fill-rule:evenodd;", fara);
		  para.appendChild(fara);
        main.appendChild(para);
        
		break;
	case 1:
        createinputblock(x, y, 108, "Say:", "text", id, color);
		break;
	case 2:
        createinputblock(x, y, 98, "Move:", "number", id, color);
		break;
	case 3:
		cara = document.createElementNS("http://www.w3.org/2000/svg","g");
            addatt("onmousedown", 'movestart(' + id + ')', cara);
        fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            addatt("points", "0,0 150,0 150,15 145,15 145,5 45,5 45,25 145,25 145,15 150,15 150,30 0,30", fara);
            addatt("style", "fill:"+ color +";fill-rule:evenodd;", fara);
		  cara.appendChild(fara);
        fara = document.createElementNS("http://www.w3.org/2000/svg", "text");
            addatt("x", "2", fara);
            addatt("y", "20", fara);
            addatt("fill", "white", fara);
            node = document.createTextNode("Look:");
		    fara.appendChild(node);
		  cara.appendChild(fara);
        para.appendChild(cara);
        cara = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
            addattNS("width", "100", cara);
            addattNS("height", "20", cara);
            addattNS("x", "45", cara);
            addattNS("y", "5", cara);
        fara = document.createElement("select");
            addatt("style", "width:100px;height:20px;", fara);
            addatt("onchange", "lert(this, 0)", fara);
            addatt("id", 'drop' + id, fara);
                createoption("red", "Red");
                createoption("blue", "Blue");
                createoption("green", "Green");
                createoption("yellow", "Yellow");
        cara.appendChild(fara);
        para.appendChild(cara);
        main.appendChild(para);
		break;
    case 4:
		cara = document.createElementNS("http://www.w3.org/2000/svg","g");
            addatt("onmousedown", 'movestart(' + id + ')', cara);
        fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            addatt("points", "0,0 150,0 150,15 145,15 145,5 45,5 45,25 145,25 145,15 150,15 150,30 0,30", fara);
            addatt("style", "fill:"+ color +";fill-rule:evenodd;", fara);
		  cara.appendChild(fara);
        fara = document.createElementNS("http://www.w3.org/2000/svg", "text");
            addatt("x", "2", fara);
            addatt("y", "20", fara);
            addatt("fill", "white", fara);
            node = document.createTextNode("Shape:");
		    fara.appendChild(node);
		  cara.appendChild(fara);
        para.appendChild(cara);
        cara = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
            addattNS("width", "100", cara);
            addattNS("height", "20", cara);
            addattNS("x", "45", cara);
            addattNS("y", "5", cara);
        fara = document.createElement("select");
            addatt("style", "width:100px;height:20px;", fara);
            addatt("onchange", "lert(this, 0)", fara);
            addatt("id", 'drop' + id, fara);
                createoption("circle", "Circle");
                createoption("rectangle", "Rectangle");
        cara.appendChild(fara);
        para.appendChild(cara);
        main.appendChild(para);
		break;
    case 5:
        createinputblock(x, y, 73, "Change x:", "number", id, color);
        break;
    case 6:
        cara = document.createElementNS("http://www.w3.org/2000/svg","g");
                addatt("onmousedown", 'movestart(' + id + ')', cara);
            fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
                addatt("points", "0,0 150,0 150,15 145,15 145,5 115,5 115,15 91,15 91,5 35,5 35,25 91,25 91,15 115,15 115,25 145,25 145,15 150,15 150,30 0,30", fara);
                addatt("style", "fill:"+ color +";fill-rule:evenodd;", fara);
              cara.appendChild(fara);
            //say: block
            fara = document.createElementNS("http://www.w3.org/2000/svg", "text");
                addatt("x", "2", fara);
                addatt("y", "20", fara);
                addatt("fill", "white", fara);
                node = document.createTextNode("Say:");
                fara.appendChild(node);
              cara.appendChild(fara);
            //for text
            fara = document.createElementNS("http://www.w3.org/2000/svg", "text");
                addatt("x", "95", fara);
                addatt("y", "20", fara);
                addatt("fill", "white", fara);
                node = document.createTextNode("for");
                fara.appendChild(node);
              cara.appendChild(fara);
            para.appendChild(cara);
            //first foreign object
            cara = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
                addattNS("width", "53", cara);
                addattNS("height", "20", cara);
                addattNS("x", "35", cara);
                addattNS("y", "5", cara);
            fara = document.createElement("input");
                addatt("style", "width:53px;", fara);
                addatt("id", 'text' + id, fara);
                addatt("type", "text", fara);
                addatt("name", "input", fara);
                addatt("onchange", "lert(this, 0)", fara);
            cara.appendChild(fara);
        para.appendChild(cara);
        //second foreign
        cara = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
                addattNS("width", "26", cara);
                addattNS("height", "20", cara);
                addattNS("x", "115", cara);
                addattNS("y", "5", cara);
            fara = document.createElement("input");
                addatt("style", "width:26px;", fara);
                addatt("id", '1text' + id, fara);
                addatt("type", "number", fara);
                addatt("name", "input", fara);
                addatt("onchange", "lert(this, 1)", fara);
            cara.appendChild(fara);
        para.appendChild(cara);
main.appendChild(para); 
        break;
        case 7:
            cara = document.createElementNS("http://www.w3.org/2000/svg","g");
            addatt("onmousedown", 'movestart(' + id + ')', cara);
        fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            addatt("points", "0,0 150,0 150,15 145,15 145,5 48,5 48,25 145,25 145,15 150,15 150,30 0,30", fara);
            addatt("style", "fill:"+ color +";fill-rule:evenodd;", fara);
		  cara.appendChild(fara);
        fara = document.createElementNS("http://www.w3.org/2000/svg", "text");
            addatt("x", "2", fara);
            addatt("y", "20", fara);
            addatt("fill", "white", fara);
            node = document.createTextNode("Sound:");
		    fara.appendChild(node);
		  cara.appendChild(fara);
        para.appendChild(cara);
        cara = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
            addattNS("width", "98", cara);
            addattNS("height", "20", cara);
            addattNS("x", "47", cara);
            addattNS("y", "5", cara);
        fara = document.createElement("select");
            addatt("style", "width:98px;height:20px;", fara);
            addatt("onchange", "lert(this, 0)", fara);
            addatt("id", 'drop' + id, fara);
                createoption("pop", "Pop");
                createoption("click", "Click");
                createoption("beep", "Beep");
        cara.appendChild(fara);
        para.appendChild(cara);
        main.appendChild(para);
        break;
        case 8:
            cara = document.createElementNS("http://www.w3.org/2000/svg","g");
            addatt("onmousedown", 'movestart(' + id + ')', cara);
        fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            addatt("points", "0,0 150,0 150,15 145,15 145,5 62,5 62,25 145,25 145,15 150,15 150,30 0,30", fara);
            addatt("style", "fill:"+ color +";fill-rule:evenodd;", fara);
		  cara.appendChild(fara);
        fara = document.createElementNS("http://www.w3.org/2000/svg", "text");
            addatt("x", "2", fara);
            addatt("y", "20", fara);
            addatt("fill", "white", fara);
            node = document.createTextNode("Rotation:");
		    fara.appendChild(node);
		  cara.appendChild(fara);
        para.appendChild(cara);
        cara = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
            addattNS("width", "84", cara);
            addattNS("height", "20", cara);
            addattNS("x", "61", cara);
            addattNS("y", "5", cara);
        fara = document.createElement("select");
            addatt("style", "width:84px;height:20px;", fara);
            addatt("onchange", "lert(this, 0)", fara);
            addatt("id", 'drop' + id, fara);
                createoption("1", "0°");
                createoption("2", "90°");
                createoption("3", "180°");
                createoption("4", "270°");
        cara.appendChild(fara);
        para.appendChild(cara);
        main.appendChild(para);
        break;
        case 9:
            createinputblock(x, y, 73, "Change y:", "number", id, color);
        break;
	}

}
function changesprite(type, x, y, color, tmpobj){
    main = document.getElementById("stagesprites");
    switch(type){
        case "rect":
                para = document.createElementNS("http://www.w3.org/2000/svg","rect");
                    addatt("id", "rect", para);
                    addatt("class", "sprite", para);
                    addatt("x", x - 80, para);
                    addatt("y", y - 40, para);
                    addatt("width", "160", para);
                    addatt("height", "80", para);
                    addatt("stroke", "black", para);
                    addatt("stroke-width", "2", para);
                    addatt("fill", color, para);
            tmpobj.parentNode.removeChild(tmpobj);
                main.appendChild(para);
            break;
        case "circle":
                para = document.createElementNS("http://www.w3.org/2000/svg","circle");
                    addatt("id", "circle", para);
                    addatt("class", "sprite", para);
                    addatt("cx", x, para);
                    addatt("cy", y, para);
                    addatt("r", "40", para);
                    addatt("stroke", "black", para);
                    addatt("stroke-width", "2", para);
                    addatt("fill", color, para);
            tmpobj.parentNode.removeChild(tmpobj);
                main.appendChild(para);
            break;
    }
    refresh();
    updatesaycheck();
    fixrect();
}
function createoption(input, name){
    //create a option for select
    att = document.createElement("option"); //first option
    //add value to option element
    addatt("value", input, att);
    //add text to option
    node = document.createTextNode(name); //text
    att.appendChild(node);
    //add option to select
    fara.appendChild(att);
}
function addatt(att1, att2, target){
    var a = document.createAttribute(att1);
    a.value = att2;
    target.setAttributeNode(a);
}
function addattNS(att1, att2, target){
    var a = document.createAttributeNS(null,att1);
    a.value = att2;
    target.setAttributeNode(a);
}
function fixg(id, x, y){
    addatt("id", id, para);
    addatt("transform", "translate("+ x +","+ y +")", para);
}
function createinputblock(x, y, w, text, type, id, color){
main = document.getElementById("editorWindow");
    para = document.createElementNS("http://www.w3.org/2000/svg","g");
        addatt("class", "bl", para);
        addatt("id", id, para);
        addatt("transform", "translate("+ x +","+ y +")", para);
        cara = document.createElementNS("http://www.w3.org/2000/svg","g");
                addatt("onmousedown", 'movestart(' + id + ')', cara);
            fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
                addatt("points", "0,0 150,0 150,15 145,15 145,5 "+(143 - w)+",5 "+(143 - w)+",25 145,25 145,15 150,15 150,30 0,30", fara);
                addatt("style", "fill:"+ color +";fill-rule:evenodd;", fara);
              cara.appendChild(fara);
            fara = document.createElementNS("http://www.w3.org/2000/svg", "text");
                addatt("x", "2", fara);
                addatt("y", "20", fara);
                addatt("fill", "white", fara);
                node = document.createTextNode(text);
                fara.appendChild(node);
              cara.appendChild(fara);
            para.appendChild(cara);
            cara = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
                addattNS("width", w, cara);
                addattNS("height", "20", cara);
                addattNS("x", 143 - w, cara);
                addattNS("y", "5", cara);
            fara = document.createElement("input");
                addatt("style", "width:"+w+"px;", fara);
                addatt("id", 'text' + id, fara);
                addatt("type", type, fara);
                addatt("name", "input", fara);
                addatt("onchange", "lert(this, 0)", fara);
            cara.appendChild(fara);
        para.appendChild(cara);
main.appendChild(para);
}
function createblock(width, height, innerheight, innerwidth, color){//need to work on adding all values and logic
     cara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        addatt("points", "0,0 "+width+",0 "+width+",15 145,15 145,5 "+(143 - innerwidth)+",5 "+(143 - innerwidth)+",25 145,25 145,15 150,15 150,"+height+" 0,"+height , cara);
        addatt("style", "fill:"+ color +";fill-rule:evenodd;", cara);
    return cara;
}
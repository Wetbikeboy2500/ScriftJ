"use strict";
let para, fara, cara, att, node, main, presprite = 0;

/*
going to have to improve elements's prototype before shortening the rest of the code
*/

function createblock (target) {
    let type = target.type, id = target.id, x = target.x, y = target.y, color = target.color, value = target.value, value1 = target.value1;
    console.log("Creating Element " + id + " with the color " + color);
	para = document.createElementNS("http://www.w3.org/2000/svg","g");
    addatt("class", "bl", para);
    fixg(id, x, y);
	main = document.getElementById("normalBlocks");
	switch (type) {
	case 0://start
            addatt("onmousedown", 'moveblock(obj[' + id + '])', para);
            create_element().element_ns("polygon").attribute("points", "0,0 150,0 150,30 0,30").attribute("style", "fill:"+ color +";fill-rule:evenodd;").append(para);
        main.appendChild(para);
		break;
	case 1://say
        createinputblock(x, y, 108, "Say:", "text", id, color, value);
		break;
	case 2://move
        createinputblock(x, y, 98, "Move:", "number", id, color, value);
		break;
	case 3: //look block
		cara = document.createElementNS("http://www.w3.org/2000/svg","g");
            addatt("onmousedown", 'moveblock(obj[' + id + '])', cara);
            create_element().element_ns("polygon").attribute("points", "0,0 115,0 115,15 110,15 110,5 45,5 45,25 110,25 110,15 115,15 115,30 0,30").attribute("style", "fill:"+ color +";fill-rule:evenodd;").append(cara);
            fara = create_element().element_ns("text").attribute("x", "2").attribute("y", "20").attribute("fill", "white").dom;
            fara.appendChild(document.createTextNode("Look:"));
		  cara.appendChild(fara);
        para.appendChild(cara);
        cara = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
            addattNS("width", "65", cara);
            addattNS("height", "20", cara);
            addattNS("x", "45", cara);
            addattNS("y", "5", cara);
        fara = document.createElement("select");
            addatt("style", "width:65px;height:20px;", fara);
            addatt("onchange", "input(this, 0)", fara);
            addatt("id", 'text' + id, fara);
                createoption("red", "Red");
                createoption("blue", "Blue");
                createoption("green", "Green");
                createoption("yellow", "Yellow");
            addatt("value", value, fara);
        cara.appendChild(fara);
        para.appendChild(cara);
        main.appendChild(para);
		break;
    case 4://Shape block
		cara = document.createElementNS("http://www.w3.org/2000/svg","g");
            addatt("onmousedown", 'moveblock(obj[' + id + '])', cara);
        fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            addatt("points", "0,0 135,0 135,15 130,15 130,5 45,5 45,25 130,25 130,15 135,15 135,30 0,30", fara);
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
            addattNS("width", "85", cara);
            addattNS("height", "20", cara);
            addattNS("x", "45", cara);
            addattNS("y", "5", cara);
        fara = document.createElement("select");
            addatt("style", "width:85px;height:20px;", fara);
            addatt("onchange", "input(this, 0)", fara);
            addatt("id", 'text' + id, fara);
                createoption("circle", "Circle");
                createoption("rectangle", "Rectangle");
            addatt("value", value, fara);
        cara.appendChild(fara);
        para.appendChild(cara);
        main.appendChild(para);
		break;
    case 5://Chane X Block
        createinputblock(x, y, 73, "Change x:", "number", id, color, value);
        break;
    case 6://Say x for x Block
        cara = document.createElementNS("http://www.w3.org/2000/svg","g");
                addatt("onmousedown", 'moveblock(obj[' + id + '])', cara);
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
                addatt("onchange", "input(this, 0)", fara);
                addatt("value", value, fara);
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
                addatt("onchange", "input(this, 1)", fara);
                addatt("value", value1, fara);
            cara.appendChild(fara);
        para.appendChild(cara);
main.appendChild(para); 
        break;
        case 7://sound block
            cara = document.createElementNS("http://www.w3.org/2000/svg","g");
            addatt("onmousedown", 'moveblock(obj[' + id + '])', cara);
        fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            addatt("points", "0,0 105,0 105,15 100,15 100,5 48,5 48,25 100,25 100,15 105,15 105,30 0,30", fara);
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
            addattNS("width", "55", cara);
            addattNS("height", "20", cara);
            addattNS("x", "47", cara);
            addattNS("y", "5", cara);
        fara = document.createElement("select");
            addatt("style", "width:55px;height:20px;", fara);
            addatt("onchange", "input(this, 0)", fara);
            addatt("id", 'text' + id, fara);
                createoption("pop", "Pop");
                createoption("click", "Click");
                createoption("beep", "Beep");
            addatt("value", value, fara);
        cara.appendChild(fara);
        para.appendChild(cara);
        main.appendChild(para);
        break;
        case 8://rotation block
            createinputblock(x, y, 82, "Rotation:", "number", id, color, value);
        break;
        case 9://change y block
            createinputblock(x, y, 73, "Change y:", "number", id, color, value);
        break;
        case 10://varible block
                addatt("onmousedown", 'moveblock(obj[' + id + '])', para);
            fara = document.createElementNS("http://www.w3.org/2000/svg","polygon");
                addatt("points", "0,0 50,0 50,21 0,21", fara);
                addatt("style", "fill:"+ color +";fill-rule:evenodd;", fara);
              para.appendChild(fara);
            fara = document.createElementNS("http://www.w3.org/2000/svg", "text");
                addatt("x", "2", fara);
                addatt("y", "15", fara);
                addatt("fill", "white", fara);
                node = document.createTextNode("Varible");
                fara.appendChild(node);
            para.appendChild(fara);
            main = document.getElementById("topBlocks");
        main.appendChild(para);
        break;
	}

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
function createinputblock(x, y, w, text, type, id, color, value){
main = document.getElementById("normalBlocks");
    para = document.createElementNS("http://www.w3.org/2000/svg","g");
        addatt("class", "bl", para);
        addatt("id", id, para);
        addatt("transform", "translate("+ x +","+ y +")", para);
        cara = document.createElementNS("http://www.w3.org/2000/svg","g");
                addatt("onmousedown", 'moveblock(obj[' + id + '])', cara);
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
                addattNS("height", "21", cara);
                addattNS("x", 143 - w, cara);
                addattNS("y", "5", cara);
            fara = document.createElement("input");
                addatt("style", "width:"+w+"px;", fara);
                addatt("id", 'text' + id, fara);
                addatt("type", type, fara);
                addatt("name", "input", fara);
                fara.setAttribute("value", value);
                addatt("onchange", "input(this, 0)", fara);
            cara.appendChild(fara);
        para.appendChild(cara);
main.appendChild(para);
}

function create_sprite (p, f, id) {
    //add in the stuff here
    let player = document.getElementById("stagesprites");
        let sprite = document.createElementNS("http://www.w3.org/2000/svg","polygon");
            addatt("points", p, sprite);
            addatt("style", "fill:" + f +"; fill-rule:evenodd;", sprite);
            addatt("id", id, sprite);
    player.appendChild(sprite);
}

function select_sprite (spr) {
    log("select sprite");
    document.getElementById("sprite" + presprite).style.stroke = "#575b57";
    presprite = spr.id;
    log(spr);
    document.getElementById("sprite" + spr.id).style.stroke = "#00a3cc";
}

function reload_blocks (group) {
    log("reload blocks");
    //first deleate all blocks on the svg
    document.getElementById("normalBlocks").innerHTML = "";
    //then filters and renders the new group array
    if (group.length > 0) {
        log(group);
        let new_group = group.filter((a) => {
            return a != 0 && a.length > 0;
        });
        for (let i = 0; i < new_group.length; i++) {
            for (let i2 = 0; i2 < new_group[i].length; i2++) {
                createblock(new_group[i][i2]);
                new_group[i][i2].set_dom();
            }
        }
    }
}
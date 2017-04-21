"use strict";
let para, fara, cara, att, node, main, presprite = 0;

/*
going to have to improve elements's prototype before shortening the rest of the code
*/

function createblock (target) {
    let type = target.type, id = target.id, x = target.x, y = target.y, color = target.color, value = target.value, value1 = target.value1;
    console.log("Creating Element " + id + " with the color " + color);
    para = create_element().NS("g").att("class", "bl").att("id", id).att("transform", "translate("+ x +","+ y +")");
	main = document.getElementById("normalBlocks");
	switch (type) {
        case 0://start
            para.att("onmousedown", 'moveblock(obj[' + id + '])');
            cara = create_element().NS("polygon").att("points", "0,0 150,0 150,30 0,30").att("style", "fill:"+ color +";fill-rule:evenodd;");
            para.dom.appendChild(cara.dom)
            main.appendChild(para.dom);
            break;
        case 1://say
            createinputblock(x, y, 108, "Say:", "text", id, color, value);
            break;
        case 2://move
            createinputblock(x, y, 95, "Rotate:", "number", id, color, value);
            break;
        case 3: //look block
            //create svg element
            cara = create_element().NS("g").att("onmousedown", 'moveblock(obj[' + id + '])');
                fara = create_element().NS("polygon").att("points", "0,0 115,0 115,15 110,15 110,5 45,5 45,25 110,25 110,15 115,15 115,30 0,30").att("style", "fill:"+ color +";fill-rule:evenodd;");
            cara.dom.appendChild(fara.dom);
                fara = create_element().NS("text").att("x", "2").att("y", "20").att("fill", "white");
                fara.dom.appendChild(document.createTextNode("Look:"));
              cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);

            cara = create_element().NS("foreignObject").att("width", "65").att("height", "20").att("x", "45").att("y", "5");
                fara = create_element().default("select").att("style", "width:65px;height:20px;").att("onchange", "input(this, 0)").att("id", 'text' + id).option("red", "Red").option("blue", "Blue").option("green", "Green").option("yellow", "Yellow").select(value);
            cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);
            main.appendChild(para.dom);
            break;
        case 4://Shape block
            cara = create_element().NS("g").att("onmousedown", 'moveblock(obj[' + id + '])');
                fara = create_element().NS("polygon").att("points", "0,0 135,0 135,15 130,15 130,5 45,5 45,25 130,25 130,15 135,15 135,30 0,30").att("style", "fill:"+ color +";fill-rule:evenodd;");
            cara.dom.appendChild(fara.dom);
                fara = create_element().NS("text").att("x", "2").att("y", "20").att("fill", "white");
                fara.dom.appendChild(document.createTextNode("Shape:"));
              cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);

            cara = create_element().NS("foreignObject").att("width", "85").att("height", "20").att("x", "45").att("y", "5");
                fara = create_element().default("select").att("style", "width:85px;height:20px;").att("onchange", "input(this, 0)").att("id", 'text' + id).option("squr", "Square").option("rect", "Rectangle").select(value);
            cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);
            main.appendChild(para.dom);
            break;
        case 5://Chane X Block
            createinputblock(x, y, 73, "Change x:", "number", id, color, value);
            break;
        case 6://Say x for x Block
            cara = create_element().NS("g").att("onmousedown", 'moveblock(obj[' + id + '])');
                fara = create_element().NS("polygon").att("points", "0,0 150,0 150,15 145,15 145,5 115,5 115,15 91,15 91,5 35,5 35,25 91,25 91,15 115,15 115,25 145,25 145,15 150,15 150,30 0,30").att("style", "fill:"+ color +";fill-rule:evenodd;");
            cara.dom.appendChild(fara.dom);
                //say:
                fara = create_element().NS("text").att("x", "2").att("y", "20").att("fill", "white");
                fara.dom.appendChild(document.createTextNode("Say:"));
            cara.dom.appendChild(fara.dom);
                //for text
                fara = create_element().NS("text").att("x", "95").att("y", "20").att("fill", "white");
                fara.dom.appendChild(document.createTextNode("for"));
            cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);
                //first foreign object
            cara = create_element().NS("foreignObject").att("width", "53").att("height", "20").att("x", "35").att("y", "5");
                fara = create_element().default("input").att("style", "width:53px;").att("id", 'text' + id).att("type", "text").att("name", "input").att("onchange", "input(this, 0)").att("value", value);
            cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);
            //second foreign
            cara = create_element().NS("foreignObject").att("width", "26").att("height", "20").att("x", "115").att("y", "5");
                fara = create_element().default("input").att("style", "width:26px;").att("id", '1text' + id).att("type", "number").att("name", "input").att("onchange", "input(this, 1)").att("value", value1);
            cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);
            main.appendChild(para.dom); 
            break;
            case 7://sound block
            cara = create_element().NS("g").att("onmousedown", 'moveblock(obj[' + id + '])');
                fara = create_element().NS("polygon").att("points", "0,0 105,0 105,15 100,15 100,5 48,5 48,25 100,25 100,15 105,15 105,30 0,30").att("style", "fill:"+ color +";fill-rule:evenodd;");
            cara.dom.appendChild(fara.dom);
                fara = create_element().NS("text").att("x", "2").att("y", "20").att("fill", "white");
                fara.dom.appendChild(document.createTextNode("Sound"));
            cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);
            
            cara = create_element().NS("foreignObject").att("width", "55").att("height", "20").att("x", "47").att("y", "5");
                fara = create_element().default("select").att("style", "width:55px;height:20px;").att("onchange", "input(this, 0)").att("id", 'text' + id).option("pop", "Pop").option("click", "Click").option("beep", "Beep").select(value);
            cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);
            main.appendChild(para.dom);
            break;
            case 8://rotation block
                createinputblock(x, y, 82, "Rotation:", "number", id, color, value);
            break;
            case 9://change y block
                createinputblock(x, y, 73, "Change y:", "number", id, color, value);
            break;
            case 10://varible block
                para.att("onmousedown", 'moveblock(obj[' + id + '])');
                    fara = create_element().NS("polygon").att("points", "0,0 50,0 50,21 0,21").att("style", "fill:"+ color +";fill-rule:evenodd;");
                para.dom.appendChild(fara.dom);
                    fara = create_element().NS("text").att("x", "2").att("y", "15").att("fill", "white");
                    fara.dom.appendChild(document.createTextNode("Varible"));
                para.dom.appendChild(fara.dom);
                main = document.getElementById("topBlocks");
            main.appendChild(para.dom);
            break;
        case 11:
            createinputblock(x, y, 103, "Set x:", "number", id, color, value);
            break;
        case 12:
            createinputblock(x, y, 103, "Set y:", "number", id, color, value);
            break;
        default:
            log("Unknown Block Type");
            break;
	}

}

function createinputblock(x, y, w, text, type, id, color, value){
main = document.getElementById("normalBlocks");
    para = create_element().NS("g").att("class", "bl").att("id", id).att("transform", "translate("+ x +","+ y +")");
        cara = create_element().NS("g").att("onmousedown", 'moveblock(obj[' + id + '])');
            fara = create_element().NS("polygon").att("points", "0,0 150,0 150,15 145,15 145,5 "+(143 - w)+",5 "+(143 - w)+",25 145,25 145,15 150,15 150,30 0,30").att("style", "fill:"+ color +";fill-rule:evenodd;");
        cara.dom.appendChild(fara.dom);
            fara = create_element().NS("text").att("x", "2").att("y", "20").att("fill", "white");
            fara.dom.appendChild(document.createTextNode(text));
            log(fara.dom.childNodes[0].clientWidth);
            log(fara.dom);
        cara.dom.appendChild(fara.dom);
    para.dom.appendChild(cara.dom);
        cara = create_element().NS("foreignObject").att("width", w).att("height", "21").att("x", 143 - w).att("y", "5");
            fara = create_element().default("input").att("style", "width:"+w+"px;").att("id", 'text' + id).att("type", type).att("name", "input").att("value", value).att("onchange", "input(this, 0)");
        cara.dom.appendChild(fara.dom);
    para.dom.appendChild(cara.dom);
main.appendChild(para.dom);
}

function create_sprite (p, f, id, num) {
    //text for sprite
    let fo = create_element().NS("foreignObject").att("width", 200).att("id", id + "i");
    let pa = create_element().default("p").att("style", "visibility:hidden;padding:5px;margin:0px;border:1px solid black;background-color:#EBEBE4;border-radius:5px;max-width:200px;").att("id", id + "i2");
    fo.dom.appendChild(pa.dom);
    //create element to select the sprite
    let y = 10;
    let x = 110 * num + 15;
    if (num + 1 > 8) {
        y = 280;
        x = (110 * (num - 8)) + 15;
    } else if (num + 1 > 4) {
        y = 145;
        x = (110 * (num - 4)) + 15;
    }
    log(num + 1 > 4);
    let sel = create_element().NS("rect").att("onclick", "switch_sprite(sprites["+ num +"])").att("transform", "translate("+ x +", "+ y +")" ).att("id", "sprite" + num).att("width", 95).att("height", 130).att("rx", 5).att("ry", 5).att("style", "fill:#CECFCE;stroke-width:1;stroke:#575b57");
    document.getElementById("spriteWindow2").appendChild(sel.dom);
    //this is the sprite
    let player = document.getElementById("stagesprites"), sprite = create_element().NS("polygon").att("points", p).att("style", "fill:" + f +"; fill-rule:evenodd;").att("id", id);
    player.appendChild(fo.dom);
    player.appendChild(sprite.dom);
    
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
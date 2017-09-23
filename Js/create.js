"use strict";
let para, fara, cara, main, presprite = 0, y = 10;//presprite is the current selected sprite

//this is going to store all blovk info and new block info for future reference also have the source code to run the stuff
//type block, start, varible, logic
let block_info = [
    {
        type: "block",
        color: "#0060FF",
        id: 0,
        index: 1,
        text: "Move",
        s_x: 10,
        s_y: null,
        input_width: 100,
        input_type: "number",
        input: "type",
        code: (a, obj) => {
            a.translate(obj.getinput(0)).update_transform();
            return 0;
        }
    },
    {
        type: "start",
        color: "#EE7D16",
        id: 1,
        index: 0,
        text: "Start",
        s_x: 10,
        s_y: null,
    },
    {
        type: "block",
        color: "#0060FF",
        id: 2,
        index: 2,
        text: "Rotate",
        input_width: 95,
        input_type: "number",
        input: "type",
        s_x: 10,
        s_y: null,
        code: (a, obj) => {
            a.add_rotation(obj.getinput(0)).update_transform();
            return 0;
        }
    },
    {
        type: "block",
        color: "#9900cc",
        id: 3,
        index: 3,
        text: "Say",
        input_width: 108,
        input_type: "text",
        input: "type",
        s_x: 10,
        s_y: null,
        code: (a, obj) => {
            a.set_text(obj.getinput(0)).update_text().show_text(-1);
            return 0;
        }
    },
    {
        type: "block",
        color: "#9900cc",
        id: 4,
        index: 4,
        text: "Look",
        input_width: 100,
        input_type: "drop",
        options: {
            red: "Red",
            blue: "Blue",
            green: "Green",
            yellow: "Yellow"
        },
        s_x: 10,
        s_y: null,
        code: (a, obj) => {
            a.change_fill(obj.getinput(0));
            return 0;
        }
    },
    {
        type: "block",
        color: "#9900cc",
        id: 5,
        index: 5,
        text: "Shape",
        input_width: 100,
        input_type: "drop",
        options: {
            squr: "Square",
            rect: "Rectangle"   
        },
        s_x: 10,
        s_y: null,
        code: (a, obj) => {
            if (obj.getinput(0) === "squr") {
                a.change_points("0,0 100,0 100,100 0,100", 100, 100);
            } else {
                a.change_points("0,0 200,0 200,100 0,100", 200, 100);
            }
            return 0;
        }
    },
    {
        type: "block",
        color: "#0060FF",
        id: 6,
        index: 6,
        text: "Change x",
        s_x: 10,
        s_y: null,
        input_width: 78,
        input_type: "number",
        input: "type",
        code: (a, obj) => {
            a.translate(obj.getinput(0)).update_transform();
            return 0;
        }
    },
    {
        type: "block",
        color: "#9900cc",
        id: 7,
        index: 7,
        text: "Sound",
        input_width: 100,
        input_type: "drop",
        options: {
            pop: "Pop",
            click: "Click",
            beep: "Beep"   
        },
        s_x: 10,
        s_y: null,
        code: (a, obj) => {
            let audio = new Audio('res/'+obj.getinput(0)+'.m4a');
            audio.play();
            return 0;
        }
    },
    {
        type: "block",
        color: "#bf00ff",
        id: 8,
        index: 8,
        text: "Sound",
        input_width: 100,
        input_type: "drop",
        options: {
            pop: "Pop",
            click: "Click",
            beep: "Beep"   
        },
        s_x: 10,
        s_y: null,
        code: (a, obj) => {
            let audio = new Audio('res/'+obj.getinput(0)+'.m4a');
            audio.play();
            return 0;
        }
    },
    {
        type: "block",
        color: "#9900cc",
        id: 9,
        index: 9,
        text: "Say",
        text2: "for",
        input_width: 55,
        input2_width: 28,
        input_type: "text2",
        input: "type",
        s_x: 10,
        s_y: null,
        code: (a, obj) => {
            a.set_text(obj.getinput(0)).update_text().show_text(obj.getinput(1) * 1000);
            return obj.getinput(1) * 1000;
        }
    }
];

function get_block_info (i = true) {
    if (i) {
        return block_info;
    } else {
        return block_info[i];
    }
}

function load_blocks () {
    for (let i = 0; i < block_info.length; i++) {
        block_info[i].s_y = (block_info[i].index * 35) + 5;
        improved_creation(block_info[i], null, true);
    }
}

function improved_creation (a, id = null, display = false, value = "", value1 = "") {
    let event, enable_input, parent;
    console.log(a.s_x, a.s_y);
    if (display) {//it should only create that block and nothing else
        event = "create_block("+a.id+", 20, '"+a.type+"')";
        enable_input = true;
        parent = "editorWindow";
    } else {
        event = 'moveblock(obj[' + id + '])';
        enable_input = false;
        parent = "normalBlocks";
    }

    if (a.type == "block") {
        if (a.input_type == "drop") {
            element("g", "svg").a("class", "bl").a("id", id).a("transform", "translate("+ a.s_x +","+ a.s_y +")")
                .append(element("g", "svg").a("onmousedown", event)
                        .append(element("polygon", "svg").a("points", "0,0 10,0 10,5 20,5 20,0 150,0 150,15 145,15 145,5 "+(145 - a.input_width)+",5 "+(145 - a.input_width)+",25 145,25 145,15 150,15 150,30 20,30 20,35 10,35 10,30 0,30").a("style", "fill:" + a.color + ";fill-rule:evenodd;"))
                        .append(element("text", "svg").a("x", "2").a("y", "20").a("fill", "white").t(a.text)))
                .append(element("foreignObject", "svg").a("width", a.input_width).a("height", "21").a("x", 145 - a.input_width).a("y", "5").m(enable_input, a.type)
                        .append(element("select").a("style", "width:"+ a.input_width +"px;height:20px;").a("onchange", "input(this, 0)").o(a.options, value).a("id", 'text' + id).d(enable_input, a.name)))
                .apthis(document.getElementById(parent));
        } else if (a.input_type == "text2") {
            element("g", "svg").a("class", "bl").a("id", id).a("transform", "translate("+ a.s_x +","+ a.s_y +")")
                .append(element("g", "svg").a("onmousedown", event)
                        .append(element("polygon", "svg").a("points", "0,0 10,0 10,5 20,5 20,0 150,0 150,15 145,15 145,5 115,5 115,15 91,15 91,5 35,5 35,25 91,25 91,15 115,15 115,25 145,25 145,15 150,15 150,30 20,30 20,35 10,35 10,30 0,30").a("style", "fill:" + a.color + ";fill-rule:evenodd;"))
                        .append(element("text", "svg").a("x", "2").a("y", "20").a("fill", "white").t(a.text))
                        .append(element("text", "svg").a("x", "95").a("y", "20").a("fill", "white").t(a.text2)))
                .append(element("foreignObject", "svg").a("width", a.input_width).a("height", "20").a("x", "35").a("y", "5")
                        .append(element("input").a("style", "width: "+a.input_width+"px;").a("type", "text").a("name", "input").a("value", value).a("onchange", "input(this, 0)").a("id", 'text' + id).d(enable_input, a.name)))
                .append(element("foreignObject", "svg").a("width", a.input2_width).a("height", "20").a("x", "115").a("y", "5")
                        .append(element("input").a("style", "width: "+a.input2_width+"px;").a("type", "number").a("name", "input").a("value", value1).a("onchange", "input(this, 1)").a("id", '1text' + id).d(enable_input, a.name)))
                .apthis(document.getElementById(parent));
        } else {
            element("g", "svg").a("class", "bl").a("id", id).a("transform", "translate("+ a.s_x +","+ a.s_y +")")
                .append(element("g", "svg").a("onmousedown", event)
                        .append(element("polygon", "svg").a("points", "0,0 10,0 10,5 20,5 20,0 150,0 150,15 145,15 145,5 "+(143 - a.input_width)+",5 "+(143 - a.input_width)+",25 145,25 145,15 150,15 150,30 20,30 20,35 10,35 10,30 0,30").a("style", "fill:" + a.color + ";fill-rule:evenodd;"))
                        .append(element("text", "svg").a("x", "2").a("y", "20").a("fill", "white").t(a.text)))
                .append(element("foreignObject", "svg").a("width", a.input_width).a("height", "21").a("x", 143 - a.input_width).a("y", "5").m(enable_input, a.type)
                        .append(element("input").a("style", "width:"+ a.input_width +"px;").a("type", a.input_type).a("name", "input").a("value", value).a("onchange", "input(this, 0)").a("id", 'text' + id).d(enable_input, a.name)))
                .apthis(document.getElementById(parent));
        }
    } else if (a.type == "start") {
        element("g", "svg").a("class", "bl").a("id", id).a("transform", "translate("+ a.s_x +","+ a.s_y +")").a("onmousedown", event)
            .append(element("polygon", "svg").a("points", "0,0 150,0 150,30 20,30 20,35 10,35 10,30 0,30").a("style", "fill:"+ a.color +";fill-rule:evenodd;"))
            .append(element("text", "svg").a("x", "2").a("y", "20").a("fill", "white").t(a.text))
            .apthis(document.getElementById(parent));
    } else {
        console.log("Block type not supported");
    }
    /* create_element().default("select").att("style", "width:65px;height:20px;").att("onchange", "input(this, 0)").att("id", 'text' + id).option("red", "Red").option("blue", "Blue").option("green", "Green").option("yellow", "Yellow").select(value)*/
}

/*
going to have to improve elements's prototype before shortening the rest of the code
*/
function createblock (target, t) { //this function will be removed once improved creation is completed
    let type = target.type, id = target.id, x = target.x, y = target.y, color = target.color, value = target.value, value1 = target.value1;
    console.log("Creating Element " + id + " with the color " + color);
    para = create_element().NS("g").att("class", "bl").att("id", id).att("transform", "translate("+ x +","+ y +")");
    main = document.getElementById("normalBlocks");
    switch (type) {
        case "block":
            improved_creation(block_info[t], id, false, value, value1);
            break;
        case "start":
            improved_creation(block_info[t], id, false, value, value1);
            break;
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
            //new code for look block
            cara = element("g", "svg").a("onmousedown", 'moveblock(obj[' + id + '])').append(element("polygon", "svg").a("points", "0,0 115,0 115,15 110,15 110,5 45,5 45,25 110,25 110,15 115,15 115,30 0,30").a("style", "fill:"+ color +";fill-rule:evenodd;")).append(element("text", "svg").a("x", "2").a("y", "20").a("fill", "white").t("Look:"));
            para.dom.appendChild(cara.dom);

            //create svg element
            /*cara = create_element().NS("g").att("onmousedown", 'moveblock(obj[' + id + '])');
                fara = create_element().NS("polygon").att("points", "0,0 115,0 115,15 110,15 110,5 45,5 45,25 110,25 110,15 115,15 115,30 0,30").att("style", "fill:"+ color +";fill-rule:evenodd;");
            cara.dom.appendChild(fara.dom);
                fara = create_element().NS("text").att("x", "2").att("y", "20").att("fill", "white");
                fara.dom.appendChild(document.createTextNode("Look:"));
              cara.dom.appendChild(fara.dom);
            para.dom.appendChild(cara.dom);*/

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
    let pa = create_element().default("p").att("style", "visibility:hidden;padding:5px;margin:0px;border:1px solid black;background-color:#EBEBE4;border-radius:5px;max-width:200px;").att("id", id + "i2");//this is the text box for the sprite
    fo.dom.appendChild(pa.dom);
    //sets its new x position
    let x = 115 * (num % 4) + 10;

    //rectangle for the sprite
    let sel = create_element().NS("rect").att("onclick", "switch_sprite(sprites["+ num +"])").att("transform", "translate("+ x +", "+ y +")" ).att("id", "sprite" + num).att("width", 95).att("height", 130).att("rx", 5).att("ry", 5).att("style", "fill:#CECFCE;stroke-width:1;stroke:#575b57");
    document.getElementById("spriteWindow2").appendChild(sel.dom);
    //this is the sprite
    let player = document.getElementById("stagesprites"), sprite = create_element().NS("polygon").att("points", p).att("style", "fill:" + f +"; fill-rule:evenodd;").att("id", id);
    player.appendChild(fo.dom);
    player.appendChild(sprite.dom);
    if ((num + 1) % 4 == 0) { //updates its y after creating all the stuff
        y += 145;
        let height = 150 + (Math.ceil((num + 1) / 4) * 145);
        document.getElementById("spriteWindow").style.height = height;
    }

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
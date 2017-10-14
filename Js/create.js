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
        index: 6,
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
        index: 8,
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
        index: 10,
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
        index: 11,
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
        index: 2,
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
        color: "#bf00ff",
        id: 7,
        index: 12,
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
        id: 8,
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
    },
    {
        type: "block",
        color: "#0060FF",
        id: 9,
        index: 3,
        text: "Change y",
        s_x: 10,
        s_y: null,
        input_width: 78,
        input_type: "number",
        input: "type",
        code: (a, obj) => {
            a.translate(0, obj.getinput(0)).update_transform();
            return 0;
        }
    },
    {
        type: "block",
        color: "#0060FF",
        id: 10,
        index: 4,
        text: "Set x",
        s_x: 10,
        s_y: null,
        input_width: 103,
        input_type: "number",
        input: "type",
        code: (a, obj) => {
            a.set_x(obj.getinput(0)).update_transform();
            return 0;
        }
    },
    {
        type: "block",
        color: "#0060FF",
        id: 11,
        index: 5,
        text: "Set y",
        s_x: 10,
        s_y: null,
        input_width: 103,
        input_type: "number",
        input: "type",
        code: (a, obj) => {
            a.set_y(obj.getinput(0)).update_transform();
            return 0;
        }
    },
    {
        type: "block",
        color: "#0060FF",
        id: 12,
        index: 7,
        text: "Rotation",
        s_x: 10,
        s_y: null,
        input_width: 82,
        input_type: "number",
        input: "type",
        code: (a, obj) => {
            a.set_rotation(obj.getinput(0)).update_transform();
            return 0;
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

function improved_creation (a, id = null, display = false, value = "", value1 = "", target = null) {
    let event, enable_input, parent, x, y;
    if (display) {//it should only create that block and nothing else
        event = "create_block("+a.id+", '"+a.type+"')";
        enable_input = true;
        parent = "editorWindow";
        x = a.s_x;
        y = a.s_y;
    } else {
        event = 'moveblock(obj[' + id + '])';
        enable_input = false;
        parent = "normalBlocks";
        x = target.x;
        y = target.y;
    }

    if (a.type == "block") {
        if (a.input_type == "drop") {
            element("g", "svg").a("class", "bl").a("id", id).a("transform", "translate("+ x +","+ y +")")
                .append(element("g", "svg").a("onmousedown", event)
                        .append(element("polygon", "svg").a("points", "0,0 10,0 10,5 20,5 20,0 150,0 150,15 145,15 145,5 "+(145 - a.input_width)+",5 "+(145 - a.input_width)+",25 145,25 145,15 150,15 150,30 20,30 20,35 10,35 10,30 0,30").a("style", "fill:" + a.color + ";fill-rule:evenodd;"))
                        .append(element("text", "svg").a("x", "2").a("y", "20").a("fill", "white").t(a.text)))
                .append(element("foreignObject", "svg").a("width", a.input_width).a("height", "21").a("x", 145 - a.input_width).a("y", "5").m(enable_input, a.type)
                        .append(element("select").a("style", "width:"+ a.input_width +"px;height:20px;").a("onchange", "input(this, 0)").o(a.options, value).a("id", 'text' + id).d(enable_input, a.name)))
                .apthis(document.getElementById(parent));
        } else if (a.input_type == "text2") {
            element("g", "svg").a("class", "bl").a("id", id).a("transform", "translate("+ x +","+ y +")")
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
            element("g", "svg").a("class", "bl").a("id", id).a("transform", "translate("+ x +","+ y +")")
                .append(element("g", "svg").a("onmousedown", event)
                        .append(element("polygon", "svg").a("points", "0,0 10,0 10,5 20,5 20,0 150,0 150,15 145,15 145,5 "+(143 - a.input_width)+",5 "+(143 - a.input_width)+",25 145,25 145,15 150,15 150,30 20,30 20,35 10,35 10,30 0,30").a("style", "fill:" + a.color + ";fill-rule:evenodd;"))
                        .append(element("text", "svg").a("x", "2").a("y", "20").a("fill", "white").t(a.text)))
                .append(element("foreignObject", "svg").a("width", a.input_width).a("height", "21").a("x", 143 - a.input_width).a("y", "5").m(enable_input, a.type)
                        .append(element("input").a("style", "width:"+ a.input_width +"px;").a("type", a.input_type).a("name", "input").a("value", value).a("onchange", "input(this, 0)").a("id", 'text' + id).d(enable_input, a.name)))
                .apthis(document.getElementById(parent));
        }
    } else if (a.type == "start") {
        element("g", "svg").a("class", "bl").a("id", id).a("transform", "translate("+ x +","+ y +")").a("onmousedown", event)
            .append(element("polygon", "svg").a("points", "0,0 150,0 150,30 20,30 20,35 10,35 10,30 0,30").a("style", "fill:"+ a.color +";fill-rule:evenodd;"))
            .append(element("text", "svg").a("x", "2").a("y", "20").a("fill", "white").t(a.text))
            .apthis(document.getElementById(parent));
    } else {
        console.log("Block type not supported");
    }
}

function createblock (target) { //this function will be removed once improved creation is completed
    console.log("Creating Element " + target.id + " with the color " + target.color);
    improved_creation(block_info[target.block_id], target.id, false, target.value, target.value1, target);
}

function create_sprite (p, f, id, num) {
    //sets its new x position
    let x = 115 * (num % 4) + 10, player = document.getElementById("stagesprites");
    //text for sprite
    element("foreignObject", "svg").a("width", 200).a("id", id + "i")
        .append(element("p").a("style", "visibility:hidden;padding:5px;margin:0px;border:1px solid black;background-color:#EBEBE4;border-radius:5px;max-width:200px;").a("id", id + "i2"))
    .apthis(player);
    //sprite
    element("polygon", "svg").a("points", p).a("style", "fill:" + f +"; fill-rule:evenodd;").a("id", id)
    .apthis(player);
    //sprite selector rectangle
    let poly = element("polygon", "svg").a("points", p).a("style", "fill:" + f +"; fill-rule:evenodd;");
    element("g", "svg").a("onclick", "switch_sprite(sprites["+ num +"])").a("transform", "translate("+ x +", "+ y +")" ).a("id", "sprite" + num)
    .append(element("rect", "svg").a("width", 95).a("height", 130).a("rx", 5).a("ry", 5).a("style", "fill:#CECFCE;stroke-width:1;stroke:#575b57"))
    .append(poly)
    .append(element("text", "svg").a("transform", "translate(23, 120)").t("Sprite " + num))
    .apthis(document.getElementById("spriteWindow2"));
    let s = poly.dom.getBoundingClientRect();
    poly.a("transform", "scale("+90 / (s.right - s.left)+" "+(90 / (s.bottom - s.top)) * ((s.bottom - s.top) / (s.right - s.left))+") translate("+2.5 * (s.right - s.left) / (s.bottom - s.top)+" " + 10 * (s.right - s.left) / (s.bottom - s.top) + ")");
    //updates sprite selector y position
    if ((num + 1) % 4 == 0) { //updates its y after creating all the stuff
        y += 145;
        let height = 150 + (Math.ceil((num + 1) / 4) * 145);
        document.getElementById("spriteWindow").style.height = height;
    }
}

function select_sprite (spr) {
    log("select sprite");
    document.getElementById("sprite" + presprite).children[0].style.stroke = "#575b57";
    presprite = spr.id;
    log(spr);
    document.getElementById("sprite" + spr.id).children[0].style.stroke = "#00a3cc";
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
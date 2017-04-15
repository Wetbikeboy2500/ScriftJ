"use strict";
//version 4 of run.js
var tmpobj, gameplayer, sprites, sprtarget, clock, i, sprid, runlist = [], arr = [], sprsay = [], x = 220, y = 180, movetype = 2;

function initrun() {
    runlist = getlist();
    setupstsp();

    if (runlist.length > 0) {
        arr = getarray();
        i = 0;
        tmpobj = arr[arr[runlist[i]].connecting];
        clock = setInterval(function () {
            compilerun();
        }, 3);
    }
}

function setupstsp() {
    //fix elemements
    document.getElementById("dtext").style.visibility = "hidden";
    document.getElementById("dtext1").style.visibility = "hidden";
    //get elements
    sprid = 0;
    refresh();
}

function compilerun() {
    if (i < runlist.length) {
        if (tmpobj.connecting == -1) {
            runcode();
            clearInterval(clock);
            i++;
            if (i < runlist.length) {
                tmpobj = arr[arr[runlist[i]].connecting];
                clock = setInterval(function () {
                    compilerun();
                }, 0);
            }
        } else {
            runcode();
            tmpobj = arr[tmpobj.connecting];
        }
    }
}

function runcode() {
    switch (tmpobj.type) {
        case 1:
            if (/\S/.test(tmpobj.getinput())){
                spritesay(tmpobj.getinput());
            }
            break;
        case 2:
            if (sprtarget.id == "circle") {
                if (movetype == 1) {
                    setatt(sprtarget, "cy", Number(sprtarget.getAttribute("cy")) - Number(tmpobj.getinput()));
                    y -= Number(tmpobj.getinput());
                } else if (movetype == 2) {
                    setatt(sprtarget, "cx", Number(sprtarget.getAttribute("cx")) + Number(tmpobj.getinput()));
                    x += Number(tmpobj.getinput());
                } else if (movetype == 3) {
                    setatt(sprtarget, "cy", Number(sprtarget.getAttribute("cy")) + Number(tmpobj.getinput()));
                    y += Number(tmpobj.getinput());
                } else if (movetype == 4) {
                    setatt(sprtarget, "cx", Number(sprtarget.getAttribute("cx")) - Number(tmpobj.getinput()));
                    x -= Number(tmpobj.getinput());
                }
            } else if (sprtarget.id == "rect") {
                if (movetype == 1) {
                    setatt(sprtarget, "y", Number(sprtarget.getAttribute("y")) - Number(tmpobj.getinput()));
                    y -= Number(tmpobj.getinput());
                } else if (movetype == 2) {
                    setatt(sprtarget, "x", Number(sprtarget.getAttribute("x")) + Number(tmpobj.getinput()));
                    x += Number(tmpobj.getinput());
                } else if (movetype == 3) {
                    setatt(sprtarget, "y", Number(sprtarget.getAttribute("y")) + Number(tmpobj.getinput()));
                    y += Number(tmpobj.getinput());
                } else if (movetype == 4) {
                    setatt(sprtarget, "x", Number(sprtarget.getAttribute("x")) - Number(tmpobj.getinput()));
                    x -= Number(tmpobj.getinput());
                }
            }
            updatesaycheck();
            break;
        case 5:
            if(sprtarget.id == "circle") {
                setatt(sprtarget, "cx", Number(sprtarget.getAttribute("cx")) + Number(tmpobj.getinput()));
            } else if (sprtarget.id == "rect") {
                setatt(sprtarget, "x", Number(sprtarget.getAttribute("x")) + Number(tmpobj.getinput()));
            }
            x += Number(tmpobj.getinput());
            updatesaycheck();            
            break;
        case 3:
            if (tmpobj.getinput() == "red") {
                setatt(sprtarget, "fill", "red");
            } else if (tmpobj.getinput() == "blue") {
                setatt(sprtarget, "fill", "blue");
            } else if (tmpobj.getinput() == "green") {
                setatt(sprtarget, "fill", "green");
            } else if (tmpobj.getinput() == "yellow") {
                setatt(sprtarget, "fill", "yellow");
            }
            break;
        case 4:
            if (tmpobj.getinput() == "rectangle" && sprtarget.id == "circle") {
                changesprite("rect", x, y, sprtarget.getAttribute("fill"), sprtarget);
            } else if (tmpobj.getinput() == "circle" && sprtarget.id == "rect") {
                changesprite("circle", x, y, sprtarget.getAttribute("fill"), sprtarget);
            }
            break;
        case 6:
            spritesay(tmpobj.getinput(0));
            setTimeout(function(){
                document.getElementById("dtext").style.visibility = "hidden";
                document.getElementById("dtext1").style.visibility = "hidden";
            }, Number(tmpobj.getinput(1) * 1000));
            console.info("passed it");
            break;
        case 7:
            var audio
            if (tmpobj.getinput() == "pop") {
                audio = new Audio('res/pop.m4a');
            } else if (tmpobj.getinput() == "click") {
                audio = new Audio('res/click.m4a');
            } else if (tmpobj.getinput() == "beep") {
                audio = new Audio('res/beep.m4a');
            }
            audio.play();
            break;
        case 8:
            movetype = tmpobj.getinput();           
            fixrect();
            break;
        case 9:
            if(sprtarget.id == "circle") {
                setatt(sprtarget, "cy", Number(sprtarget.getAttribute("cy")) + Number(tmpobj.getinput()));
            } else if (sprtarget.id == "rect") {
                setatt(sprtarget, "y", Number(sprtarget.getAttribute("y")) + Number(tmpobj.getinput()));
            }
            y += Number(tmpobj.getinput());
            updatesaycheck(); 
            break;
    }
}

function spritesay(input){
    if($.inArray(sprid, sprsay) === -1){
        sprsay.push(sprid);
    }
    updatesaypos();
    //if the text is longer than min length extend length
    if (input.length > 10) {
        document.getElementById("dtext").setAttribute("width", 130 + (input.length - 10) * 10.5);
    }
    //set text to block text
    document.getElementById("dtext1").innerHTML = input;
    //show element
    document.getElementById("dtext").style.visibility = "visible";
    document.getElementById("dtext1").style.visibility = "visible";
}

function updatesaypos(){
    var x, y, r;
    if(sprtarget.id == "circle") {
        r = Number(sprtarget.getAttribute("r"));
        x = Number(sprtarget.getAttribute("cx")) + r;
        y = Number(sprtarget.getAttribute("cy")) - r;
    } else if (sprtarget.id == "rect") {
        x = Number(sprtarget.getAttribute("x")) + Number(sprtarget.getAttribute("width"));
        y = Number(sprtarget.getAttribute("y"));
    }
    setatt(document.getElementById("dtext"), "transform", "translate("+ x +","+ y +")");
    setatt(document.getElementById("dtext1"), "transform", "translate("+ x +","+ y +")");
}
function setatt(target, att, set){
    target.setAttribute(att, set);
}
function updatesaycheck(){
    if($.inArray(sprid, sprsay) != -1){
        updatesaypos();
    }
}
function refresh(){
    gameplayer = document.getElementById("scratchWindow");
    sprites = gameplayer.getElementsByClassName("sprite");
    sprtarget = sprites[sprid];
}
function fixrect () {
    if (sprtarget.id == "rect") {
        if (movetype == 1 || movetype == 3) {
            setatt(sprtarget, "width", 80);
            setatt(sprtarget, "height", 160);
            setatt(sprtarget, "x", x - 40);
            setatt(sprtarget, "y", y - 80);
        } else if (movetype == 2 || movetype == 4) {
            setatt(sprtarget, "width", 160);
            setatt(sprtarget, "height", 80);
            setatt(sprtarget, "x", x - 80);
            setatt(sprtarget, "y", y - 40);
        }
    }
}
//connecting to this block
//connectedto is block this snapped to
"use strict";
var mx, my, done = 0, clock, c = -1, selob, arr = [], startblock = [];
function load() {
	console.log("Setting up page");
	var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0];
	w = w.innerWidth || e.clientWidth || g.clientWidth;
	document.getElementById("editorWindow").style.width = (w - 507) + "px";
}
function Block(x, y, id, color, connect, type) {
    this.x = x; 
	this.y = y;
	this.cx = x;
	this.cy = y;
	this.sx = mx;
	this.sy = my;
	this.id = id;
	this.type = type;
    //Id of the block that this object is connected to
	this.connectedto = -1;
    //Id of block thst is connected to this object
	this.connecting = -1;
	this.connect = connect;
    this.color = color;
    this.value = "";
	this.render = function () {
		this.cx = this.x + (mx - this.sx);
		this.cy = this.y + (my - this.sy);
		this.update();
	};
	this.update = function () {
		setatt(document.getElementById(this.id), "transform", "translate(" + this.cx + "," + this.cy + ")");
	};
	this.del = function () {
		document.getElementById(this.id).style.pointerevents = "none";
		var element = document.getElementById(this.id);
		element.parentNode.removeChild(element);
		this.id = -10;
	};
	this.codemove = function (m) {
		this.cy += m;
		this.y += m;
		this.update();
		var ifst = this.connecting > -1;
		if (ifst) {
			arr[this.connecting].codemove(m);
		}
	};
	createobject(this.type, this.id, this.x, this.y, color);
    blocktype(this);
    switch (this.type) {
        case 3:
            this.value = "red";
            break;
        case 4:
            this.value = "circle";
            break;
        case 7:
            this.value = "pop";
            break;
        case 8:
            this.value = 1;
            break;
    }
}
function movestart(id) {
	if (done === 0 && arr[id].id !== -10) {
		done = 1;
		var idtmp = arr[id], connects = idtmp.connecting;
		checkstart(idtmp);
		if (idtmp.connecting === undefined || idtmp.connecting === null || idtmp.connecting === -1) {
			if (idtmp.connectedto === undefined || idtmp.connectedto === null || idtmp.connectedto === -1) { //if block is alone then it will not do anything
			} else { //it last block on list then have it be negitive one / last block deletes of list
				arr[idtmp.connectedto].connecting = -1;
				idtmp.connectedto = -1;
			}
		} else {
			if (idtmp.connectedto === undefined || idtmp.connectedto === null || idtmp.connectedto === -1) { //it will be at top and make other block not connected but won't move up			
				arr[connects].connectedto = -1;
				idtmp.connecting = -1;
			} else { //has blocks it is connecting to and blocks connecting to this one
				arr[idtmp.connectedto].connecting = connects;
				arr[connects].connectedto = idtmp.connectedto;
				idtmp.connecting = -1;
				idtmp.connectedto = -1;
				arr[connects].codemove(-30);
			}
		}
		idtmp.x = idtmp.cx;
		idtmp.y = idtmp.cy;
		idtmp.sx = mx;
		idtmp.sy = my;
		selob = arr[id];
		clock = setInterval(function () {
				arr[id].render();
			}, 0);
	}
}
function createblock(x, y, color, connect, type) {
	if (done === 0) {
		done = 1;
		c++;
		var block = new Block(x, y, c, color, connect, type);
		arr[c] = block;
		selob = block;
		clock = setInterval(function () {
				arr[c].render();
			}, 1);
	}
}
function connect() {
    var didconnect = false;
	var ob1 = selob;
	var ob2;
	if (ob1.cx > 170) {
		if (ob1.connect === 1) {
			for (var i = 0; i < arr.length; i++) {
				ob2 = arr[i];
				if (ob2.id == -10 || ob1.id == ob2.id) {
					//don't do anything
				} else {
					if (arr.length === 0) {
						break;
					} else if (ob2.cx - 10 < ob1.cx && ob2.cx + 140 > ob1.cx && ob2.cy + 24 < ob1.cy && ob1.cy - ob2.cy < 51) {
						if (ob2.connecting === null || ob2.connecting == -1 || ob2.connecting === undefined) {
							ob1.cx = ob2.cx;
							ob1.cy = ob2.cy + 30;
							ob2.connecting = ob1.id;
							ob1.connectedto = ob2.id;
							ob1.update();
							if (ob2.type == 0) {
								if (ob2.lista === 0) {
									ob2.addlist();
								}
							}
                            didconnect = true;
                            break;
						}
					}
				}
            }
            if(didconnect == false){
                insert();
            }
        }
		} else {
			if (ob1.id != -10) {
				if (ob1.id === c) {
					arr.pop();
					c--;
				}
				ob1.del();
			}
		}
		done = 0;
}

function insert() {
    var didconnect = false;
	var ob1 = selob;
	var ob2;
		if (ob1.connect === 1) {
			for (var i = 0; i < arr.length; i++) {
				ob2 = arr[i];
				if (ob2.id == -10 || ob1.id == ob2.id) {
					//don't do anything
				} else {
					if (arr.length === 0) {
						break;
					} else if (ob2.cx - 10 < ob1.cx && ob2.cx + 140 > ob1.cx && ob2.cy + 24 < ob1.cy && ob1.cy - ob2.cy < 51) {
                        ob1.cx = ob2.cx;
                        ob1.cy = ob2.cy + 30;
                        
                        arr[ob2.connecting].connectedto = ob1.id;
                        ob1.connecting = ob2.connecting;
                        ob2.connecting = ob1.id;
                        ob1.connectedto = ob2.id;
                        ob1.update();
                        arr[ob1.connecting].codemove(30);
                        didconnect = true;
                        break;
					}
				}
            }
        }
    done = 0;
}

function checkstart(target, infom) {
	if (target.type == 0) { //if startblock itself is moved
		for (var i = 0; i < startblock.length; i++) {
			if (startblock[i] == target.id) {
				console.info("splice at "+ i);
				startblock.splice(i, 1);
				target.lista = 0;
			}
		}
	} else {
		if (startblock.length > 0 && target.connectedto != -1 && arr[target.connectedto].type == 0 && target.connecting == -1) { //for blocks connecting to start block
			target = arr[target.connectedto];
			for (var i = 0; i < startblock.length; i++) {
				if (startblock[i] == target.id) {
					console.info("splice at "+ i);
					startblock.splice(i, 1);
					target.lista = 0;
				}
			}
		}
	}
}
function mouseup() {
	clearInterval(clock);
	if (arr.length > 0 && done == 1) {
		connect();
	}
}
$(document).on("mousemove", function (event) {
	mx = event.pageX;
	my = event.pageY;
});
function getlist() {
	return startblock;
}
function getarray() {
	return arr;
}
function lert(a, d) {
    //d varibile for if it is input 1 or 2 of the block
    var c = a.id;
    if (d == 0) {
        var b = c.substring(4, c.length);
        arr[b].value = document.getElementById(a.id).value;
    } else if (d == 1) {
        var b = c.substring(5, c.length);
        arr[b].value1 = document.getElementById(a.id).value;
    }
}

function oopsave(){
    var tmp = JSON.stringify(arr);
    return c+"`"+tmp.substring(1,tmp.length - 1)+"`"+startblock;
}
function loadobjects(a, q, w){
    //clears all curent objets
    arr = [];
    c = q;
    startblock = [];
    if (w != "") {
        startblock = w.split(",");
    }
    //creates objects from string and adds them to arr
    for (var b = 0; b < a.length; b++) {
        arr.push(JSON.parse(a[b]));
    }
    //addes functions for the objects
    for (var b = 0; b < arr.length; b++) {
        arr[b].render = function () {
            this.cx = this.x + (mx - this.sx);
            this.cy = this.y + (my - this.sy);
            this.update();
	    };
        arr[b].update = function () {
            setatt(document.getElementById(this.id), "transform", "translate(" + this.cx + "," + this.cy + ")");
        };
	   arr[b].del = function () {
		  document.getElementById(this.id).style.pointerevents = "none";
		  var element = document.getElementById(this.id);
		  element.parentNode.removeChild(element);
		  this.id = -10;
	   };
	   arr[b].codemove = function (m) {
		  this.cy += m;
		  this.y += m;
		  this.update();
		  var ifst = this.connecting > -1;
		  if (ifst) {
			arr[this.connecting].codemove(m);
		  }
	   };
        //adds special functions for the blocks
        blocktype(arr[b]);
    }
    //removes all curent blocks
    $( ".bl" ).remove();
    //creates svg elements
    for (var b = 0; b < arr.length; b++) {
        if (arr[b].id != -10) {
            createobject(arr[b].type, arr[b].id, arr[b].cx, arr[b].cy, arr[b].color);
        }
    }
    //sets values for inputs
    for (var b = 0; b < arr.length; b++) {
        if (arr[b].id != -10 && arr[b].type != 0) {
            switch (arr[b].type) {
                case 1:
                    case 2:
                    case 5:
                    case 9:
                    document.getElementById("text" + arr[b].id).value = arr[b].value;
                    break;
                case 3:
                    case 4:
                    case 7:
                    case 8:                    
                    document.getElementById("drop" + arr[b].id).value = arr[b].value;
                    break;
                case 6:
                    document.getElementById("text" + arr[b].id).value = arr[b].value; 
                    document.getElementById("1text" + arr[b].id).value = arr[b].value1;
                    break;
            }
        }
    }
    console.log("Finished Loading");
    console.info(arr);
    console.info(c);
    console.info(startblock);
}

function blocktype(a) {
    switch (a.type) {
	case 0:
		a.lista = 0;
		a.addlist = function () {
			this.lista = 1;
			startblock.push(this.id);
		};
		break;
	case 1:
        case 2:
        case 5:
        case 9:
		a.getinput = function () {
			return document.getElementById("text" + this.id).value;
		};
		break;
	case 3:
        case 4:
        case 7:
        case 8:
		a.getinput = function () {
			return document.getElementById("drop" + this.id).value;
		};
		break;
    case 6:
		a.getinput = function (w) {
            if(w == 0){
                return document.getElementById("text" + this.id).value;
            } else if (w == 1) {
                return document.getElementById("1text" + this.id).value;
            } else {
                console.warn("Input doesn't exist")
            }
		};
		break;
	}
}
/*
this libary type thing is for data manipulation and svg manipulation with its own easy system
*/
//var mx = 0, my = 0;
/*
these are for arrays
*/

function arrayRemove (arr, obj) {
    if (arr.indexOf(obj) != -1) {
        arr.splice(arr.indexOf(obj), 1);
    }
}
function arrayRemoveAll (arr, obj) {//remove specific object from array
    if (arr.indexOf(obj) != -1) {
        if (arr.indexOf(obj) == arr.lastIndexOf(obj)) {//only one object
            arr.splice(arr.indexOf(obj), 1);
        } else { //more than one object
            while (arr.indexOf(obj) != -1) {
                arr.splice(arr.indexOf(obj), 1);
            }
        }
    }
}

function arrayRemoveAfter (arr, obj) { //remove that object and rest of the array to the end only leaving the beginning
    arr.splice(arr.indexOf(obj), arr.length - arr.indexOf(obj));
    return arr;
}

function arrayGetAfter (arr, obj) { //this also gets rid of it from the array
    let arr2 = arr.slice(), pos = arr2.indexOf(obj);
    return arr2.splice(pos, arr2.length - pos);
}
//this returns the arrays combined
function arrayJoin (arr, arr2) {
    return arr.concat(arr2);
}

function arrayInsertObj (arr, obj, pos) { //pos will start at 1
    arr.splice(pos - 1, 0, obj);
}

function arrayInsertArray (arr, arr2, pos) {
    arr.splice.apply(arr, [pos, 0].concat(arr2));
    return arr;
}
//returns an array
function arraySplit (arr, pos) {//it will be that position to the end and pos will start at one
    return arr.splice(pos - 1, arr.length - (pos - 1));
}

function arrayAdd (arr, value) {
    arr[arr.length] = value;
}
/*
this is for svg
*/
//first mouse tracking setup for your elements
/*
function trackMouse () {
    document.addEventListener("mousemove", function (event) {upmopo(event)});
}
function upmopo (event) {
    mx = event.pageX;
    my = event.pageY;
    log(mx);
    log(my);
}
var getMouse = {
    x : function () {return mx;},
    y : function () {return my;}
}
*/
/*
this is misc
*/
function log (a) {//this is because i'm too lazy
    console.log(a);
}
function info (a) {
    console.info(a);
}


/*
    seems everything is in good shape and should be good for awhile now just need to work on run.js fi;e
    
    when deleting blocks and switching between sprites it seems that it messes up the other sprites blocks
*/
"use strict";
let obj = [], block_id = -1, sprite_id = -1, moving = [], groups = [], sprites = [], current_sprite;

/*
2after making everything else compatible with the new system I can then look at making the groups more efficent and not have dead groups in it

also resizable inputs by setting a minimum and maximum text input size and I then would just have to update the resize for objects and have it also detect the new size of block when the input block is updated
*/
window.onmouseup = function () {
    //clear moving array and the objects being moved
    info("Mouse up");
    if (moving.length > 0) {
        moving.forEach((a) => { a.stop(); });
        //this is where it looks for connections to other blocks
        var response = check_connect(moving[0]);
        //logic for connecting to other blocks and groups
        if (moving[0].x > 170) {
            if (response == "cc") {//stands for can't connect
                //it doesn't need to do anything since the only thing it does is move around
            } else if (response != false) {//then connect and move group
                //remove itself from previous array
                groups[moving[0].group] = arrayRemoveAfter(groups[moving[0].group], moving[0]);
                //insert into array regardless if it is first or not
                groups[response.group] = arrayInsertArray(groups[response.group], moving, groups[response.group].indexOf(response) + 1);
                //now need to update everything in moving array about its new group
                moving.forEach((a) => { a.group = response.group; });
                //need to then update every blocks position of the new group
                let h = 0;
                groups[response.group].forEach((a) => {
                    a.x = groups[response.group][0].x;
                    a.y = groups[response.group][0].y + h;
                    a.render();
                    h += a.height;
                });
            } else if (moving[0] != groups[moving[0].group][0]) { // if it was not the beginning in the group then remove itself from previos array and make new group
                //remove itself from previous array
                groups[moving[0].group] = arrayRemoveAfter(groups[moving[0].group], moving[0]);
                //add moving to a new group
                arrayAdd(groups, moving);
                //now set moving blocks to new group array number
                moving.forEach((a) => { a.group = groups.length - 1; });
            }
        } else { //then delete this block and the others
            //first remove itself from previous group
            groups[moving[0].group] = arrayRemoveAfter(groups[moving[0].group], moving[0]);
            //now delete all objects in moving array
            moving.forEach((a) => { a.del(); });
        }
        clear_moving();
        //update sprites group no matter what
        current_sprite.update_group(groups);
    }
};

function switch_sprite (spr) {//this is in charge of switch sprites and making sure everything is loaded and render aka extremy important
    if (spr !== current_sprite) {
        log("switch sprite");
        current_sprite.group = groups;
        current_sprite = spr;
        select_sprite(spr);
        groups = current_sprite.group;
        reload_blocks(groups);
    }
}

function load () {
    info("Setting up page")
    load_blocks();
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) { //checks to see what browser you are using
        info("Firefox Detected");
        let inputs = document.getElementsByTagName("input");
        inputs.forEach((a) => {
            a.style.position = "relative";
            a.style.bottom = "1px";
            a.style.right = "1px";
        });
    }
    info("Version 12.5.0")
    new_sprite("green", "0,0 200,0 200,100 0,100", true);
    //sprite_id += 1;
    //sprites[sprite_id] = new sprite("0,0 100,0 100,100 0,100", "orange", sprite_id);
    
}

function create_block (id, type) {
    block_id += 1;
    obj[block_id] = new block(id, block_id, type);
    obj[block_id].set_dom();
    //add the new block to a new group
    obj[block_id].group = groups.length;
    groups.push([obj[block_id]]);
    clear_moving();
    moving.push(obj[block_id]);
    run_moving();
}

function clear_moving () {
    moving = [];
}
function run_moving () {//this is an extremley important function for the movement
    moving.forEach((a) => { a.move(); });
}
function check_connect (a) {
    let can_connect = false;
    if (a.type == "start") {
        can_connect = "cc";
    } else {
        obj.forEach((b) => {
            if (a == b) {
                log("skip")
            } else {
                if (b.x - 5 <= a.x && b.x + b.width + 5 >= a.x) {
                    if (b.y + b.height - 5 <= a.y && b.y + b.height + 20 >= a.y) {
                        log("Can connect to: " + b.id);
                        can_connect = b;
                    }
                }
            }
        });
    }
    return can_connect;
}
function moveblock (a) {
    moving = arrayGetAfter(groups[a.group], a);
    run_moving();
}
function get_sprites () {
    return sprites;
}

function input (obj1, a) {
    if (a == 0) {
        obj[obj1.id.substring(4, obj1.id.length)].value = document.getElementById(obj1.id).value;
    } else if (a == 1) {
        obj[obj1.id.substring(5, obj1.id.length)].value1 = document.getElementById(obj1.id).value;
    } else {
        log("Don't support that number");
    }
}

function new_sprite (c = "red", p = "0,0 100,0 100,100 0,100", b) {
    //if (sprite_id < 11) { limits the amount of sprites you can create
        log("new sprite");
        sprite_id += 1;
        sprites[sprite_id] = new sprite(p, c, sprite_id);
        if (b) {
            current_sprite = sprites[0];
            select_sprite(current_sprite);
        }
        switch_sprite(sprites[sprite_id]);
    //}
}
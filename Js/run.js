let compile_array = [], run_pos, arr_pos;
//still needs a lot more work
function  init_run () {
    let run_array = [], sprites = [];
    compile_array = [];
    log("initiate run");
    //fill the sprites array with needed info
    get_sprites().forEach((a, i) => {
        sprites[i] = a.group;
    });
    
    for (let i = 0; i < sprites.length; i++) {
        run_array[i] = sprites[i].filter((a) => {
            return a != 0 && a[0].type === 0 && a.length > 1;
        });
    }
    let i = 0;
    for (i = 0; i < run_array.length; i++) { //first of the layers
        compile_array[i] = [];
        let arr = run_array[i];//select the group of the first arrays
        for (let i2 = 0; i2 < arr.length; i2++) {
            let arr2 = arr[i2];//this is going to slect the specific group
            for (let i3 = 0; i3 < arr2.length; i3++) {
                compile_array[i][compile_array[i].length] = arr2[i3];
            }
        }
    }
    log(compile_array);
    reset();
    run_next(0);
}
//now it just needs to run through the blocks in the array
function reset() {
    run_pos = 0;
    arr_pos = 0;
}

function run_next (delay) {
    if (run_pos < compile_array[arr_pos].length && compile_array[arr_pos].length > 0) {//first check to see if there is anything left to run
        window.setTimeout(() => {run(compile_array[arr_pos][run_pos]);}, delay);
    } else {
        arr_pos += 1;
        if (arr_pos >= compile_array.length) {
            log("Finished Running");
        } else {
            run_pos = 0;
            run_next(0);
        }
    }
}

function run (a) {//need to add new blocks and change how other blocks work
    let delay = 0;
    log("Block " + a.id + " with " + a.getinput(0) + " for sprite " + arr_pos);
    switch (a.type) {
        case 1: 
            if (/\S/.test(a.getinput(0))) {
                get_sprites()[arr_pos].set_text(a.getinput(0)).update_text().show_text(-1);
            }
            delay = 0;
            break;
        case 2:
            if (/\S/.test(a.getinput(0))) {
                get_sprites()[arr_pos].add_rotation(a.getinput(0)).update_transform();
            }
        case 5:
            if (/\S/.test(a.getinput(0))) {
                get_sprites()[arr_pos].translate(a.getinput(0)).update_transform();
            }
            delay = 0;
            break;
        case 3:
            get_sprites()[arr_pos].change_fill(a.getinput(0));
            delay = 0;
            break;
        case 4:
            if (a.getinput(0) === "squr") {
                get_sprites()[arr_pos].change_points("0,0 100,0 100,100 0,100", 100, 100);
            } else {
                get_sprites()[arr_pos].change_points("0,0 200,0 200,100 0,100", 200, 100);
            }
            delay = 0;
            break;
        case 6:
            if (/\S/.test(a.getinput(0))) {
                get_sprites()[arr_pos].set_text(a.getinput(0)).update_text().show_text(a.getinput(1) * 1000);
            }
            break;
        case 7:
            let audio = new Audio('res/'+a.getinput(0)+'.m4a');
            audio.play();
            delay = 0;
            break;
        case 9:
            if (/\S/.test(a.getinput(0))) {
                get_sprites()[arr_pos].translate(0, a.getinput(0)).update_transform();
            }
            delay = 0;
            break;
        case 8:
            if (/\S/.test(a.getinput(0))) {
                get_sprites()[arr_pos].set_rotation(a.getinput(0)).update_transform();
            }
            delay = 0;
            break
        case 11:
            if (/\S/.test(a.getinput(0))) {
                get_sprites()[arr_pos].set_x(a.getinput(0)).update_transform();
            }
            delay = 0;
            break;
        case 12:
            if (/\S/.test(a.getinput(0))) {
                get_sprites()[arr_pos].set_y(a.getinput(0)).update_transform();
            }
            delay = 0;
            break;
        default:
            log("Unknown Block Type");
            break;
    }
    run_pos += 1;
    run_next(delay);//we can put a varible delay on this
}
let compile_array = [], run_pos, arr_pos;
//still needs a lot more work
function  init_run () {
    let run_array = [], sprites = [];
    compile_array = [];
    log("initiate run");
    //fill the sprites array with needed info
    arrayForEach(get_sprites(), (a, i)=>{
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
    run_next();
}
//now it just needs to run through the blocks in the array
function reset() {
    run_pos = 0;
    arr_pos = 0;
}

function run_next () {
    if (run_pos < compile_array[arr_pos].length && compile_array[arr_pos].length > 0) {//first check to see if there is anything left to run
        run(compile_array[arr_pos][run_pos]);
    } else {
        arr_pos += 1;
        if (arr_pos >= compile_array.length) {
            log("Finished Running");
        } else {
            run_pos = 0;
            run_next();
        }
    }
}

function run (a) {
    log("Block " + a.id + " with " + a.getinput(0) + " for sprite " + arr_pos);
    switch (a.type) {
        case 1: 
            if (/\S/.test(a.getinput(0))) {
                log("say " + a.getinput(0));
            }
            break;
        case 2: 
            if (/\S/.test(a.getinput(0))) {
                log("run move " + a.getinput(0));
                get_sprites()[arr_pos].translate(a.getinput(0)).update_transform();
            }
            break;
    }
    //this is where the blocks will go to run in the code
    run_pos += 1;
    run_next();//we can put a varible delay on this
}
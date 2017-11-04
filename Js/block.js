let mx, my;

window.onmousemove = (event) => {
    mx = event.pageX;
    my = event.pageY;
};

class block {
    constructor (block_id, id, type) {
        this.thing = get_block_info()[block_id];
        this.block_id = block_id;
        this.x = this.thing.s_x;
        this.y = this.thing.s_y;
        this.id = id;
        this.type = type;
        this.sx;
        this.sy;
        this.width = 135;
        this.height = 30;
        this.value = "";
        this.value1 = "";
        this.group;
        improved_creation(this);
    }

    getinput (a = 0) {
        if (a === 1) {
            return this.value1;
        } else {
            return this.value;
        }
    }

    set_dom () {
        this.dom = document.getElementById(this.id);
    }

    setup () {
        this.sy = my;
        this.sx = mx;
    }

    update () {
        this.x += (mx - this.sx);
        this.y += (my - this.sy);
        this.render();
    }

    render () {
        this.dom.setAttribute("transform", "translate(" + this.x + "," + this.y + ")");
    }

    del () {
        this.dom.style.pointerEvents = "none";
        this.dom.parentNode.removeChild(this.dom);
    }

    move () {
        this.setup();
        clearInterval(this.clock);
        this.clock = setInterval ( () => {
            this.update();
            this.setup();
        });
    }

    stop () {
        clearInterval(this.clock);
    }

}
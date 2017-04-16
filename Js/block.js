let mx, my;

let blue = [2,5,9,8,12,11], purple = [1,3,4,6];

window.onmousemove = (event) => {
    mx = event.pageX;
    my = event.pageY;
};

class block {
    constructor (x, y, id, type) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.type = type;
        this.sx;
        this.sy;
        this.width = 135;
        this.height = 30;
        this.value = "";
        this.value1 = "";
        this.group;
        //color
        if (type === 0) {
            this.color = "#EE7D16";
        } else if (type === 7) {
            this.color = "#bf00ff";
        } else if (blue.includes(type)) {
            this.color = "#0060FF";
        } else if (purple.includes(type)) {
            this.color = "#9900cc";
        }
        
        if (type === 3) {
            this.value = "red";
        } else if (type === 7) {
            this.value = "pop";
        } else if (type === 4) {
            this.value = "squr";
        }
        createblock(this);
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
        this.clock = setInterval ( () => {
            this.update();
            this.setup();
        });
    }

    stop () {
        clearInterval(this.clock);
    }

}
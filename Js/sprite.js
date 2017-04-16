//this will work like the blocks except for the sprite
class sprite {
    constructor (points, fill, id) {
        //points of the sprite
        this.svg_points = points;
        //color it is filled with
        this.fill = fill;
        //contains the group of this sprite
        this.group = [];
        //id of the sprite on canavas
        this.id = id;
        //info on the sprite
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        //function to create sprite on canvas
        create_sprite(this.svg_points, this.fill, "s" + this.id);
        this.width = document.getElementById("s" + this.id).getBoundingClientRect().width;
        this.height = document.getElementById("s" + this.id).getBoundingClientRect().height;
    }
    set_rotation (r = 0) { //finish this later
        this.rotation = parseInt(r);
        return this;
    }
    add_rotation (r = 0) {
        this.rotation += parseInt(r);
        return this;
    }
    change_fill (c = "#000") {
        document.getElementById("s" + this.id).setAttribute("style", "fill:" + c +"; fill-rule:evenodd;");
        this.fill = c;
        return this;
    }
    translate (x = 0, y = 0) {
        this.x += parseInt(x);
        this.y += parseInt(y);
        return this;
    }
    update_transform () {
        console.log(this.x, this.y);
        document.getElementById("s" + this.id).setAttribute("transform", "translate ("+ this.x +" "+ this.y +") rotate (" + this.rotation + " " + this.x + " " + this.y + ")");
        return this;
    }
    update_group (group) {
        this.group = group;
    }
    change_points(a, w, h) {
        this.svg_points = a;
        document.getElementById("s" + this.id).setAttribute("points", a);
        this.set_width(w);
        this.set_height(h);
        return this;
    }
    set_width (a) {
        this.width = a;
        return this;
    }
    set_height (a) {
        this.height = a;
        return this;
    }
    set_x (a) {
        this.x = a;
        return this;
    }
    set_y (a) {
        this.y = a;
        return this;
    }
}
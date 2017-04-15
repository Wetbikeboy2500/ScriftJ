class _ce {
    
    element (a) {
        this.dom = document.createElement(a);
        return this;
    }
    
    element_ns (a) {
        this.dom = document.createElementNS("http://www.w3.org/2000/svg",a);
        return this;
    }
    
    attribute (a, value) {
        this.dom.setAttribute(a, value);
        return this;
    }
    
    append (a) {
        a.append(this.dom);
        return this;
    }
}

function create_element () {
    return new _ce();
}
function load() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    w = w.innerWidth || e.clientWidth || g.clientWidth;
    
    document.getElementById("updatelog").style.left = (w/2) - 300 + "px";
    document.getElementById("infocenter").style.left = (w/2) - 300 + "px";
}
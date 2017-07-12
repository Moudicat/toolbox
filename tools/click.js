var element = document.getElementsByClassName('your-element')[0];
var me = (target, ...arg) => {
	let ev = document.createEvent("MouseEvents");
	ev.initEvent.apply(ev, arg);
	target.dispatchEvent(ev);
}
clearInterval(timer);
var timer = setInterval(() => {
    if (element.innerText && element.innerText === 'Continue »') {
        me(element, 'mousedown', true, true);
		me(element, 'click', true, true);
        me(element, 'mouseup', true, true);
    } else {
		alert(11111111);
		clearInterval(timer);
	}
}, 500 + Math.random()*100);

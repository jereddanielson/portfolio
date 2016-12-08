require("../../node_modules/bootstrap/dist/css/bootstrap.css");
require("../css/index.scss");
require("../css/deleteme.scss");
require("file?name=./JeredDanielsonResume2016.pdf!../JeredDanielsonResume2016.pdf");
require("file?name=./partyparrot.png!../img/partyparrot.png");
require("file?name=./thumb.jpg!../img/thumb.jpg");
var smoothScroll = require("smooth-scroll");
smoothScroll.init({easing: "easeOutQuint"});

var jQuery = require("jquery");
var $ = jQuery;

// add event listeners for project overlays
$(".activate-apod").on("click", activateApod);
$(".activate-uw").on("click", activateUW);
$(".activate-newsletter").on("click", activateNewsletter);

// event listeners for closing overlay when nav link clicked
$("nav a").on("click", dismissOverlay);

// overlay background exit click listener
$("#overlay-slip, .close-overlay").on("click", historyGoBack);

// listen for window back button
$(window).on("popstate", onPop);

function historyGoBack(){
	if($(".active").length > 0){
		window.history.back();
	}
}

window.foo = smoothScroll.animateScroll;

function onPop(d){
	if($(".active").length > 0){
		dismissOverlay();
	}

	if(window.location.hash === "#uw-overlay"){
		activateOverlay("#uw-overlay");
	} else if(window.location.hash === "#apod-overlay"){
		activateOverlay("#apod-overlay");
	} else if(window.location.hash === "#newsletter-overlay"){
		activateOverlay("#newsletter-overlay");
	}
}

var savedY = 0; // scroll position at time overlay is opened

// set up scroll disable by recording current scroll position and adding event listener
function disableScroll(){
	savedY = $("body").scrollTop();
	$(window).on("scroll", cancelScroll);
	$(window).on("wheel", checkScroll);
}

// fired on scroll attempt to reset it back to saved location
function cancelScroll(){
	$(window).scrollTop(savedY);
}

// check to see if overflow is at min or max scroll and cancel mousewheel if so
function checkScroll(e){
	var activeOverlay = $(".active")[0];
	// check min or max scroll
	if((activeOverlay.scrollTop === 0 && e.deltaY < 0) || (activeOverlay.scrollHeight - activeOverlay.scrollTop === activeOverlay.clientHeight && e.deltaY > 0)){
		e.preventDefault();
		e.stopPropagation();
	}
}

// re-enable scroll by canceling scroll listener
function enableScroll(){
	$(window).off("scroll", cancelScroll);
	$(window).off("wheel", checkScroll);
}

function activateApod(e){
	activateOverlay("#apod-overlay");
}

function activateUW(e){
	activateOverlay("#uw-overlay");
}

function activateNewsletter(e){
	activateOverlay("#newsletter-overlay");
}

function activateOverlay(overlayID){
	window.location.hash = overlayID;
	$("body").addClass("overlay-active");
	$(overlayID).addClass("active").scrollTop(0);
	disableScroll();
}

function dismissOverlay(e){
	$("body").removeClass("overlay-active");
	$(".active").removeClass("active");
	enableScroll();
}

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);
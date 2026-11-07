// require("../../node_modules/bootstrap/dist/css/bootstrap.css");
// require("file?name=./JeredDanielsonResume2016.pdf!../JeredDanielsonResume2016.pdf");
// require("file?name=./partyparrot.png!../img/partyparrot.png");
// require("file?name=./thumb.jpg!../img/thumb.jpg");
function onClick(selector, handler) {
  document.querySelectorAll(selector).forEach(function(el) {
    el.addEventListener("click", handler);
  });
}

// add event listeners for project overlays
onClick(".activate-apod", activateApod);
onClick(".activate-chaos", activateChaos);
onClick(".activate-uw", activateUW);
onClick(".activate-newsletter", activateNewsletter);

// event listeners for closing overlay when nav link clicked
onClick("nav a", dismissOverlay);

// overlay background exit click listener
onClick("#overlay-slip, .close-overlay", historyGoBack);

// listen for window back button
window.addEventListener("popstate", onPop);

function historyGoBack() {
  if (document.querySelector(".active")) {
    window.history.back();
  }
}

function onPop(d) {
  if (document.querySelector(".active")) {
    dismissOverlay();
  }

  if (window.location.hash === "#uw-overlay") {
    activateOverlay("#uw-overlay");
  } else if (window.location.hash === "#apod-overlay") {
    activateOverlay("#apod-overlay");
  } else if (window.location.hash === "#chaos-overlay") {
    activateOverlay("#chaos-overlay");
  } else if (window.location.hash === "#newsletter-overlay") {
    activateOverlay("#newsletter-overlay");
  }
}

var savedY = 0; // scroll position at time overlay is opened

// set up scroll disable by recording current scroll position and adding event listener
function disableScroll() {
  savedY = window.scrollY;
  window.addEventListener("scroll", cancelScroll);
  // non-passive so checkScroll can call preventDefault
  window.addEventListener("wheel", checkScroll, { passive: false });
}

// fired on scroll attempt to reset it back to saved location
function cancelScroll() {
  // explicit "instant" because the page has scroll-behavior: smooth in CSS
  window.scrollTo({ top: savedY, behavior: "instant" });
}

// check to see if overflow is at min or max scroll and cancel mousewheel if so
function checkScroll(e) {
  var activeOverlay = document.querySelector(".active");
  // check min or max scroll
  if (
    (activeOverlay.scrollTop === 0 && e.deltaY < 0) ||
    (activeOverlay.scrollHeight - activeOverlay.scrollTop ===
      activeOverlay.clientHeight &&
      e.deltaY > 0)
  ) {
    e.preventDefault();
    e.stopPropagation();
  }
}

// re-enable scroll by canceling scroll listener
function enableScroll() {
  window.removeEventListener("scroll", cancelScroll);
  window.removeEventListener("wheel", checkScroll);
}

function activateApod(e) {
  activateOverlay("#apod-overlay");
}

function activateChaos(e) {
  activateOverlay("#chaos-overlay");
}

function activateUW(e) {
  activateOverlay("#uw-overlay");
}

function activateNewsletter(e) {
  activateOverlay("#newsletter-overlay");
}

function activateOverlay(overlayID) {
  // pin the page before changing the hash, which can itself trigger a scroll
  disableScroll();
  window.location.hash = overlayID;
  document.body.classList.add("overlay-active");
  var overlay = document.querySelector(overlayID);
  if (overlay) {
    overlay.classList.add("active");
    overlay.scrollTop = 0;
  }
}

function dismissOverlay(e) {
  document.body.classList.remove("overlay-active");
  document.querySelectorAll(".active").forEach(function(el) {
    el.classList.remove("active");
  });
  enableScroll();
}

// devices that can't hover show the hover-only tool labels and animations permanently
document.documentElement.classList.toggle(
  "touchevents",
  window.matchMedia("(hover: none)").matches
);

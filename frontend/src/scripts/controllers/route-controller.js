import * as Funbox from "../test/funbox";
import * as PageController from "../controllers/page-controller";
import Config from "../config";
import * as ActivePage from "../states/active-page";
import * as PageTest from "../pages/test";
import * as PageAbout from "../pages/about";
import * as Settings from "../pages/settings";

const mappedRouteClasses = {
  "": "pageTest",
  "#settings": "pageSettings",
  "#about": "pageAbout",
};

const mappedRoutePages = {
  "": "test",
  "#settings": "settings",
  "#about": "about",
};

const mappedRoutePageObjects = {
  "": PageTest.page,
  "#settings": Settings.page,
  "#about": PageAbout.page,
};

export function handleInitialPageClasses(hash) {
  if (hash.match(/^#group_/)) hash = "#settings";
  if (!mappedRouteClasses[hash]) {
    hash = "";
  }
  let el = $(".page." + mappedRouteClasses[hash]);
  $(el).removeClass("hidden");
  $(el).addClass("active");
  ActivePage.set(mappedRoutePages[hash]);
  mappedRoutePageObjects[hash].beforeShow();
}

(function (history) {
  let pushState = history.pushState;
  history.pushState = function (state) {
    if (Config.funbox === "memory" && state !== "/") {
      Funbox.resetMemoryTimer();
    }
    return pushState.apply(history, arguments);
  };
})(window.history);

$(window).on("popstate", (e) => {
  let state = e.originalEvent.state;
  if (state == "" || state == "/") {
    // show test
    PageController.change("test");
  } else if (state == "about") {
    // show about
    PageController.change("about");
  }
});

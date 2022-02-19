import * as Funbox from "../test/funbox";
import * as PageController from "../controllers/page-controller";
import Config from "../config";
import * as ActivePage from "../states/active-page";
import * as TestLogic from "../test/test-logic";

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

export function handleInitialPageClasses(hash) {
  if (hash.match(/^#group_/)) hash = "#settings";
  if (!mappedRouteClasses[hash]) {
    hash = "";
  }
  let el = $(".page." + mappedRouteClasses[hash]);
  $(el).removeClass("hidden");
  $(el).addClass("active");
  ActivePage.set(mappedRoutePages[hash]);
  if (mappedRoutePages[hash] === "test") {
    TestLogic.restart();
  }
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

import * as PageController from "./page-controller";
import * as ActivePage from "../states/active-page";
import * as PageTest from "../pages/test";
import * as PageAbout from "../pages/about";
import * as Settings from "../pages/settings";

const mappedRouteClasses = {
  "": "pageTest",
  "#settings": "pageSettings",
  "#about": "pageAbout",
};

const mappedRoutePages: {
  [key: string]: MonkeyTypes.Page;
} = {
  "": "test",
  "#settings": "settings",
  "#about": "about",
};

const mappedRoutePageObjects = {
  "": PageTest.page,
  "#settings": Settings.page,
  "#about": PageAbout.page,
};

export function handleInitialPageClasses(hash: string): void {
  if (hash.match(/^#group_/)) hash = "#settings";
  if (!mappedRouteClasses[hash as keyof typeof mappedRouteClasses]) {
    hash = "";
  }
  const el = $(".page." + mappedRouteClasses[hash as keyof typeof mappedRouteClasses]);
  $(el).removeClass("hidden");
  $(el).addClass("active");
  ActivePage.set(mappedRoutePages[hash as keyof typeof mappedRoutePages]);
  mappedRoutePageObjects[hash as keyof typeof mappedRoutePageObjects].beforeShow();
}

// honestly im not sure what this does
// (function (history): void {
//   const pushState = history.pushState;
//   history.pushState = function (state): void {
//     if (Config.funbox === "memory" && state !== "/") {
//       Funbox.resetMemoryTimer();
//     }
//     // @ts-ignore
//     return pushState.apply(history, arguments);
//   };
// })(window.history);

$(window).on("popstate", (e) => {
  const state = (e.originalEvent as unknown as any).state;
  if (state == "" || state == "/") {
    // show test
    PageController.change("test");
  } else if (state == "about") {
    // show about
    PageController.change("about");
  }
});

import * as Misc from "../misc";
import * as ActivePage from "../states/active-page";
import * as Settings from "../pages/settings";
import * as ManualRestart from "../test/manual-restart-tracker";
import * as PageTest from "../pages/test";
import * as PageAbout from "../pages/about";
import * as PageTransition from "../states/page-transition";

export function change(page: MonkeyTypes.Page | string): void {
  if (PageTransition.get()) {
    console.log(`change page ${page} stopped`);
    return;
  }
  console.log(`change page ${page}`);

  if (page === "") page = "test";
  if (page == undefined) {
    //use window loacation
    const pages = {
      "": "test",
      "#settings": "settings",
      "#about": "about",
    };
    page = pages[window.location.hash as keyof typeof pages];
    if (!page) {
      page = "test";
    }
  }

  if (ActivePage.get() === page) {
    console.log(`page ${page} already active`);
    return;
  }

  const pages = {
    test: PageTest.page,
    settings: Settings.page,
    about: PageAbout.page,
  };

  const previousPage = pages[ActivePage.get() as MonkeyTypes.Page];
  const nextPage = pages[page as keyof typeof pages];

  previousPage?.beforeHide();
  PageTransition.set(true);
  ActivePage.set(undefined);
  $(".page").removeClass("active");
  Misc.swapElements(
    previousPage.element,
    nextPage.element,
    250,
    () => {
      PageTransition.set(false);
      ActivePage.set(nextPage.name);
      previousPage?.afterHide();
      nextPage.element.addClass("active");
      history.pushState(nextPage.pathname, "", nextPage.pathname);
      nextPage?.afterShow();
    },
    async () => {
      await nextPage?.beforeShow();
    }
  );
}

$(document).on("click", "#top .logo", () => {
  change("test");
});

$(document).on("click", "#top #menu .icon-button", (e) => {
  const href = $(e.currentTarget).attr("href") as string;
  ManualRestart.set();
  change(href.replace("/", "").replace("#", "") as MonkeyTypes.Page);
  return false;
});

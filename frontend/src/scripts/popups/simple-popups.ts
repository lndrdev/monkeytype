import * as UpdateConfig from "../config";
import * as Settings from "../pages/settings";

type Input = {
  placeholder: string;
  type?: string;
  initVal: string;
  hidden?: boolean;
};

export const list: { [key: string]: SimplePopup } = {};
class SimplePopup {
  parameters: string[];
  wrapper: JQuery;
  element: JQuery;
  id: string;
  type: string;
  title: string;
  inputs: Input[];
  text: string;
  buttonText: string;
  execFn: any;
  beforeShowFn: any;
  constructor(
    id: string,
    type: string,
    title: string,
    inputs: Input[] = [],
    text = "",
    buttonText = "Confirm",
    execFn: any,
    beforeShowFn: any
  ) {
    this.parameters = [];
    this.id = id;
    this.type = type;
    this.execFn = execFn;
    this.title = title;
    this.inputs = inputs;
    this.text = text;
    this.wrapper = $("#simplePopupWrapper");
    this.element = $("#simplePopup");
    this.buttonText = buttonText;
    this.beforeShowFn = beforeShowFn;
  }
  reset(): void {
    this.element.html(`
    <div class="title"></div>
    <div class="inputs"></div>
    <div class="text"></div>
    <div class="button"></div>`);
  }

  init(): void {
    const el = this.element;
    el.find("input").val("");
    // if (el.attr("popupId") !== this.id) {
    this.reset();
    el.attr("popupId", this.id);
    el.find(".title").text(this.title);
    el.find(".text").text(this.text);

    this.initInputs();

    if (!this.buttonText) {
      el.find(".button").remove();
    } else {
      el.find(".button").text(this.buttonText);
    }

    // }
  }

  initInputs(): void {
    const el = this.element;
    if (this.inputs.length > 0) {
      if (this.type === "number") {
        this.inputs.forEach((input) => {
          el.find(".inputs").append(`
            <input
              type="number"
              min="1"
              val="${input.initVal}"
              placeholder="${input.placeholder}"
              class="${input.hidden ? "hidden" : ""}"
              ${input.hidden ? "" : "required"}
              autocomplete="off"
            >
          `);
        });
      } else if (this.type === "text") {
        this.inputs.forEach((input) => {
          if (input.type) {
            el.find(".inputs").append(`
              <input
                type="${input.type}"
                val="${input.initVal}"
                placeholder="${input.placeholder}"
                class="${input.hidden ? "hidden" : ""}"
                ${input.hidden ? "" : "required"}
                autocomplete="off"
              >
            `);
          } else {
            el.find(".inputs").append(`
              <input
                type="text"
                val="${input.initVal}"
                placeholder="${input.placeholder}"
                class="${input.hidden ? "hidden" : ""}"
                ${input.hidden ? "" : "required"}
                autocomplete="off"
              >
            `);
          }
        });
      }
      el.find(".inputs").removeClass("hidden");
    } else {
      el.find(".inputs").addClass("hidden");
    }
  }

  exec(): void {
    const vals: string[] = [];
    $.each($("#simplePopup input"), (_, el) => {
      vals.push($(el).val() as string);
    });
    // @ts-ignore todo remove
    this.execFn(...vals);
    this.hide();
  }

  show(parameters: string[] = []): void {
    this.parameters = parameters;
    this.beforeShowFn();
    this.init();
    this.wrapper
      .stop(true, true)
      .css("opacity", 0)
      .removeClass("hidden")
      .animate({ opacity: 1 }, 125, () => {
        $($("#simplePopup").find("input")[0]).focus();
      });
  }

  hide(): void {
    this.wrapper
      .stop(true, true)
      .css("opacity", 1)
      .removeClass("hidden")
      .animate({ opacity: 0 }, 125, () => {
        this.wrapper.addClass("hidden");
      });
  }
}

export function hide(): void {
  $("#simplePopupWrapper")
    .stop(true, true)
    .css("opacity", 1)
    .removeClass("hidden")
    .animate({ opacity: 0 }, 125, () => {
      $("#simplePopupWrapper").addClass("hidden");
    });
}

$("#simplePopupWrapper").mousedown((e) => {
  if ($(e.target).attr("id") === "simplePopupWrapper") {
    $("#simplePopupWrapper")
      .stop(true, true)
      .css("opacity", 1)
      .removeClass("hidden")
      .animate({ opacity: 0 }, 125, () => {
        $("#simplePopupWrapper").addClass("hidden");
      });
  }
});

$(document).on("click", "#simplePopupWrapper .button", () => {
  const id = $("#simplePopup").attr("popupId") ?? "";
  list[id].exec();
});

$(document).on("keyup", "#simplePopupWrapper input", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const id = $("#simplePopup").attr("popupId") ?? "";
    list[id].exec();
  }
});

list["applyCustomFont"] = new SimplePopup(
  "applyCustomFont",
  "text",
  "Custom font",
  [{ placeholder: "Font name", initVal: "" }],
  "Make sure you have the font installed on your computer before applying.",
  "Apply",
  (fontName: string) => {
    if (fontName === "") return;
    Settings.groups["fontFamily"]?.setValue(fontName.replace(/\s/g, "_"));
  },
  () => {
    //
  }
);

list["resetSettings"] = new SimplePopup(
  "resetSettings",
  "text",
  "Reset Settings",
  [],
  "Are you sure you want to reset all your settings?",
  "Reset",
  () => {
    UpdateConfig.reset();
    // setTimeout(() => {
    //   location.reload();
    // }, 1000);
  },
  () => {
    //
  }
);

$("#resetSettingsButton").click(() => {
  list["resetSettings"].show();
});

$(document).on(
  "click",
  ".pageSettings .section.fontFamily .button.custom",
  () => {
    list["applyCustomFont"].show([]);
  }
);

$(document).keydown((event) => {
  if (event.key === "Escape" && !$("#simplePopupWrapper").hasClass("hidden")) {
    hide();
    event.preventDefault();
  }
});

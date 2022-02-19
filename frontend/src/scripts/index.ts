/* eslint-disable no-unused-vars */
//this file should be concatenated at the top of the legacy js files

// @ts-ignore
import Chart from "chart.js";
// @ts-ignore
import chartTrendline from "chartjs-plugin-trendline";
// @ts-ignore
import chartAnnotation from "chartjs-plugin-annotation";

Chart.plugins.register(chartTrendline);
Chart.plugins.register(chartAnnotation);

import Config from "./config";
import * as TestStats from "./test/test-stats";
import * as Replay from "./test/replay";
import * as TestTimer from "./test/test-timer";
import * as Result from "./test/result";
import * as TestInput from "./test/test-input";
import { enable } from "./states/glarses-mode";
import "./test/caps-warning";
import "./popups/support-popup";
import "./popups/contact-popup";
import "./popups/version-popup";
import "./popups/simple-popups";
import "./elements/commandline";
import "./controllers/input-controller";
import "./ready";
import "./ui";
import "./pages/about";
import "./elements/scroll-to-top";
import "./popups/mobile-test-config-popup";

// @ts-ignore
global.config = Config;

// @ts-ignore
global.glarsesMode = enable;

// @ts-ignore
global.stats = TestStats.getStats;

// @ts-ignore
global.replay = Replay.getReplayExport;

// @ts-ignore
global.enableTimerDebug = TestTimer.enableTimerDebug;

// @ts-ignore
global.getTimerStats = TestTimer.getTimerStats;

// @ts-ignore
global.toggleUnsmoothedRaw = Result.toggleUnsmoothedRaw;

// @ts-ignore
global.enableSpacingDebug = TestInput.enableSpacingDebug;

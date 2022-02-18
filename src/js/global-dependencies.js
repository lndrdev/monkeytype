//this file should be concatenated at the top of the legacy js files

import Chart from "chart.js";
import chartTrendline from "chartjs-plugin-trendline";
import chartAnnotation from "chartjs-plugin-annotation";

Chart.plugins.register(chartTrendline);
Chart.plugins.register(chartAnnotation);

import * as Misc from "./misc";
import Config from "./config";
import * as SimplePopups from "./simple-popups";
import { toggleGlarses } from "./test-logic";
import "./caps-warning";
import "./support-popup";
import "./contact-popup";
import "./version-popup";
import "./input-controller";
import "./ready";
import "./about-page";
import "./scroll-to-top";
import * as TestStats from "./test-stats";
import * as Replay from "./replay";
import * as TestTimer from "./test-timer";
import * as Result from "./test-timer";

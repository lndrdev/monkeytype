//this file should be concatenated at the top of the legacy js files

import Chart from "chart.js";
import chartTrendline from "chartjs-plugin-trendline";
import chartAnnotation from "chartjs-plugin-annotation";

Chart.plugins.register(chartTrendline);
Chart.plugins.register(chartAnnotation);

import * as Misc from "./misc";
import Config from "./config";
import * as SimplePopups from "./simple-popups";
import "./caps-warning";
import "./support-popup";
import "./version-popup";
import "./custom-theme-popup";
import "./import-settings-popup";
import "./input-controller";
import "./ready";

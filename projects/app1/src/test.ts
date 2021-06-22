// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import "zone.js/dist/zone-testing";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";

/**
 *
 * Utilitie declaration
 * for importing
 * tests files
 *
 */
declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

/**
 * context
 * Then we find all the tests.
 *
 */
const context = require.context("./", true, /\.spec\.ts$/);

/**
 * context
 * And load the modules.
 *
 */
context.keys().map(context);

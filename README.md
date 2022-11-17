# Example of end-to-end automated tests with LaunchDarkly flags

A demo of how to do end-to-end automated testing of an app that uses feature flags _without_ having to reconfigure flags in between tests.

This repository contains:

* A super-simple single-page web app, written in the Express web framework for NodeJS
* Some simple end-to-end browser tests, using the Cypress test automation framework

The app has two tiny features, each of which is controlled by a distinct flag. The evaluation of the flag sets the state of the feature:

* Flag `enable-feature-x`
  * Type: boolean
  * Effect: changes a display message on the front page.
  * Evaluated by: NodeJS ([`routes/index.js`](routes/index.js))
* Flag `set-heading-color`
  * Type: string 
  * Variations: `red`, `green`, `black`
  * Effect: Set the color of the main heading on the front page.
  * Evaluated by: Browser JS ([`public/javascripts/header_color.js`](public/javascripts/header_color.js))

The app very basic Express app, with two special middleware functions:

* The LaunchDarkly SDK middleware adds `ldClient` and `ldContext` objects to the request object.
* The second function looks for request cookies with names that start with `TESTFLAG_`, then adds each cookie's name and value as a custom attribute in the `ldContext` object. (This middleware is controlled by the `set-flag-context-with-cookies` flag, and should only be enabled in test environments.)

The tests exercise all the states for those features without changing the flag configurations; instead, each flag has targeting rules that check a dedicated custom attribute for that flag.

For example, the `enable-feature-x` flag defaults to serving `false`, and has this single targeting rule:

* **IF** `TESTFLAG_enable-feature-x` **is one of** `true` (str) **SERVE** `true`

To test the app with the flag serving `true`, the test spec doesn't need to change the flag; it just sets a cookie in the automated browser. See [`cypress/e2e/ld-testing-demo/feature_x.cy.js`](cypress/e2e/ld-testing-demo/feature_x.cy.js) for the test code.

## Setup

1. Ensure you have these dependencies installed:
    * NodeJS, version 12.0 or greater
    * yarn
2. Clone this repository locally.
3. Within the repository folder, run `yarn` to install the dependencies.

## Running the app

Run:

    yarn start 

... to start the app server. The web app will be accessible at [http://localhost:3000/](http://localhost:3000/)

## Running the tests

Keep the app server running, and in a separate shell, start the Cypress app:

    yarn run cypress open

The Cypress test runner window should appear. Choose "E2E Testing", followed by the browser of your choice. You should then see the various specs listed; click on each to run it.

## Questions? Comments? Improvements?

Please file issues or pull requests on this repository, and I'll get to them when I can!

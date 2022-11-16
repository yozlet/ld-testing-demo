# Example of end-to-end automated tests with LaunchDarkly flags

This repository contains:

* A very simple web app, written in the Express web framework for NodeJS
* Some simple end-to-end browser tests, using the Cypress test automation framework

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

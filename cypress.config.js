const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 1000,
  viewportHeight: 400,
  viewportWidth: 400,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

const cucumber = require("cypress-cucumber-preprocessor").default;
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
    const options = {
        // send in the options from your webpack.config.js, so it works the same
        // as your app's code
        webpackOptions: require('../../webpack.config'),
        watchOptions: {},
    }

    on('file:preprocessor', webpackPreprocessor(options))
    on('file:preprocessor', cucumber());
};

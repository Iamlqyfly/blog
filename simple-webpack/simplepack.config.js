'use strict';

const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/entry.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  }
};
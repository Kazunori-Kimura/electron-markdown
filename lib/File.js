// File Class
"use strict";

class File {
  constructor(filename, filepath, data) {
    this.name = filename;
    this.path = filepath;
    this.data = data;
  }
}

module.exports = File;

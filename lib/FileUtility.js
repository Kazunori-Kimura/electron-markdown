// FileUtility.js
"use strict";
const remote = require("remote");
const fs = remote.require("fs");
const path = remote.require("path");
const glob = remote.require("glob");
const marked = remote.require("marked");

const File = require("./File");
const encoding = "utf-8";

module.exports = {
  current: () => {
    return process.cwd();
  },

  glob: (currentPath, pattern) => {
    const pwd = process.cwd();
    process.chdir(currentPath);
    const matches = glob.sync(pattern);
    process.chdir(pwd);

    const files = [];
    matches.forEach((item) => {
      files.push(new File(
        path.basename(item),
        path.resolve(currentPath, item),
        fs.readFileSync(item, { encoding })
      ));
    });

    return files;
  },

  read: (path) => {
    return fs.readFileSync(path, { encoding });
  },

  write: (path, data) => {
    fs.writeFileSync(path, data, { encoding });
  },

  parse: (markdown) => {
    return marked(markdown);
  }
};

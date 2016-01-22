// ViewModel.js
"use strict";
const remote = require("remote");
const path = remote.require("path");
const fs = remote.require("fs");
const glob = remote.require("glob");

// markdown file model
class File {
  constructor(filepath) {
    this.name = path.basename(filepath);
    this.path = path.resolve(filepath);
  }

  read(){
    const data = fs.readFileSync(this.path, { encoding: "utf-8" });
    return data;
  }

  save(data){
    fs.writeFileSync(this.path, data, { encoding: "utf-8" });
  }
}

// application view model
class App {
  constructor() {
    this.current = ko.observable(process.cwd());
    this.files = ko.observableArray([]);
    this.editor = null; //codemirror instance
  }

  load() {
    glob(`**/*.md`, (err, matches) => {
      matches.forEach((item) => {
        const f = new File(item);
        f.name = path.relative(this.current(), item);
        this.files.push(f);
      });
    });
  }

  setEditor(cm) {
    this.editor = cm;
  }

  select(file) {
    console.log(file.path);
    console.log(this.editor);
    if (this.editor != null) {
      this.editor.doc.setValue(file.read());
    }
  }
}

module.exports = App;

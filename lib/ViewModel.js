// ViewModel.js
"use strict";
const File = require("./File");
const FileUtil = require("./FileUtility");

// application view model
function App() {
  const self = this;

  self.current = ko.observable(FileUtil.current());
  self.files = ko.observableArray([]);
  self.preview = ko.observable("");
  self.selectedPath = ko.observable("");
  self.editor = null;

  self.load = function() {
    const items = FileUtil.glob(this.current(), "**/*.md");
    self.files.removeAll();
    items.forEach((item) => {
      self.files.push(item);
    });
  };

  self.select = function(file) {
    self.selectedPath(file.path);

    if (self.editor) {
      self.editor.setValue(file.data);
      self.preview(FileUtil.parse(file.data));
    }
  };

  self.isActive = function(file) {
    return self.selectedPath() == file.path;
  };
}

module.exports = App;

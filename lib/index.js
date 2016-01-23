// index.js
"use strict";
const remote = require("remote");
const ko = require("knockout"); //import * as ko from 'knockout';
const App = require("./lib/ViewModel.js");

window.addEventListener("load", () => {
  const app = new App();
  // codemirrorの表示
  app.editor = CodeMirror.fromTextArea(
    document.getElementById("code"),
    {
      mode: "gfm",
      theme: "zenburn",
      lineNumbers: true
    }
  );

  ko.applyBindings(app);
  app.load();
});

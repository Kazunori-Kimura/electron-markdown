// index.js
"use strict";
const remote = require("remote");
const ko = require("knockout"); //import * as ko from 'knockout';
const App = require("./lib/ViewModel.js");

let app = null;

window.addEventListener("load", () => {
  app = new App();
  ko.applyBindings(app);
  app.load();

  // codemirror
  const cm = CodeMirror.fromTextArea(
    document.getElementById("code"),
    {
      mode: "gfm",
      theme: "zenburn",
      lineNumbers: true
    }
  );
  app.setEditor(cm);

});

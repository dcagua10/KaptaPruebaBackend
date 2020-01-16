import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import "./main.html";
import App from "../imports/ui/App.js"
import "../imports/startup/accounts-config.js"

Meteor.startup(() => {
  render(<App/>, document.getElementById("target"));
}

);



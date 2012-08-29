/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const observers = require("api-utils/observer-service");
const core = require("api-utils/l10n/core");

const OPTIONS_DISPLAYED = "addon-options-displayed";

function onOptionsDisplayed(document, addonId) {
  let nodes = document.querySelectorAll('setting, button');
  for (let node of nodes) {
    if (!node.hasAttribute("pref-name"))
      continue;
    let name = node.getAttribute("pref-name");
    if (node.tagName == "setting") {
      let desc = core.get(name + "_description");
      if (desc)
        node.setAttribute("desc", desc);
      let title = core.get(name + "_title");
      if (title)
        node.setAttribute("title", title);
    }
    else if (node.tagName == "button") {
      let label = core.get(name + "_label");
      if (label)
        node.setAttribute("label", label);
    }
  }
}

observers.add(OPTIONS_DISPLAYED, onOptionsDisplayed);

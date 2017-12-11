const widgets = [];
const fs = require('fs-extra');
const path = require('path');

const widgetsDir = path.resolve(__dirname, 'widgets');
const loadWidget = async (name) => {
  const widget = require(path.resolve(widgetsDir, name, `${name}.json`));
  if (widget.template) {
    const template = await fs.readFile(path.resolve(widgetsDir, name, `${name}.tpl.html`));
    widget.template = template.toString();
  }

  // set default bond type (expression)
  widget.properties = (widget.properties || []).map(p => {
    p.bond = p.bond || 'expression';
    return p;
  });

  return widget;
};

module.exports = {

  customs: () => Promise.resolve(widgets),
  all: async () => {
    const widgets = await fs.readdir(widgetsDir);
    let promises = widgets.map(loadWidget);
    return Promise.all(promises);
  }



};

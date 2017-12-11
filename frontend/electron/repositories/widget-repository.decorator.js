const widgets = [];
const fs = require('fs-extra');
const path = require('path');

module.exports = {

  customs: () => Promise.resolve(widgets),
  all: async () => {
    let widgetsDir = path.resolve(__dirname, 'widgets');
    const widgets = await fs.readdir(widgetsDir);
    return widgets.map(f => require(path.resolve(widgetsDir, f, `${f}.json`)))
  }


};

const pages = [];
let lastSavedState = JSON.stringify({});

module.exports = {

  create: (artifact) => {
    artifact.id = artifact.name;
    artifact.data = {};
    artifact.assets = [];
    pages.push(artifact);
    return Promise.resolve(artifact);
  },

  all: () => Promise.resolve(pages),

  load: (id) => Promise.resolve({ data: pages.find(p => p.id === id) || {}}),

  needSave: () => false,

  setLastSavedState: (artifact) => {
    //stringify artifact is faster and then lighter than copying it
    lastSavedState = JSON.stringify(artifact);
  }

};

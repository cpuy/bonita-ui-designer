const pages = [];

module.exports = {

  create: (artifact) => {
    artifact.id = artifact.name;
    pages.push(artifact);
    return Promise.resolve(artifact);
  },

  all: () => Promise.resolve(pages),

  load: (id) => Promise.resolve({ data: pages.find(p => p.id === id) || {}})

};

module.exports =  {
  get: (type) => require(`./${type}-repository.decorator.js`)
};

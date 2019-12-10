var subscribeEditing = require("./editing");
var subscribeGeodata = require("./geodata");

function wss(io) {
  subscribeEditing(io.of("/editing"));
  subscribeGeodata(io.of("/geodata"));
  return wss;
}

module.exports = wss;

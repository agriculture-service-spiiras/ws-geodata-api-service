var fs = require("fs");
var path = require("path");
var store = require("../store")();

const events = {
  ASK_LAYER_OBJECTS: "ws_ask_layer_objects",
  SEND_LAYER_OBJECTS: "ws_send_layer_objects",
  LAYER_OBJECTS_NOT_FOUND: "ws_layer_objects_not_found"
};

const times = [];
let finishWriteTimes = false;
function catchTime(packet, next) {
  let oldTime = Date.now();
  if (times.length < 1000) {
    console.log(`Add ${times.length} times`);
    const curTime = Date.now();
    times.push(curTime - oldTime);
    oldTime = curTime;
    next();
  } else {
    if (!finishWriteTimes) {
      fs.writeFile(
        path.join(__dirname + "/requests.txt"),
        times,
        "utf8",
        function(err) {
          console.log(err);
          if (err) {
            next(err);
          }
        }
      );
      finishWriteTimes = true;
    }
    next();
  }
}

function subscribe(namespace) {
  namespace.on("connection", socket => {
    // socket.use(catchTime);
    socket.on(events.ASK_LAYER_OBJECTS, layerId => {
      const layer = store.getLayer(layerId);
      if (layer) {
        socket.emit(events.SEND_LAYER_OBJECTS, {
          id: layerId,
          objects: layer.objects
        });
        console.log(
          "request data for layer " +
            layerId +
            ": " +
            layer.objects[0].geometry.coordinates[0] +
            " / " +
            layer.objects[0].geometry.coordinates[1]
        );
      } else {
        socket.emit(events.LAYER_OBJECTS_NOT_FOUND, layerId);
      }
    });
  });
}

module.exports = subscribe;

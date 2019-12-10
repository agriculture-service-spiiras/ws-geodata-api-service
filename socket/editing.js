const events = {
  ADD_LAYER_OBJECT: "ws-add-layer-object",
  UPDATE_LAYER_OBJECTS: "ws-update-layer-objects",
  DELETE_LAYER_OBJECTS: "ws-delete-layer-objects",
  LAYER_UPDATED: "ws-layer-updated"
};

function subscribe(namespace) {
  namespace.on("connection", socket => {
    socket.on(events.ADD_LAYER_OBJECT, msg => {
      namespace.emit(LAYER_UPDATED, { status: "OK" });
    });
    socket.on(events.UPDATE_LAYER_OBJECTS, msg => {
      namespace.emit(LAYER_UPDATED, { status: "OK" });
    });
    socket.on(events.DELETE_LAYER_OBJECTS, msg => {
      namespace.emit(LAYER_UPDATED, { status: "OK" });
    });
  });
}

module.exports = subscribe;

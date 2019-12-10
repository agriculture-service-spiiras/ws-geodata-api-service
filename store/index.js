function createDataBase() {
  const track = [
    [-108.022755, 38.794641],
    [-108.022728, 38.794646],
    [-108.022703, 38.794647],
    [-108.02267, 38.794644],
    [-108.022634, 38.794653],
    [-108.022607, 38.794657],
    [-108.022583, 38.794668],
    [-108.02256, 38.794673],
    [-108.022519, 38.794684],
    [-108.022497, 38.794698],
    [-108.022474, 38.794714],
    [-108.022457, 38.794731],
    [-108.022422, 38.794753],
    [-108.022406, 38.794766],
    [-108.022373, 38.794785],
    [-108.022359, 38.794807],
    [-108.022354, 38.794822],
    [-108.022346, 38.794839],
    [-108.02234, 38.794858],
    [-108.022335, 38.794878],
    [-108.02233, 38.794894],
    [-108.022317, 38.794915],
    [-108.022298, 38.794928],
    [-108.022288, 38.794942],
    [-108.022271, 38.794955],
    [-108.022247, 38.794985],
    [-108.02224, 38.794999],
    [-108.022226, 38.795032],
    [-108.022224, 38.795047],
    [-108.022225, 38.795068],
    [-108.022227, 38.795087],
    [-108.022229, 38.795105],
    [-108.022235, 38.795127],
    [-108.02224, 38.795154],
    [-108.022242, 38.795178]
  ];
  let position = [];

  const store = [
    {
      id: "real_data:detect_info_2-line",
      name: "Plane tracks",
      objects: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: track
          }
        }
      ]
    },
    {
      id: "real_data:detect_info_2-point",
      name: "Plane position",
      objects: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: position
          }
        }
      ]
    }
  ];

  let counter = 0;
  return {
    getLayers: function() {
      return store.map(function(layer, index) {
        return layer.id;
      });
    },
    getLayer: function(id) {
      if (id === "real_data:detect_info_2-point") {
        if (counter < track.length) {
          position = Object.assign(position, track[counter]);
          counter = counter + 1;
        } else {
          counter = 0;
        }
      }

      const foundLayer = store.find(function(layer) {
        return layer.id === id;
      });
      if (!foundLayer) {
        return false;
      }

      return Object.assign({}, foundLayer);
    },
    createLayer: function(id) {
      return false;
    },
    updateLayer: function(id, layer) {
      return false;
    }
  };
}

module.exports = createDataBase;

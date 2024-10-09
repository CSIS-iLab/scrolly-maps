mapboxgl.accessToken = config.accessToken;

// Sets the title text - using config.js doesn't allow using a span in the text, which we need to change the color of 'Taiwan Strait'. Need to wrap in the event listener to ensure the DOM is loaded before changing the text, otherwise the text will be undefined and this won't work.
document.addEventListener("DOMContentLoaded", function () {
  const headerTitle = document.querySelector("#header h1");
  headerTitle.innerHTML =
    "Crossroad of Commerce: How the <span style='color:#68F7A3;'>Taiwan Strait </span>Propels the Global Economy";
  console.log(headerTitle.innerText);
});

var layerTypes = {
  fill: ["fill-opacity"],
  line: ["line-opacity"],
  circle: ["circle-opacity", "circle-stroke-opacity"],
  symbol: ["icon-opacity", "text-opacity"],
  raster: ["raster-opacity"],
  "fill-extrusion": ["fill-extrusion-opacity"],
  heatmap: ["heatmap-opacity"],
};

var alignments = {
  left: "lefty",
  center: "centered",
  right: "righty",
  full: "fully",
};

function getLayerPaintType(layer) {
  var layerType = map.getLayer(layer).type;
  return layerTypes[layerType];
}

function setLayerOpacity(layer) {
  var paintProps = getLayerPaintType(layer.layer);
  paintProps.forEach(function (prop) {
    var options = {};
    if (layer.duration) {
      var transitionProp = prop + "-transition";
      options = { duration: layer.duration };
      map.setPaintProperty(layer.layer, transitionProp, options);
    }
    map.setPaintProperty(layer.layer, prop, layer.opacity, options);
  });
}

var story = document.getElementById("story");

// Title
var header = document.createElement("div");
if (config.title) {
  var titleText = document.createElement("h1");
  titleText.innerText = config.title;
  header.appendChild(titleText);
}
if (header.innerText.length > 0) {
  header.classList.add(config.theme);
  header.setAttribute("id", "header");
  story.appendChild(header);
}

// Rest of story
var features = document.createElement("div");
features.setAttribute("id", "features");
story.appendChild(features);

// config for future refactor - from blockade maps
config.chapters.forEach((record, idx) => {
  var container = document.createElement("div");
  var chapter = document.createElement("div");

  if (record.title) {
    var title = document.createElement("h3");
    title.innerText = record.title;
    chapter.appendChild(title);
  }

  if (record.image) {
    var image = new Image();
    image.src = record.image;
    chapter.appendChild(image);
  }

  if (record.description) {
    var story = document.createElement("p");
    story.innerHTML = record.description;
    chapter.appendChild(story);
  }

  container.setAttribute("id", record.id);
  container.classList.add("step");
  if (idx === 0) {
    container.classList.add("active");
  }

  chapter.classList.add(config.theme);
  container.appendChild(chapter);
  container.classList.add(alignments[record.alignment] || "centered");
  if (record.hidden) {
    container.classList.add("hidden");
  }
  features.appendChild(container);
});

const transformRequest = (url) => {
  const hasQuery = url.indexOf("?") !== -1;
  const suffix = hasQuery
    ? "&pluginName=scrollytellingV2"
    : "?pluginName=scrollytellingV2";
  return {
    url: url + suffix,
  };
};

var map = new mapboxgl.Map({
  container: "map",
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  bearing: config.chapters[0].location.bearing,
  pitch: config.chapters[0].location.pitch,
  interactive: false,
  transformRequest: transformRequest,
  projection: config.projection,
});

/* ------------------------------------------------------ */
/*      Scrolly part of map - enter and exit behavior     */
/* ------------------------------------------------------ */
var scroller = scrollama();
// used to keep it from exiting/entering chapters out of order
var lastEnteredChapter = null;
var lastExitedChapter = null;

map.on("load", function () {
  // Automatically start the line animation on map load
  if (window.scrollY === 0) {
    startLineAnimation();
  }

  // Scrolling control
  scroller
    .setup({
      step: ".step",
      offset: 0.5,
      progress: true,
    })
    .onStepEnter(async (response) => {
      var current_chapter = config.chapters.findIndex(
        (chap) => chap.id === response.element.id
      );
      var chapter = config.chapters[current_chapter];

      // Prevent entering the same chapter multiple times
      if (lastEnteredChapter !== chapter.id) {
        // Exiting the last chapter before entering the new one
        if (lastEnteredChapter !== null) {
          var lastChapterIndex = config.chapters.findIndex(
            (chap) => chap.id === lastEnteredChapter
          );
          var lastChapter = config.chapters[lastChapterIndex];
          if (lastChapter.onChapterExit.length > 0) {
            lastChapter.onChapterExit.forEach(setLayerOpacity);
          }
          document.getElementById(lastChapter.id).classList.remove("active");
          lastExitedChapter = lastChapter.id;
        }
        lastEnteredChapter = chapter.id;
        response.element.classList.add("active");
        map[chapter.mapAnimation || "flyTo"](chapter.location);

        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(setLayerOpacity);
        }
        if (chapter.callback) {
          window[chapter.callback]();
        }

        /* ------- add and remove based on chapter ------ */
        if (chapter.id === "chapter0") {
          startLineAnimation();
          stopGlobeSpin();
        }

        if (chapter.id === "chapter1") {
          spinGlobe();
          removePulsingDotLayer();
          removeLineAnimation();
        }

        if (chapter.id === "chapter2") {
          removePulsingDotLayer();
        }

        if (chapter.id === "chapter3") {
          stopGlobeSpin();
          addPulsingDots();
        }

        if (chapter.id === "chapter4") {
          removeRadarLayer();
          removePulsingDotLayer();
          removeGIFstroke();
          removeGifTitle();
        }

        if (chapter.id === "chapter5") {
          addRadarLayer();
          addGIFstroke();
          gifTitle();
          removePulsingDotLayer_Taiwan();
        }

        if (chapter.id === "chapter6") {
          removeRadarLayer();
          removeGIFstroke();
          removeGifTitle();
          addPulsingDots_Taiwan();
        }
      }
    })
    .onStepExit((response) => {
      var chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      response.element.classList.remove("active");
      if (chapter.onChapterExit.length > 0) {
        chapter.onChapterExit.forEach(setLayerOpacity);
      }
    });
});

/* ------------------------------------------------------ */
/*                    Custom Functions                    */
/* ------------------------------------------------------ */
// ADDING ANIMATED MARKERS
function addPulsingDots() {
  const size = 150;

  // This implements `StyleImageInterface` to draw a pulsing dot icon on the map.
  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map, get the rendering context for the map canvas.
    onAdd: function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },

    // Call once before every frame where the icon will be used.
    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context;

      // Draw the outer circle.
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(247, 93, 85, ${1 - t})`;
      context.fill();

      // Draw the inner circle.
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(247, 93, 85, 0.3)";
      context.strokeStyle = "white";
      context.lineWidth = 2 + 2 * (1 - t);
      context.fill();
      context.stroke();

      // Update this image's data with data from the canvas.
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // Continuously repaint the map for smooth animation.
      map.triggerRepaint();

      return true; // Inform the map that the image was updated.
    },
  };

  // Add pulsing dots to the map
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

  map.addSource("dot-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [56.48880982607736, 26.614282223383185],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [43.40841353751088, 12.55224960147953],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [32.53357081010077, 30.084823864162303],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [101.27816953215915, 2.493127863055591],
            type: "Point",
          },
        },
      ],
    },
  });

  map.addLayer({
    id: "layer-with-pulsing-dot",
    type: "symbol",
    source: "dot-point",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });
}

//REMOVING ANIMATED MARKERS
function removePulsingDotLayer() {
  // Check if the layer exists before attempting to remove it
  if (map.getLayer("layer-with-pulsing-dot")) {
    map.removeLayer("layer-with-pulsing-dot");
  }

  // Check if the source exists before attempting to remove it
  if (map.getSource("dot-point")) {
    map.removeSource("dot-point");
  }
}

// ADDING ANIMATED MARKERS for TAIWAN LAST PARAGRAPH
function addPulsingDots_Taiwan() {
  const size = 250;

  // This implements `StyleImageInterface` to draw a pulsing dot icon on the map.
  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map, get the rendering context for the map canvas.
    onAdd: function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },

    // Call once before every frame where the icon will be used.
    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context;

      // Draw the outer circle.
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(247, 93, 85, ${1 - t})`;
      context.fill();

      // Draw the inner circle.
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(247, 93, 85, 0.3)";
      context.strokeStyle = "white";
      context.lineWidth = 2 + 2 * (1 - t);
      context.fill();
      context.stroke();

      // Update this image's data with data from the canvas.
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // Continuously repaint the map for smooth animation.
      map.triggerRepaint();

      return true; // Inform the map that the image was updated.
    },
  };

  // Add pulsing dots to the map
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

  map.addSource("dot-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [119.57893, 24.44004],
            type: "Point",
          },
        },
      ],
    },
  });

  map.addLayer({
    id: "layer-with-pulsing-dot",
    type: "symbol",
    source: "dot-point",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });
}

//REMOVING ANIMATED MARKERS for TAIWAN LAST PARAGRAPH
function removePulsingDotLayer_Taiwan() {
  // Check if the layer exists before attempting to remove it
  if (map.getLayer("layer-with-pulsing-dot")) {
    map.removeLayer("layer-with-pulsing-dot");
  }

  // Check if the source exists before attempting to remove it
  if (map.getSource("dot-point")) {
    map.removeSource("dot-point");
  }
}
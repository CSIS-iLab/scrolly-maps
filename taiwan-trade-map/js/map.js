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

//ADDING THE POLYGON ANIMATION
const polygonCoordinates = [
  [119.7732, 25.8095],
  [121.0269, 25.0782],
  [119.9757, 23.5835],
  [118.5919, 24.4556],
  [119.7732, 25.8095], // Closing the polygon
];

let geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  ],
};

const speedFactor = 0.03; // Adjust for speed
let animation;
let progress = 0; // track progress through the points

// Function to start the line animation
function startLineAnimation() {
  if (!map.getSource("line")) {
    map.addSource("line", {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: "line-animation",
      type: "line",
      source: "line",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#68f7a3",
        "line-width": 6,
        "line-opacity": 1,
      },
    });

    animateLine();
  }
}

function interpolatePoints(start, end, t) {
  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t,
  ];
}

// Animation function
function animateLine() {
  const numSegments = polygonCoordinates.length - 1;
  const totalDistance = numSegments; // total number of segments
  const segmentProgress = (progress * speedFactor) % totalDistance; // progress through segments

  const currentSegmentIndex = Math.floor(segmentProgress);
  const nextSegmentIndex = currentSegmentIndex + 1;
  const segmentFraction = segmentProgress - currentSegmentIndex;

  if (nextSegmentIndex < polygonCoordinates.length) {
    const startPoint = polygonCoordinates[currentSegmentIndex];
    const endPoint = polygonCoordinates[nextSegmentIndex];
    const interpolatedPoint = interpolatePoints(
      startPoint,
      endPoint,
      segmentFraction
    );

    geojson.features[0].geometry.coordinates.push(interpolatedPoint);
    map.getSource("line").setData(geojson);

    progress += 1; // Adjust based on speed
  } else {
    // Reset once the polygon path is complete
    geojson.features[0].geometry.coordinates = [];
    progress = 0;
  }

  animation = requestAnimationFrame(animateLine);
}

// Function to remove the line animation and stop the animation
function removeLineAnimation() {
  if (animation) {
    cancelAnimationFrame(animation); // Stop the animation
  }
  if (map.getLayer("line-animation")) {
    map.removeLayer("line-animation"); // Remove the layer
  }
  if (map.getSource("line")) {
    map.removeSource("line"); // Remove the source
  }
  geojson.features[0].geometry.coordinates = []; // Clear the coordinates
  progress = 0; // Reset progress
}

map.on("load", () => {
  // Automatically start the line animation on map load
  startLineAnimation();
});

//ADDING THE START POLYGON

function addTaiwanStraitPolygon() {
  // Add a data source containing GeoJSON data.
  map.addSource("taiwanStrait", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [119.7732, 25.8095], // Correct order: [longitude, latitude]
            [121.0269, 25.0782],
            [119.9757, 23.5835],
            [118.5919, 24.4556],
            [119.7732, 25.8095], // Close the polygon (last point equals first)
          ],
        ],
      },
    },
  });

  // Add a new layer to visualize the polygon.
  map.addLayer({
    id: "taiwanStrait",
    type: "fill",
    source: "taiwanStrait", // reference the data source
    layout: {},
    paint: {
      "fill-color": "#68f7a3", // teal color fill
      "fill-opacity": 0.2,
    },
  });

  // Add a teal outline around the polygon.
  map.addLayer({
    id: "outline",
    type: "line",
    source: "taiwanStrait",
    layout: {},
    paint: {
      "line-color": "#68f7a3",
      "line-width": 3,
    },
  });
}

//REMOVING THE START POLYGON

function removeTaiwanStraitPolygon() {
  // Check if both layers exist and remove them
  if (map.getLayer("taiwanStrait")) {
    map.removeLayer("taiwanStrait");
  }
  if (map.getLayer("outline")) {
    map.removeLayer("outline");
  }

  // Remove the source after layers are removed
  if (map.getSource("taiwanStrait")) {
    map.removeSource("taiwanStrait");
  }
}

//ADDING & REMOVING THE GIF's TITLE
function gifTitle() {
  const popup = new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: false,
    className: "style-popup",
  })
    .setLngLat([114.8, 24.9489])
    .setHTML(
      '<h1 style="font-size:2.8em;">Marittime Traffic Timelapse, 2023</h1>'
    )
    .addTo(map);
}

function removeGifTitle() {
  const popups = document.getElementsByClassName("mapboxgl-popup");
  if (popups.length) {
    popups[0].remove(); // Remove the first popup (or target the specific one if needed)
  }
}

//ADDING THE GIF BORDER
function addGIFstroke() {
  map.addSource("gifstroke", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [113.211, 25.782],
            [123.213, 25.782],
            [123.213, 21.579],
            [113.211, 21.579],
            [
              113.211,
              25.782, // Close the polygon (repeat first point)
            ],
          ],
        ],
      },
    },
  });

  // Add a teal outline around the polygon.
  map.addLayer({
    id: "gifstroke",
    type: "line",
    source: "gifstroke",
    layout: {},
    paint: {
      "line-color": "#68f7a3",
      "line-width": 5,
    },
  });
}

//REMOVING THE GIF BORDER
function removeGIFstroke() {
  // Check if both layers exist and remove them
  if (map.getLayer("gifstroke")) {
    map.removeLayer("gifstroke");
  }
  if (map.getLayer("gifstroke")) {
    map.removeLayer("gifstroke");
  }

  // Remove the source after layers are removed
  if (map.getSource("gifstroke")) {
    map.removeSource("gifstroke");
  }
}

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

// ADDING THE GIF

const frameCount = 12;
let currentImage = 1;

function getPath() {
  return `https://res.cloudinary.com/csisideaslab/image/upload/v1728321858/New_gif${currentImage}.png`;
}

function addRadarLayer() {
  // Check if the source already exists before adding it
  if (!map.getSource("radar")) {
    map.addSource("radar", {
      type: "image",
      url: getPath(),
      coordinates: [
        [113.211, 25.782],
        [123.213, 25.782],
        [123.213, 21.579],
        [113.211, 21.579],
      ],
    });
  }

  // Check if the layer already exists before adding it
  if (!map.getLayer("radar-layer")) {
    map.addLayer({
      id: "radar-layer",
      type: "raster",
      source: "radar",
      paint: {
        "raster-fade-duration": 2,
      },
    });
  }

  // Start the image sequence update (GIF animation)
  const gifInterval = setInterval(() => {
    currentImage = (currentImage + 1) % frameCount;
    map.getSource("radar").updateImage({ url: getPath() });
  }, 500); // Update image every 200ms
}

//REMOVING THE GIF
function removeRadarLayer() {
  // Check if the layer exists before attempting to remove it
  if (map.getLayer("radar-layer")) {
    map.removeLayer("radar-layer");
  }

  // Check if the source exists before attempting to remove it
  if (map.getSource("radar")) {
    map.removeSource("radar");
  }
}

//SPIN GLOBE & STOP SPIN

function spinGlobe() {
  const secondsPerRevolution = 220;
  // Above zoom level 5, do not rotate.
  const maxSpinZoom = 5;
  // Rotate at intermediate speeds between zoom levels 3 and 5.
  const slowSpinZoom = 3;
  let userInteracting = false;
  spinInterval = setInterval(() => {
    const zoom = map.getZoom();
    if (!userInteracting && zoom < maxSpinZoom) {
      let distancePerSecond = 2600 / secondsPerRevolution;
      if (zoom > slowSpinZoom) {
        // Slow spinning at higher zoom levels
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        distancePerSecond *= zoomDif;
      }
      const center = map.getCenter();
      center.lng -= distancePerSecond;

      // Smooth animation to spin the globe
      map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
  }, 1000); // Repeat every second for smooth spinning
}

function stopGlobeSpin() {
  clearInterval(spinInterval); // Stops the spinning by clearing the interval
}

//COMBINED FUNCTIONS!

//Combined functions for page load/first scroll
function first_callback() {
  startLineAnimation();
  animateLine();
  stopGlobeSpin();
}

//Combined functions for spin + remove poligon
function second_callback() {
  spinGlobe();
  removePulsingDotLayer();
  removeLineAnimation();
}

function third_callback() {
  removePulsingDotLayer();
}

function fourth_callback() {
  stopGlobeSpin();
  addPulsingDots();
}

function fifth_callback() {
  removeRadarLayer();
  removePulsingDotLayer();
  removeGIFstroke();
  removeGifTitle();
}

function sixth_callback() {
  addRadarLayer();
  addGIFstroke();
  gifTitle();
  removePulsingDotLayer_Taiwan();
}

function sevent_callback() {
  removeRadarLayer();
  removeGIFstroke();
  removeGifTitle();
  addPulsingDots_Taiwan();
}

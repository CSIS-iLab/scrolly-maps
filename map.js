mapboxgl.accessToken = config.accessToken;

// Sets the title text - using config.js doesn't allow using a span in the text, which we need to change the color of 'Taiwan Strait'. Need to wrap in the event listener to ensure the DOM is loaded before changing the text, otherwise the text will be undefined and this won't work.
document.addEventListener("DOMContentLoaded", function () {
  const headerTitle = document.querySelector("#header h1");
  headerTitle.innerHTML =
    "Crossroad of Commerce: <br><span style='font-size:0.6em; font-weight: 400; line-height:10%;'>How the <span style='color:#68F7A3;'>Taiwan Strait </span>Propels the Global Economy<hr></span><div style='font-size:0.3em; font-weight: 400; line-height:1.2em; font-family: Jost, sans-serif;'>Part 3 of a ChinaPower series</div><div style='font-size:0.25em; font-weight: 300; line-height:3em; font-family: Jost, sans-serif; margin-top: -5px;'>October 10, 2024</div>";
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
/*              zoom and location for mobile              */
/* ------------------------------------------------------ */
// Track whether we're on mobile
let isMobile = window.matchMedia("(max-width: 750px)").matches;

function updateChapterLocations(isMobile) {
  console.log("mobile");
  config.chapters.forEach((chapter) => {
    if (isMobile) {
      if (chapter.id === "chapter0") {
        chapter.location.center = [120.77621, 23.62328];
      }
      if (chapter.id === "chapter1") {
        chapter.location.center = [120.77621, 23.62328];
      }
      if (chapter.id === "chapter2") {
        chapter.location.zoom = 6.5;
        chapter.location.center = [121.01047, 23.84028];
      }
      if (chapter.id === "chapter3") {
        chapter.location.zoom = 6.8;
        chapter.location.center = [120.23559, 22.5935];
      }
      if (chapter.id === "chapter4") {
        chapter.location.zoom = 6.8;
        chapter.location.center = [120.56382, 22.52218];
      }
      if (chapter.id === "chapter5") {
        chapter.location.zoom = 8;
        chapter.location.center = [120.24817, 24.04383];
      }
      if (chapter.id === "chapter6") {
        chapter.location.zoom = 6.66;
        chapter.location.center = [120.24417, 23.52269];
      }
    }
  });
}

// check for mobile width to update chapter locations
const mediaQueryChapters = window.matchMedia("(max-width: 750px)");
mediaQueryChapters.addEventListener("change", (e) => {
  updateChapterLocations(e.matches);
});
updateChapterLocations(mediaQueryChapters.matches);

/* ------------------------------------------------------ */
/*      Scrolly part of map - enter and exit behavior     */
/* ------------------------------------------------------ */
var scroller = scrollama();
// used to keep it from exiting/entering chapters out of order
var lastEnteredChapter = null;
var lastExitedChapter = null;

// Coordinate arrays for pulsing dots
const pulsingDotsCoordinatesChapter3 = [
  [56.48880982607736, 26.614282223383185],
  [43.40841353751088, 12.55224960147953],
  [32.53357081010077, 30.084823864162303],
  [101.27816953215915, 2.493127863055591],
];

const pulsingDotsCoordinatesTaiwan = [[119.57893, 24.44004]];

map.on("load", function () {
  // Automatically start the line animation on map load
  if (window.scrollY === 0) {
    startLineAnimation();
  }

  // Scrolling control
  scroller
    .setup({
      step: ".step",
      offset: 1,
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
        if (isMobile) {
          if (chapter.id === "chapter0") {
            startLineAnimation();
          }

          if (chapter.id === "chapter1") {
            removePulsingDotLayer();
            removeLineAnimation();
          }

          if (chapter.id === "chapter2") {
            removePulsingDotLayer();
          }

          if (chapter.id === "chapter3") {
            addPulsingDots(pulsingDotsCoordinatesChapter3, 150); // Size for chapter 3
          }
          if (chapter.id === "chapter4") {
            removeRadarLayer();
            removePulsingDotLayer();
            removeGIFstroke();
          }
          if (chapter.id === "chapter5") {
            addRadarLayer();
            addGIFstroke();;
            removePulsingDotLayer();
          }
          if (chapter.id === "chapter6") {
            removeRadarLayer();
            removeGIFstroke();
            addPulsingDots(pulsingDotsCoordinatesTaiwan, 250); // Size for Taiwan
          }
        } else {
          if (chapter.id === "chapter0") {
            startLineAnimation();
          }

          if (chapter.id === "chapter1") {
            removePulsingDotLayer();
            removeLineAnimation();
          }

          if (chapter.id === "chapter2") {
            removePulsingDotLayer();
          }

          if (chapter.id === "chapter3") {
            addPulsingDots(pulsingDotsCoordinatesChapter3, 150); // Size for chapter 3
          }
          if (chapter.id === "chapter4") {
            removeRadarLayer();
            removePulsingDotLayer();
          }
          if (chapter.id === "chapter5") {
            addRadarLayer();
            addGIFstroke();;
            removePulsingDotLayer();
          }
          if (chapter.id === "chapter6") {
            removeRadarLayer();
            addPulsingDots(pulsingDotsCoordinatesTaiwan, 250); // Size for Taiwan
          }
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
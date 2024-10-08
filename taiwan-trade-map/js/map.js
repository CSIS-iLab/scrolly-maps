var initLoad = true;
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
var features = document.createElement("div");
features.setAttribute("id", "features");

var header = document.createElement("div");

if (config.title) {
  var titleText = document.createElement("h1");
  titleText.innerText = config.title;
  header.appendChild(titleText);
}

if (config.subtitle) {
  var subtitleText = document.createElement("h2");
  subtitleText.innerText = config.subtitle;
  header.appendChild(subtitleText);
}

if (config.byline) {
  var bylineText = document.createElement("p");
  bylineText.innerText = config.byline;
  header.appendChild(bylineText);
}

if (header.innerText.length > 0) {
  header.classList.add(config.theme);
  header.setAttribute("id", "header");
  story.appendChild(header);
}

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

story.appendChild(features);

mapboxgl.accessToken = config.accessToken;

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

if (config.showMarkers) {
  var marker = new mapboxgl.Marker({ color: config.markerColor });
  marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();

function addTaiwanStraitPolygon() {
  // Add a data source containing GeoJSON data.
  map.addSource("taiwanStrait", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        // These coordinates outline Maine.
        coordinates: [
          [
            [119.34324822801551, 21.31892348266993],
            [119.8246062804833, 21.89432233668778],
            [120.16843346081743, 22.681709396940548],
            [120.09966802475066, 22.863998495022898],
            [119.99651987065045, 23.022312285894685],
            [119.99651987065045, 23.16463598337114],
            [120.04809394769967, 23.298914073743106],
            [120.09107234524186, 23.456714922808032],
            [120.09107234524186, 23.645827225658323],
            [120.1168593837665, 23.77175058437166],
            [120.21141185835802, 23.850390872671753],
            [120.30596433295113, 24.023231470527065],
            [120.35753841000042, 24.10956481715536],
            [120.55523903869215, 24.446490049539022],
            [120.67557855180996, 24.61070902907815],
            [120.74434398787673, 24.735683787087154],
            [120.82170510345077, 24.766907891648955],
            [120.89906621902634, 24.930705505306207],
            [120.97642733460185, 25.063144408865938],
            [121.10536252722687, 25.140982878597526],
            [121.32885019444319, 25.17210438589923],
            [121.44059402805215, 25.304282097044407],
            [122.13684406822756, 26.17147513692983],
            [120.23719889688425, 26.825347225666548],
            [120.26298593540895, 26.60267994775083],
            [120.09966802475066, 26.425772875763116],
            [119.98792419114159, 26.43347015003141],
            [119.90196739605886, 26.310252148500354],
            [119.79022356244991, 26.233174263678592],
            [119.71286244687434, 26.14061331921819],
            [119.77303220343242, 26.071144402898042],
            [119.79022356244991, 26.001634251654735],
            [119.74724516490767, 25.877959077174395],
            [119.70426676736554, 25.808334794056933],
            [119.81601060097461, 25.723182859576085],
            [119.99651987065045, 25.69220338527829],
            [119.94494579359946, 25.506157508724954],
            [119.83320195999198, 25.335361826597563],
            [119.6784797288409, 25.25764755593731],
            [119.57533157474069, 25.249873390054077],
            [119.57533157474069, 25.140982878597526],
            [119.43780070260692, 25.148763999642213],
            [119.31746118949081, 25.13320126159404],
            [119.24010007391524, 25.03978321349595],
            [119.11976056079908, 24.977464942723756],
            [119.01661240669887, 24.891725751072116],
            [118.9134642525986, 24.813729330093352],
            [118.84469881653177, 24.70445184123038],
            [118.7673377009562, 24.579445791285167],
            [118.664189546856, 24.438664745566257],
            [118.56104139275578, 24.446490049539022],
            [118.5180629952136, 24.360385010887512],
            [118.37193644357274, 24.344723245633205],
            [118.23440557143908, 24.344723245633205],
            [118.21721421242154, 24.258548933018318],
            [118.11406605832127, 24.117410420724468],
            [117.95074814766298, 23.991823132724747],
            [117.84759999356277, 23.81894047348996],
            [117.75304751897119, 23.763883937176928],
            [117.65849504437983, 23.69306272529164],
            [117.56394256978825, 23.69306272529164],
            [117.50377281322858, 23.5591845290203],
            [117.39202897962116, 23.480368828095806],
            [117.29747650502975, 23.49613574220625],
            [117.25449810748756, 23.33838189134086],
            [117.10837155584517, 23.314702607016486],
            [117.0310104402696, 23.24363945721096],
            [116.88488388862874, 23.20414355768783],
            [116.7301616574776, 23.14882968813839],
            [116.7043746189529, 23.046043365188027],
            [116.57543942632799, 22.8719185787905],
            [119.34324822801551, 21.31892348266993],
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
      "fill-color": "#68f7a3", // blue color fill
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

function removeTaiwanStraitPolygon() {
  if (map.getLayer("taiwanStrait")) {
    map.removeLayer("taiwanStrait");
    map.removeLayer("outline");
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

// ADDING THE first GIF

const frameCount_second = 21;
let currentImage_second = 1;

function getPath_second() {
  return `https://res.cloudinary.com/csisideaslab/image/upload/v1728328419/area${currentImage_second}.png`;
}

function addPolygonLayer() {
  // Check if the source already exists before adding it
  if (!map.getSource("polygon")) {
    map.addSource("polygon", {
      type: "image",
      url: getPath(),
      coordinates: [
        [25.8095, 119.7732],
        [25.0782, 121.0269],
        [23.5835, 119.9757],
        [24.4556, 118.5919],
      ],
    });
  }

  // Check if the layer already exists before adding it
  if (!map.getLayer("polygon-layer")) {
    map.addLayer({
      id: "polygon-layer",
      type: "raster",
      source: "polygon",
      paint: {
        "raster-fade-duration": 2,
      },
    });
  }

  // Start the image sequence update (GIF animation)
  const gifInterval_second = setInterval(() => {
    currentImage_second = (currentImage_second + 1) % frameCount_second;
    map.getSource("polygon").updateImage({ url: getPath_second() });
  }, 500); // Update image every 200ms
}

//REMOVING THE GIF
function removePolygonLayer() {
  // Check if the layer exists before attempting to remove it
  if (map.getLayer("polygon-layer")) {
    map.removeLayer("polygon-layer");
  }

  // Check if the source exists before attempting to remove it
  if (map.getSource("polygon")) {
    map.removeSource("polygon");
  }
}

//Using 3d Terrain, default by tenmplate
map.on("load", function () {
  if (config.use3dTerrain) {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

    // add a sky layer that will show when the map is highly pitched
    map.addLayer({
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0.0, 0.0],
        "sky-atmosphere-sun-intensity": 15,
      },
    });
  }

  // setup the instance, pass callback functions
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

      response.element.classList.add("active");
      map[chapter.mapAnimation || "flyTo"](chapter.location);

      if (config.showMarkers) {
        marker.setLngLat(chapter.location.center);
      }
      if (chapter.onChapterEnter.length > 0) {
        chapter.onChapterEnter.forEach(setLayerOpacity);
      }
      if (chapter.callback) {
        window[chapter.callback]();
      }
      if (chapter.rotateAnimation) {
        map.once("moveend", () => {
          const rotateNumber = map.getBearing();
          map.rotateTo(rotateNumber + 180, {
            duration: 30000,
            easing: function (t) {
              return t;
            },
          });
        });
      }
      if (config.auto) {
        var next_chapter = (current_chapter + 1) % config.chapters.length;
        map.once("moveend", () => {
          document
            .querySelectorAll(
              '[data-scrollama-index="' + next_chapter.toString() + '"]'
            )[0]
            .scrollIntoView();
        });
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

  if (config.auto) {
    document.querySelectorAll('[data-scrollama-index="0"]')[0].scrollIntoView();
  }
});

//SPIN GLOBE

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

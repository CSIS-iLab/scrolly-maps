var initLoad = true;
var layerTypes = {
  fill: ["fill-opacity"],
  line: ["line-opacity"],
  circle: ["circle-opacity", "circle-stroke-opacity"],
  symbol: ["icon-opacity", "text-opacity"],
  raster: ["raster-opacity"],
  "fill-extrusion": ["fill-extrusion-opacity"],
};

var alignments = {
  'left': 'lefty',
  'center': 'centered',
  'right': 'righty'
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
    var title = document.createElement("h2");
    title.innerText = record.title;
    chapter.appendChild(title);
  }

  var content = document.createElement("div"); // Create the content div
  content.classList.add("content"); // Add the content class

  if (record.subtitle) {
    var subtitle = document.createElement("h3");
    subtitle.innerText = record.subtitle;
    subtitle.classList.add("subtitle");
    content.appendChild(subtitle); // Add subtitle to content
  }

  if (record.description) {
    var desc = document.createElement("p");
    desc.innerHTML = record.description;
    desc.classList.add("desc");
    content.appendChild(desc); // Add description to content
  }

  // Add the lists
  var listContainer = document.createElement("ul"); // Create a list container

  if (record.list1) {
    var listItem1 = document.createElement("li");
    listItem1.innerText = record.list1;
    listItem1.classList.add("list");
    listContainer.appendChild(listItem1);
  }

  if (record.list2) {
    var listItem2 = document.createElement("li");
    listItem2.innerText = record.list2;
    listItem2.classList.add("list");
    listContainer.appendChild(listItem2);
  }

  if (record.list3) {
    var listItem3 = document.createElement("li");
    listItem3.innerText = record.list3;
    listItem3.classList.add("list");
    listContainer.appendChild(listItem3);
  }

  if (record.list4) {
    var listItem4 = document.createElement("li");
    listItem4.innerText = record.list4;
    listItem4.classList.add("list");
    listContainer.appendChild(listItem4);
  }

  if (listContainer.children.length > 0) {
    content.appendChild(listContainer); // Add listContainer to content if there's at least one list item
  }

  if (record.image) {
    var image = new Image();
    image.src = record.image;
    content.appendChild(image); // Add image to content
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

  chapter.appendChild(content); // Append content to chapter
  features.appendChild(container);
});


story.appendChild(features);

var footer = document.createElement("div");

if (config.footer) {
  var footerText = document.createElement("p");
  footerText.innerHTML = config.footer;
  footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
  footer.classList.add(config.theme);
  footer.setAttribute("id", "footer");
  story.appendChild(footer);
}

mapboxgl.accessToken = config.accessToken;

const transformRequest = (url) => {
  const hasQuery = url.indexOf("?") !== -1;
  const suffix = hasQuery ? "&pluginName=journalismScrollytelling" : "?pluginName=journalismScrollytelling";
  return {
      url: url + suffix
  }
}

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

// Create a inset map if enabled in config.js
if (config.inset) {
  var insetMap = new mapboxgl.Map({
    container: "mapInset", // container id
    style: "mapbox://styles/mapbox/dark-v10", //hosted style id
    center: config.chapters[0].location.center,
    // Hardcode above center value if you want insetMap to be static.
    zoom: 3, // starting zoom
    hash: false,
    interactive: false,
    attributionControl: false,
    //Future: Once official mapbox-gl-js has globe view enabled,
    //insetmap can be a globe with the following parameter.
    //projection: 'globe'
  });
}

if (config.showMarkers) {
  var marker = new mapboxgl.Marker({ color: config.markerColor });
  marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();

map.on("load", function () {
  // setup the instance, pass callback functions
  scroller
    .setup({
      step: ".step",
      offset: 0.5,
      progress: true,
    })
    .onStepEnter(async (response) => {
          // Remove 'active' class from all steps
    document.querySelectorAll(".step").forEach((el) => {
      el.classList.remove("active");
    });

    // Add 'active' class to the current step
    response.element.classList.add("active");
    
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
    .onStepExit(response => {
      var chapter = config.chapters.find(chap => chap.id === response.element.id);
      if (chapter.onChapterExit.length > 0) {
          chapter.onChapterExit.forEach(setLayerOpacity);
      }});

  if (config.auto) {
    document.querySelectorAll('[data-scrollama-index="0"]')[0].scrollIntoView();
  }
});
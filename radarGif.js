// Constants
const GIF_COORDINATES = [
  [118.1592, 26.6334],
  [122.9168, 26.6334],
  [122.9168, 21.5939],
  [118.1592, 21.5939],
];
const FRAME_COUNT = 12;
const FRAME_DURATION = 500; // ms
const GIF_TITLE = 'Maritime Traffic Timelapse, 2023';
const GIF_TITLE_COORDINATES = [114.8, 24.9489];

const getImagePath = (frame) => `https://res.cloudinary.com/csisideaslab/image/upload/v1728503753/New_gif${frame}.png`;

let gifInterval = null;

/* ------------------------------------------------------ */
/*             Add and remove GIF title popup             */
/* ------------------------------------------------------ */
function gifTitle() {
  new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: false,
    className: "style-popup",
  })
    .setLngLat(GIF_TITLE_COORDINATES)
    .setHTML(`<h1 style="font-size:2.8em;">${GIF_TITLE}</h1>`)
    .addTo(map);
}

function removeGifTitle() {
  const popups = document.getElementsByClassName("mapboxgl-popup");
  if (popups.length) {
    popups[0].remove();
  }
}

/* ------------------------------------------------------ */
/*             Add and Remove GIF green border            */
/* ------------------------------------------------------ */
function addGIFstroke() {
  map.addSource("gifstroke", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [118.1457, 25.8013], // Top-left
          [122.9034, 25.8013], // Top-right
          [122.9168, 21.5939], // Bottom-right
          [118.1592, 21.5939], // Bottom-left
          [118.1457, 25.8013]  // Closing the loop (same as top-left)
        ],
      },
    },
  });

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

function removeGIFstroke() {
  if (map.getLayer("gifstroke")) {
    map.removeLayer("gifstroke");
  }
  if (map.getSource("gifstroke")) {
    map.removeSource("gifstroke");
  }
}

/* ------------------------------------------------------ */
/*                Add and remove GIF layer                */
/* ------------------------------------------------------ */
function addRadarLayer() {
  if (!map.getSource("radar")) {
    map.addSource("radar", {
      type: "image",
      url: getImagePath(1),
      coordinates: GIF_COORDINATES,
    });
  }

  if (!map.getLayer("radar-layer")) {
    map.addLayer({
      id: "radar-layer",
      type: "raster",
      source: "radar",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  }

  startGifAnimation();
}

function removeRadarLayer() {
  stopGifAnimation();
  if (map.getLayer("radar-layer")) {
    map.removeLayer("radar-layer");
  }
  if (map.getSource("radar")) {
    map.removeSource("radar");
  }
}


/* ------------------------------------------------------ */
/*                Start/Stop GIF Animation                */
/* ------------------------------------------------------ */
function startGifAnimation() {
  if (gifInterval) return;
  let currentFrame = 1;
  gifInterval = setInterval(() => {
    currentFrame = (currentFrame % FRAME_COUNT) + 1;
    map.getSource("radar").updateImage({ url: getImagePath(currentFrame) });
  }, FRAME_DURATION);
}

function stopGifAnimation() {
  if (gifInterval) {
    clearInterval(gifInterval);
    gifInterval = null;
  }
}
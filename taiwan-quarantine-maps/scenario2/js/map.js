import config from "./config.js"

mapboxgl.accessToken = config.accessToken

var layerTypes = {
  fill: ["fill-opacity"],
  line: ["line-opacity"],
  circle: ["circle-opacity", "circle-stroke-opacity"],
  symbol: ["icon-opacity", "text-opacity"],
  raster: ["raster-opacity"],
  "fill-extrusion": ["fill-extrusion-opacity"],
  heatmap: ["heatmap-opacity"],
}

var alignments = {
  left: "lefty",
  center: "centered",
  right: "righty",
  full: "fully",
}

function getLayerPaintType(layer) {
  var layerType = map.getLayer(layer).type
  return layerTypes[layerType]
}

function setLayerOpacity(layer) {
  var paintProps = getLayerPaintType(layer.layer)
  paintProps.forEach(function (prop) {
    var options = {}
    if (layer.duration) {
      var transitionProp = prop + "-transition"
      options = { duration: layer.duration }
      map.setPaintProperty(layer.layer, transitionProp, options)
    }
    map.setPaintProperty(layer.layer, prop, layer.opacity, options)
  })
}

var story = document.getElementById("story")
var features = document.createElement("div")
features.setAttribute("id", "features")
story.appendChild(features)

config.chapters.forEach((record, idx) => {
  var container = document.createElement("div")
  var chapter = document.createElement("div")

  if (record.title) {
    var title = document.createElement("h3")
    title.innerText = record.title
    chapter.appendChild(title)
  }

  if (record.image) {
    var image = new Image()
    image.src = record.image
    chapter.appendChild(image)
  }

  if (record.description) {
    var story = document.createElement("p")
    story.innerHTML = record.description
    chapter.appendChild(story)
  }

  container.setAttribute("id", record.id)
  container.classList.add("step")
  if (idx === 0) {
    container.classList.add("active")
  }

  chapter.classList.add(config.theme)
  container.appendChild(chapter)
  container.classList.add(alignments[record.alignment] || "centered")
  if (record.hidden) {
    container.classList.add("hidden")
  }
  features.appendChild(container)
})

const transformRequest = (url) => {
  const hasQuery = url.indexOf("?") !== -1
  const suffix = hasQuery
    ? "&pluginName=scrollytellingV2"
    : "?pluginName=scrollytellingV2"
  return {
    url: url + suffix,
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
})

/* ------------------------------------------------------ */
/*              zoom and location for mobile              */
/* ------------------------------------------------------ */
function updateChapterLocations(isMobile) {
  config.chapters.forEach((chapter) => {
    if (isMobile) {
      if (chapter.id === "start") {
        chapter.location.zoom = 5
        chapter.location.center = [120.92595, 23.87072]
      }
      if (chapter.id === "chapter1") {
        chapter.location.zoom = 6
        chapter.location.center = [120.70864, 23.86041]
      }
      if (chapter.id === "chapter2") {
        chapter.location.zoom = 6
        chapter.location.center = [120.70864, 23.86041]
      }
      if (chapter.id === "chapter3") {
        chapter.location.zoom = 7.3
        chapter.location.center = [119.95620, 22.51855]
      }
      if (chapter.id === "chapter35") {
        chapter.location.zoom = 7
        chapter.location.center = [121.38721, 25.15592]
      }
      if (chapter.id === "chapter4") {
        chapter.location.zoom = 6
        chapter.location.center = [120.70864, 23.86041]
      }
      if (chapter.id === "chapter5") {
        chapter.location.zoom = 7.7
        chapter.location.center = [119.40798, 23.5094]
      }
      if (chapter.id === "chapter6") {
        chapter.location.zoom = 5.2
        chapter.location.center = [120.96213, 23.22977]
      }
      if (chapter.id === "chapter7") {
        chapter.location.zoom = 8
        chapter.location.center = [123.236247, 20.664492]
      }
      if (chapter.id === "chapter8") {
        chapter.location.zoom = 6
        chapter.location.center = [120.77428, 23.85522]
      }
      if (chapter.id === "chapter9") {
        chapter.location.zoom = 5
        chapter.location.center = [120.96213, 23.22977]
      }
    }
  })
}

const mediaQuery = window.matchMedia("(max-width: 750px)")
mediaQuery.addEventListener("change", (e) => {
  updateChapterLocations(e.matches)
})

/* ------------------------------------------------------ */
/*         Markers - CH2 bubble text and drone gif        */
/* ------------------------------------------------------ */
let markers = []
let fullQuarantineGif = []
let fullQuarantineShipGif = []

if (config.showMarkers) {
  // location for the full quarantine gif
  const fullQuarantineGifArr = [[120.70346, 23.70748]]

  // create full quarantine gif markers but don't add them to the map yet
  fullQuarantineGifArr.forEach((_, i) => {
    fullQuarantineGif[i] = document.createElement("div")
    fullQuarantineGif[i].className = "full-quarantine-gif fadeIn"
    fullQuarantineGif[i].marker = new mapboxgl.Marker(
      fullQuarantineGif[i]
    ).setLngLat(fullQuarantineGifArr[i])
  })

  // location for the full quarantine ships gif
  const fullQuarantineShipsGifArr = [[120.80346, 23.73748]]
  // create full quarantine with ship gif markers but don't add them to the map yet
  fullQuarantineShipsGifArr.forEach((_, i) => {
    fullQuarantineShipGif[i] = document.createElement("div")
    fullQuarantineShipGif[i].className = "full-quarantine-ship-gif fadeIn"
    fullQuarantineShipGif[i].marker = new mapboxgl.Marker(
      fullQuarantineShipGif[i]
    ).setLngLat(fullQuarantineShipsGifArr[i])
  })
}

/* ------------------------------------------------------ */
/*      Scrolly part of map - enter and exit behavior     */
/* ------------------------------------------------------ */
var scroller = scrollama()

// used to keep it from exiting/entering chapters out of order
var lastEnteredChapter = null
var lastExitedChapter = null

map.on("load", function () {
  // Initial check to update chapter locations based on screen size
  updateChapterLocations(mediaQuery.matches)

  // setup the instance, pass callback functions
  scroller
    .setup({
      step: ".step",
      offset: 0.5,
      progress: true,
    })
    .onStepEnter((response) => {
      var current_chapter = config.chapters.findIndex(
        (chap) => chap.id === response.element.id
      )
      var chapter = config.chapters[current_chapter]

      // Prevent entering the same chapter multiple times
      if (lastEnteredChapter !== chapter.id) {
        // Exiting the last chapter before entering the new one
        if (lastEnteredChapter !== null) {
          var lastChapterIndex = config.chapters.findIndex(
            (chap) => chap.id === lastEnteredChapter
          )
          var lastChapter = config.chapters[lastChapterIndex]
          if (lastChapter.onChapterExit.length > 0) {
            lastChapter.onChapterExit.forEach(setLayerOpacity)
          }
          document.getElementById(lastChapter.id).classList.remove("active")
          lastExitedChapter = lastChapter.id
        }

        lastEnteredChapter = chapter.id

        response.element.classList.add("active")

        map[chapter.mapAnimation || "flyTo"](chapter.location)

        /* ------- add and remove markers based on chapter ------ */
        if (chapter.id === "start") {
          fullQuarantineGif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter1") {
          fullQuarantineGif.forEach((marker) => {
            marker.marker.addTo(map)
          })
        }

        if (chapter.id === "chapter3") {
          console.log("ch3")
          fullQuarantineGif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter5") {
          markers.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter6") {
          markers.forEach((marker) => {
            marker.marker.addTo(map)
          })
        }

        if (chapter.id === "chapter7") {
          markers.forEach((marker) => {
            marker.marker.addTo(map)
          })

          fullQuarantineShipGif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter8") {
          markers.forEach((marker) => {
            marker.marker.remove()
          })

          fullQuarantineShipGif.forEach((marker) => {
            marker.marker.addTo(map)
          })
        }

        if (chapter.id === "chapter9") {
          fullQuarantineShipGif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(setLayerOpacity)
          console.log("opacity set")
        }
        if (chapter.callback) {
          window[chapter.callback]()
        }
      }
    })
    .onStepExit((response) => {
      var chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      )

      // Prevent exiting the same chapter multiple times
      if (lastExitedChapter !== chapter.id) {
        response.element.classList.remove("active")

        if (chapter.onChapterExit.length > 0) {
          chapter.onChapterExit.forEach(setLayerOpacity)
        }

        /* ----------- remove markers based on chapter ---------- */
        if (chapter.id === "chapter6") {
          markers.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter7") {
          markers.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter8") {
          markers.forEach((marker) => {
            marker.marker.remove()
          })

          // setTimeout(() => {
          //   fullQuarantineShipGif.forEach((marker) => {
          //     marker.marker.remove()
          //   })
          // }, 500)
        }

        lastExitedChapter = chapter.id
      }
    })
})

// setup resize event
window.addEventListener("resize", scroller.resize)

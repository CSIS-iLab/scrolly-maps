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
        chapter.location.center = [120.77621, 23.62328]
      }
      if (chapter.id === "chapter1") {
        chapter.location.center = [120.77621, 23.62328]
      }
      if (chapter.id === "chapter2") {
        chapter.location.zoom = 6.5
        chapter.location.center = [121.01047, 23.84028]
      }
      if (chapter.id === "chapter3") {
        chapter.location.zoom = 6.8
        chapter.location.center = [120.23559, 22.5935]
      }
      if (chapter.id === "chapter4") {
        chapter.location.zoom = 6.8
        chapter.location.center = [120.56382, 22.52218]
      }
      if (chapter.id === "chapter45") {
        chapter.location.zoom = 6.8
        chapter.location.center = [120.53486, 25.03094]
      }
      if (chapter.id === "chapter5") {
        chapter.location.zoom = 7.5
        chapter.location.center = [120.24817, 24.04383]
      }
      if (chapter.id === "chapter6") {
        chapter.location.zoom = 6.66
        chapter.location.center = [120.24417, 23.52269]
      }
      if (chapter.id === "chapter7") {
        chapter.location.zoom = 5.2
        chapter.location.center = [120.67844, 23.75149]
      }
      if (chapter.id === "chapter75") {
        chapter.location.zoom = 8.1
        chapter.location.center = [122.863953, 21.979608]
      }
      if (chapter.id === "chapter8") {
        chapter.location.zoom = 5.4
        chapter.location.center = [120.53323, 23.72389]
      }
      if (chapter.id === "chapter9") {
        chapter.location.zoom = 6
        chapter.location.center = [120.67844, 23.75149]
      }
      if (chapter.id === "chapter10") {
        chapter.location.zoom = 5.2
        chapter.location.center = [120.67844, 23.75149]
      }
      if (chapter.id === "chapter11") {
        chapter.location.zoom = 5.2
        chapter.location.center = [120.67844, 23.75149]
      }
    }
  })
}

// check for mobile width to update chapter locations
const mediaQueryChapters = window.matchMedia("(max-width: 750px)")
mediaQueryChapters.addEventListener("change", (e) => {
  updateChapterLocations(e.matches)
})

/* ------------------------------------------------------ */
/*         Markers                                        */
/* ------------------------------------------------------ */
let markers = []
let circleLabelMarkers = []
let shipsgif = []
let quarantinegif = []
let labelArr = []

if (config.showMarkers) {
  /* ------------------ Text for bubbles ------------------ */
  // const labelNames = ["$424.3B", "$112.0B", "$31.9B", "$29.6B"]
  const labelNames = ["$159B", "$67.8B", "$21.7B", "$20B", "$9.5B", "$0.2B"]

  // create bubble markers
  function updateBubbleLabelLocations(isMobile) {
    if (isMobile) {
      console.log("isMobile", isMobile)
      // on mobile, text is outside of bubbles
      labelArr = [
        [119.69039, 23.09634], // Kaohsiung
        [122.33849, 25.46335], // Keelung
        [120.14382, 24.49781], // Taichung
        [120.9276, 25.25775], // Port of Taipei
        [119.9082, 23.92662], // Mailiao
        [121.82286, 23.9141], // Hualien
      ]
    } else {
      console.log("isMobile", isMobile)
      // bigger than mobile, text is inside bubbles
      labelArr = [
        [120.42576, 22.71563], // Kaohsiung
        [121.78514, 25.12682], // Keelung
        [120.52909, 24.32585], // Taichung
        [121.33006, 25.22549], // Port of Taipei
        [120.29659, 23.77275], // Mailiao
        [121.5085, 24.06634], // Hualien
      ]
    }

    // create label markers but don't add them to the map yet
    labelArr.forEach((_, i) => {
      console.log("test")
      circleLabelMarkers[i] = document.createElement("div")
      circleLabelMarkers[i].className = "marker-text"
      circleLabelMarkers[i].textContent = labelNames[i]
      circleLabelMarkers[i].marker = new mapboxgl.Marker(
        circleLabelMarkers[i]
      ).setLngLat(labelArr[i])
    })
  }

  const mediaQueryLabels = window.matchMedia("(max-width: 620px)")
  mediaQueryLabels.addEventListener("change", (e) => {
    updateBubbleLabelLocations(e.matches)
  })

  updateBubbleLabelLocations(mediaQueryLabels.matches)

  /* ----------------- Other markers/gifs ----------------- */
  // location for the ships gif
  const shipsGifArr = [[120.30573, 22.5724513]]

  // create ship gif markers but don't add them to the map yet
  shipsGifArr.forEach((_, i) => {
    shipsgif[i] = document.createElement("div")
    shipsgif[i].className = "ships-gif fadeIn"
    shipsgif[i].marker = new mapboxgl.Marker(shipsgif[i]).setLngLat(
      shipsGifArr[i]
    )
  })

  // create quarantine gif markers but don't add them to the map yet
  shipsGifArr.forEach((_, i) => {
    quarantinegif[i] = document.createElement("div")
    quarantinegif[i].className = "quarantine-gif fadeIn"
    quarantinegif[i].marker = new mapboxgl.Marker(quarantinegif[i]).setLngLat(
      shipsGifArr[i]
    )
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
  updateChapterLocations(mediaQueryChapters.matches)

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

        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(setLayerOpacity)
        }
        if (chapter.callback) {
          window[chapter.callback]()
        }

        /* ------- add and remove markers based on chapter ------ */
        if (chapter.id === "start") {
          quarantinegif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter1") {
          quarantinegif.forEach((marker) => {
            marker.marker.addTo(map)
          })
        }

        if (chapter.id === "chapter2") {
          circleLabelMarkers.forEach((marker) => {
            marker.marker.addTo(map)
          })
          quarantinegif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter8") {
          shipsgif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter9") {
          markers.forEach((marker) => {
            marker.marker.addTo(map)
          })

          shipsgif.forEach((marker) => {
            marker.marker.addTo(map)
          })
        }

        if (
          chapter.id === "chapter10" ||
          chapter.id === "chapter8" ||
          chapter.id === "chapter1" ||
          chapter.id === "chapter3"
        ) {
          circleLabelMarkers.forEach((marker) => {
            marker.marker.remove()
          })
          markers.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter10") {
          shipsgif.forEach((marker) => {
            marker.marker.remove()
          })
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
        if (chapter.id === "chapter1") {
          quarantinegif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter2") {
          circleLabelMarkers.forEach((marker) => {
            marker.marker.remove()
          })
        }

        if (chapter.id === "chapter9") {
          markers.forEach((marker) => {
            marker.marker.remove()
          })

          shipsgif.forEach((marker) => {
            marker.marker.remove()
          })
        }

        lastExitedChapter = chapter.id
      }
    })
})

// setup resize event
window.addEventListener("resize", scroller.resize)

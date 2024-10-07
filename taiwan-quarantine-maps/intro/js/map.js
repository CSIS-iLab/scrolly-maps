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
    var title = document.createElement("h1")
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
      if (chapter.id === "chapter1") {
        chapter.location.zoom = 7
        chapter.location.center = [120.92547, 23.46481]
      }
      if (chapter.id === "chapter2") {
        chapter.location.zoom = 6.5
        chapter.location.center = [120.96480, 23.84028]
      }
      if (chapter.id === "chapter3") {
        chapter.location.zoom = 5
        chapter.location.center = [120.77274, 23.90743]
      }
      if (chapter.id === "chapter4") {
        chapter.location.zoom = 5.7
        chapter.location.center = [120.86563, 23.90722]
      }
      if (chapter.id === "chapter5") {
        chapter.location.zoom = 7
        chapter.location.center = [120.29912, 22.73136]
      }
      if (chapter.id === "chapter6") {
        chapter.location.zoom = 6.66
        chapter.location.center = [120.24417, 23.52269]
      }
    }
  })
}

// check for mobile width to update chapter locations
const mediaQuery = window.matchMedia("(max-width: 750px)")
mediaQuery.addEventListener("change", (e) => {
  updateChapterLocations(e.matches)
})

/* ------------------------------------------------------ */
/*         Markers - gifs                                 */
/* ------------------------------------------------------ */
let fullQuarantineMarker
let blockadeMarker
let partQuarantineMarker

if (config.showMarkers) {
  // locations for all markers
  const pointArr = [
    [120.70346, 23.70748],
    [119.8055, 24.1882],
    [120.30573, 22.572451],
  ]

  // yellow outline marker - ch3
  const fullQuarantineMarkerElement = document.createElement("div")
  fullQuarantineMarkerElement.className = "full-quarantine-marker fadeIn"
  fullQuarantineMarker = new mapboxgl.Marker(
    fullQuarantineMarkerElement
  ).setLngLat(pointArr[0])

  // moving circle/ship quarantine arrows - ch 5
  const partQuarantineMarkerElement = document.createElement("div")
  partQuarantineMarkerElement.className = "quarantine-marker fadeIn"
  partQuarantineMarker = new mapboxgl.Marker(
    partQuarantineMarkerElement
  ).setLngLat(pointArr[2])
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
    .onStepEnter(async (response) => {
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

        /* ------- add and remove markers based on chapter ------ */
        if (chapter.id === "chapter2") {
          fullQuarantineMarker.remove()
        }

        if (chapter.id == "chapter3") {
          fullQuarantineMarker.addTo(map)
        }

        if (chapter.id === "chapter4") {
          fullQuarantineMarker.remove()
          partQuarantineMarker.remove()
        }

        if (chapter.id === "chapter5") {
          partQuarantineMarker.addTo(map)
        }

        if (chapter.id === "chapter6") {
          partQuarantineMarker.remove()
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
        if (chapter.id === "chapter5") {
          partQuarantineMarker.remove()
        }

        lastExitedChapter = chapter.id
      }
    })
})

// setup resize event
window.addEventListener("resize", scroller.resize)

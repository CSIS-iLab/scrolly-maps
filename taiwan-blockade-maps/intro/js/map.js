export function initializeMap(config) {
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
        chapter.location = chapter.locationMobile
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
  let fullQuarantineMarker = []
  let blockadeMarker = []
  
  if (config.showMarkers) {
  
    /* ----------------- Other markers/gifs ----------------- */

    const pointArr = [
      [120.70346, 23.70748],
      [120.16616, 24.03740]
    ]
  
    // yellow outline marker - ch3
    const fullQuarantineMarkerElement = document.createElement("div")
    fullQuarantineMarkerElement.className = "full-quarantine-marker fadeIn"
    fullQuarantineMarker = new mapboxgl.Marker(
      fullQuarantineMarkerElement
    ).setLngLat(pointArr[0])

    const blockadeMarkerElement = document.createElement("div")
    blockadeMarkerElement.className = "blockade-marker fadeIn"
    blockadeMarker = new mapboxgl.Marker(
      blockadeMarkerElement
    ).setLngLat(pointArr[1])
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
          if (chapter.id === "chapter0") {
            fullQuarantineMarker.remove()
          }

          if (chapter.id === "chapter1") {
            fullQuarantineMarker.addTo(map)
            blockadeMarker.remove()
          }

          if (chapter.id === "chapter2") {
            fullQuarantineMarker.remove()
            blockadeMarker.addTo(map)
          }

          if (chapter.id === "chapter4") {
            blockadeMarker.remove()
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
          if (chapter.id === "chapter3") {
            blockadeMarker.remove()
          }

          lastExitedChapter = chapter.id
        }
      })
  })
  
  // setup resize event
  window.addEventListener("resize", scroller.resize)
  
}

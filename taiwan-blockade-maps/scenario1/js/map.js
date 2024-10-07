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
  let militaryBaseGifs = []
  let energyAndCivilianGifs = []

  const cssClasses = [
    "missile-strike-2-gif fadeIn",
    "missile-strike-3-gif fadeIn",
    "missile-strike-1-gif fadeIn",
  ]

  if (config.showMarkers) {
    /* ----------------- Other markers/gifs ----------------- */
    // location for the ships gif
    const militaryNavalBaseAndAirbaseArr = [
      [120.6001518018166, 24.2521403557827],
      [121.875773, 24.599777],
      [120.2843201208377, 22.68245622076394],
      [119.57616078496, 23.55356472279975],
      [120.3920774217271, 23.47302960710853],
      [121.5630634694447, 25.06629098656217],
      [120.260744, 22.783651],
      [120.940374, 24.820252],
      [121.1763718, 22.78649805],
      [22.78649805, 22.95117301172156],
      [119.632446, 23.577314],
    ]

    militaryNavalBaseAndAirbaseArr.forEach((point, index) => {
      let element = document.createElement("div")
      element.className = cssClasses[index % cssClasses.length]
      element.marker = new mapboxgl.Marker(element).setLngLat(point)
      militaryBaseGifs.push(element)
    })

    const energyTerminalAndCivilianAirportsAndPortsArr = [
      [121.7669936786623, 24.30603706247735],
      [120.1959548294755, 22.85424269906208],
      [121.8295665941291, 25.12323942479319],
      [121.299939311937, 25.12146058818917],
      [120.4934018, 24.25307625],
      [120.204429, 22.808796],
      [121.2129976956742, 25.09608438118163],
      [120.1664173, 22.96848448],
      [120.1842027266479, 23.7897888454499],
      [121.7398755084152, 25.12825389446136],
      [120.393376, 23.454878],
      [120.5159199193984, 24.26490282367257],
      [120.3121120200758, 22.57712676004432],
      [121.6321899341008, 23.99091732957805],
      [121.8679676297888, 24.58610975716162],
      [121.553158, 25.066233],
      [121.618514, 24.030083],
      [120.605117, 24.25720768],
      [120.2068511992332, 22.9482344780651],
      [121.228666053423, 25.07832580599761],
      [121.1061751738528, 22.75690146809811],
      [121.3918258753191, 25.14335270727554],
      [119.6295059126643, 23.5632347481936],
    ]

    // Iterate over the array, selecting every other point and assigning alternating CSS classes
    energyTerminalAndCivilianAirportsAndPortsArr.forEach((point, index) => {
      if (index % 2 === 0) {
        let element = document.createElement("div")
        element.className = cssClasses[(index / 2) % cssClasses.length]
        element.marker = new mapboxgl.Marker(element).setLngLat(point)
        energyAndCivilianGifs.push(element)
      }
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
          if (chapter.id === "chapter8") {
            militaryBaseGifs.forEach((marker) => {
              marker.marker.remove()
            })
          }

          if (chapter.id === "chapter9") {
            militaryBaseGifs.forEach((marker) => {
              marker.marker.addTo(map)
            })

            energyAndCivilianGifs.forEach((marker) => {
              marker.marker.remove()
            })
          }

          if (chapter.id === "chapter10") {
            militaryBaseGifs.forEach((marker) => {
              marker.marker.remove()
            })

            energyAndCivilianGifs.forEach((marker) => {
              marker.marker.addTo(map)
            })
          }

          if (chapter.id === "chapter11") {
            energyAndCivilianGifs.forEach((marker) => {
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

          lastExitedChapter = chapter.id
        }
      })
  })

  // setup resize event
  window.addEventListener("resize", scroller.resize)
}

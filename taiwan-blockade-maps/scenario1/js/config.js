import getData from "./data.js"
import { initializeMap } from "./map.js"

const config = {
  style: "mapbox://styles/ilabmedia/clzwu4ekh005q01qj3yp272p6",
  accessToken:
    "pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  showMarkers: true,
  inset: false,
  theme: "dark",
  use3dTerrain: false, //set true for enabling 3D maps.
  auto: false,
  chapters: [
    /* ---------------------- chapter 0 --------------------- */
    {
      id: "chapter0",
      hidden: true,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* ---------------------- chapter 1 --------------------- */
    {
      id: "chapter1",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* ---------------------- chapter 2 --------------------- */
    {
      id: "chapter2",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* ---------------------- chapter 3 --------------------- */
    {
      id: "chapter3",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* ---------------------- chapter 4 --------------------- */
    {
      id: "chapter4",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* ---------------------- chapter 5 --------------------- */
    {
      id: "chapter5",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* ---------------------- chapter 6 --------------------- */
    {
      id: "chapter6",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* ---------------------- chapter 7 --------------------- */
    {
      id: "chapter7",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* --------------------- chapter 8 ---------------------- */
    {
      id: "chapter8",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* ---------------------- chapter 9 --------------------- */
    {
      id: "chapter9",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* --------------------- chapter 10 --------------------- */
    {
      id: "chapter10",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* --------------------- chapter 11 --------------------- */
    {
      id: "chapter11",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* --------------------- chapter 12 --------------------- */
    {
      id: "chapter12",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* --------------------- chapter 13 --------------------- */
    {
      id: "chapter13",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* --------------------- chapter 14 --------------------- */
    {
      id: "chapter14",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* --------------------- chapter 15 --------------------- */
    {
      id: "chapter15",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    },
    /* --------------------- chapter 16 --------------------- */
    {
      id: "chapter16",
      hidden: false,
      location: {
        pitch: 0,
        bearing: 0,
      },
    }
  ],
}

// Set chapter properties with separate objects for location on full screen and mobile
function setChapterProperties(chapter, fetchedChapter) {
  chapter.alignment = fetchedChapter.alignment
  chapter.locationFullScreen = {
    zoom: parseFloat(fetchedChapter.zoom),
    center: [
      parseFloat(fetchedChapter.center_long),
      parseFloat(fetchedChapter.center_lat),
    ],
    speed: parseFloat(fetchedChapter.speed),
    pitch: chapter.location.pitch,
    bearing: chapter.location.bearing,
  }
  chapter.locationMobile = {
    zoom: parseFloat(fetchedChapter.zoom_mobile),
    center: [
      parseFloat(fetchedChapter.center_long_mobile),
      parseFloat(fetchedChapter.center_lat_mobile),
    ],
    speed: parseFloat(fetchedChapter.speed),
    pitch: chapter.location.pitch,
    bearing: chapter.location.bearing,
  }
  chapter.description = `${fetchedChapter.description}`
  chapter.onChapterEnter = fetchedChapter.onChapterEnter
  chapter.onChapterExit = fetchedChapter.onChapterExit
}

getData().then((fetchedData) => {
  if (Array.isArray(fetchedData.data)) {
    const fetchedDataMap = {}

    fetchedData.data.forEach((item) => {
      fetchedDataMap[item.id] = item
    })

    const mediaQueryChapters = window.matchMedia("(max-width: 750px)")
    const isMobile = mediaQueryChapters.matches

    // Merge the fetched data into the config chapters
    config.chapters.forEach((chapter) => {
      const fetchedChapter = fetchedDataMap[chapter.id]
      if (fetchedChapter) {
        setChapterProperties(chapter, fetchedChapter)
      }
    })

    // Initial update of chapter locations based on screen size
    if (isMobile) {
      config.chapters.forEach((chapter) => {
        chapter.location = chapter.locationMobile
      })
    } else {
      config.chapters.forEach((chapter) => {
        chapter.location = chapter.locationFullScreen
      })
    }

    initializeMap(config)
  } else {
    console.error("Fetched data is not an array:", fetchedData)
  }
})

export default config

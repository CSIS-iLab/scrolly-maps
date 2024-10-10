/*This file contains the code for animating the line in the opening chapter/title of the map.*/

/* ------------------------------------------------------ */
/*                        Variables                       */
/* ------------------------------------------------------ */
const speedFactor = 0.03; // Adjust for speed
let animation; // Holds the requestAnimationFrame ID for controlling the line animation
let progress = 0; // track progress through the points
const polygonCoordinates = [
  [119.7732, 25.8095],
  [121.0269, 25.0782],
  [119.9757, 23.5835],
  [118.5919, 24.4556],
  [119.7732, 25.8095], // Closing the polygon
]; // Coordinates for the line animation
let geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  ],
}; // GeoJSON object for the line animation

/* ------------------------------------------------------ */
/*                        Animation                       */
/* ------------------------------------------------------ */

// Animation function
function animateLine() {
  const totalDistance = polygonCoordinates.length - 1;
  const segmentProgress = (progress * speedFactor) % totalDistance; // progress through segments

  const currentSegmentIndex = Math.floor(segmentProgress);
  const nextSegmentIndex = currentSegmentIndex + 1;
  const segmentFraction = segmentProgress - currentSegmentIndex;

  if (nextSegmentIndex < polygonCoordinates.length) {
    const interpolatedPoint = getInterpolatedPoint(
      polygonCoordinates[currentSegmentIndex],
      polygonCoordinates[nextSegmentIndex],
      segmentFraction
    );

    geojson.features[0].geometry.coordinates.push(interpolatedPoint);
    map.getSource("line").setData(geojson); // update line source data
    progress += 1; // Adjust based on speed
  } else {
    resetLineAnimation();
  }

  animation = requestAnimationFrame(animateLine);
}

// Function to interpolate between two points
function getInterpolatedPoint(startPoint, endPoint, fraction) {
  return [
    startPoint[0] + (endPoint[0] - startPoint[0]) * fraction,
    startPoint[1] + (endPoint[1] - startPoint[1]) * fraction,
  ];
}

// Reset once the polygon path is complete
function resetLineAnimation() {
  geojson.features[0].geometry.coordinates = [];
  progress = 0;
}

/* ------------------------------------------------------ */
/*     Add line layer, start/remove layer & animation     */
/* ------------------------------------------------------ */
// Function to add the line layer to the map
function addLineLayer() {
  if (!map.getSource("line")) {
    map.addSource("line", {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: "line-animation",
      type: "line",
      source: "line",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#68f7a3",
        "line-width": 6,
        "line-opacity": 1,
      },
    });
  }
}

// Function to start the line animation
function startLineAnimation() {
  addLineLayer(); // Add the layer if it doesn't exist
  animateLine(); // Start the animation
}

// Function to remove the line animation and layer
function removeLineAnimation() {
  if (animation) {
    cancelAnimationFrame(animation); // Stop the animation
  }
  if (map.getLayer("line-animation")) {
    map.removeLayer("line-animation"); // Remove the layer
  }
  if (map.getSource("line")) {
    map.removeSource("line"); // Remove the source
  }
  resetLineAnimation();
}
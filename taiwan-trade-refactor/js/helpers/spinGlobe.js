/* ------------------------------------------------------ */
/*          Code that controls the globe spinning         */
/* ------------------------------------------------------ */

let spinInterval; // Interval for spinning the globe

// Calculate the distance per second based on zoom level
function calculateDistancePerSecond(zoom, secondsPerRevolution, maxSpinZoom, slowSpinZoom) {
  let distancePerSecond = 2600 / secondsPerRevolution;

  if (zoom > slowSpinZoom) {
    const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
    distancePerSecond *= zoomDif; // Slow spinning at higher zoom levels
  }

  return distancePerSecond;
}

function spinGlobe() {
  const secondsPerRevolution = 220;
  const maxSpinZoom = 5; // Do not rotate above zoom level 5.
  const slowSpinZoom = 3; // Intermediate speeds between zoom levels 3 and 5.

  spinInterval = setInterval(() => {
    const zoom = map.getZoom();

    // Exit if zoom is too high
    if (zoom >= maxSpinZoom) return;

    const distancePerSecond = calculateDistancePerSecond(zoom, secondsPerRevolution, maxSpinZoom, slowSpinZoom);
    const center = map.getCenter();
    center.lng -= distancePerSecond;

    map.easeTo({ center, duration: 1000, easing: (n) => n }); // Smooth animation
  }, 1000); // Repeat every second for smooth spinning
}

function stopGlobeSpin() {
  clearInterval(spinInterval); // Stops the spinning by clearing the interval
}
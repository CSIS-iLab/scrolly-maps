// Function to create pulsing dot icon
function createPulsingDot(size) {
  return {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    
    onAdd: function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },
    
    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;
      
      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context;
      
      // Draw the outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(247, 93, 85, ${1 - t})`;
      context.fill();
      
      // Draw the inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(247, 93, 85, 0.3)";
      context.strokeStyle = "white";
      context.lineWidth = 2 + 2 * (1 - t);
      context.fill();
      context.stroke();
      
      // Update this image's data with data from the canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;
      
      // Continuously repaint the map for smooth animation
      map.triggerRepaint();
      return true; // Inform the map that the image was updated
    },
  };
}

// Function to add pulsing dots to the map
function addPulsingDots(coordinates, size) {
  const pulsingDot = createPulsingDot(size);
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
  
  map.addSource("dot-point", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: coordinates.map(coord => ({
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: coord,
          type: "Point",
        },
      })),
    },
  });
  
  map.addLayer({
    id: "layer-with-pulsing-dot",
    type: "symbol",
    source: "dot-point",
    layout: {
      "icon-image": "pulsing-dot",
    },
  });
}

// Function to remove animated markers
function removePulsingDotLayer() {
  if (map.getLayer("layer-with-pulsing-dot")) {
    map.removeLayer("layer-with-pulsing-dot");
  }
  if (map.getSource("dot-point")) {
    map.removeSource("dot-point");
  }
}
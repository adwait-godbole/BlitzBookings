export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWR3YWl0Z29kYm9sZSIsImEiOiJja3FjazBpcmsxMWR3Mm9xdDY1ZmlqeGl6In0.mQ0yHbJrB5WvRXemluMmeA';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/adwaitgodbole/cljsj83dy01cj01pk07fm49hr', // style URL
    // scrollZoom: false,
    // center: [-118.113491, 34.111745], // starting position [lng, lat]
    // zoom: 10, // starting zoom
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  // adding multiple markers
  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // extends map bounds to include current locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

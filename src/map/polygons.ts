import L from 'leaflet';

import {map} from './map';

import {citiesZones, INITIAL_ZOOM, parkingZones} from '@/constants';

export function addPolygon() {
  const polygonsLayer = L.layerGroup();
  const citiesLayer = L.layerGroup();

  parkingZones.forEach((p) =>
    L.polygon(p.latlngs, {
      color: '#2563eb',
      weight: 2,
      fillOpacity: 0.1,
      smoothFactor: 2,
      pane: 'polygons',
      interactive: false,
    }).addTo(polygonsLayer),
  );

  citiesZones.forEach((p) =>
    L.polygon(p.latlngs, {
      color: '#2f6b15',
      weight: 2,
      fillOpacity: 0.1,
      smoothFactor: 2,
      pane: 'polygons',
      interactive: false,
    }).addTo(citiesLayer),
  );

  polygonsLayer.addTo(map);

  map.on('zoomstart', () => {
    map.removeLayer(polygonsLayer);
    map.removeLayer(citiesLayer);
  });

  map.on('zoomend', () => {
    if (map.getZoom() >= INITIAL_ZOOM) {
      polygonsLayer.addTo(map);
    } else {
      citiesLayer.addTo(map);
    }
  });
}

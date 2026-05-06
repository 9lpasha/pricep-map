import L, {Polyline} from 'leaflet';
import 'leaflet.markercluster';

import {map} from './map';
import {userLocation} from './user-location';

import {initialPricepLocations} from '@/constants/priceps';
import {BridgeGetMobileType, PricepInfo} from '@/types';
import {getBridgeDto} from '@/utils';

export const markersMap = new Map<string, L.CircleMarker>();
const getMarkerClusterGroup = () =>
  L.markerClusterGroup({
    disableClusteringAtZoom: 14,
    maxClusterRadius: 40,
    spiderfyOnMaxZoom: false, // Не показывать паучье отображение
    showCoverageOnHover: false, // Не показывать область кластера при наведении
    zoomToBoundsOnClick: true, // Увеличивать зум при клике
    spiderfyDistanceMultiplier: 0, // Отключаем spiderfy
    pane: 'markers',
  });
let routeLine: Polyline | null = null;
let markersLayer = getMarkerClusterGroup();

export let pricepLocations = initialPricepLocations;
export const setPricepLocations = (locations: PricepInfo[]) => {
  map.removeLayer(markersLayer);

  pricepLocations = locations;
  markersLayer = getMarkerClusterGroup();

  setMarkers();
};

export function clearRoute() {
  if (routeLine) {
    map.removeLayer(routeLine);

    markersMap.forEach((m, pricepId) => {
      const pricep = pricepLocations.find((p) => p.id === pricepId);
      m.setStyle({radius: 7, fillColor: pricep?.booked ? '#f5550bff' : '#f59e0b', color: '#ffffff', weight: 2, fillOpacity: 1});
    });
  }
}

function setRoute(coords: [number, number][]) {
  routeLine = L.polyline(
    coords.map((c) => [c[1], c[0]]),
    {color: 'blue', weight: 3},
  ).addTo(map);
}

function setMarkers() {
  markersMap.clear();
  pricepLocations.forEach((p) => {
    const marker = L.circleMarker([p.latlng[0], p.latlng[1]], {
      radius: 7,
      fillColor: p.booked ? '#f5550bff' : '#f59e0b',
      color: '#ffffff',
      weight: 2,
      fillOpacity: 1,
    }).addTo(markersLayer);
    markersMap.set(p.id, marker);

    marker.on('click', async (e) => {
      L.DomEvent.stopPropagation(e);
      e.originalEvent.stopPropagation();
      e.originalEvent.preventDefault();

      window.ReactNativeWebView?.postMessage(getBridgeDto({type: BridgeGetMobileType.OPEN_PRICEP, id: p.id}));

      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${userLocation?.[1]},${userLocation?.[0]};${p.latlng[1]},${p.latlng[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const json = await res.json();

        if (!json.routes || json.routes.length === 0) {
          alert('Маршрут не найден');
          return;
        }

        clearRoute();

        const coords = json.routes[0].geometry.coordinates as [number, number][];
        setRoute(coords);
        marker.setStyle({radius: 9, fillColor: '#11a03fff', color: '#ffffff', weight: 2, fillOpacity: 1});
      } catch (err) {
        alert('Ошибка при построении маршрута: ' + err);
      }
    });
  });

  markersLayer.addTo(map);
}

export function addMarkers() {
  setMarkers();

  map.on('click', () => {
    window.ReactNativeWebView?.postMessage(getBridgeDto({type: BridgeGetMobileType.CLOSE_PRICEP}));
    clearRoute();
  });
}

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import {initBridge, notifyReady} from './bridge';
import {addMarkers} from './markers';
import {addPolygon} from './polygons';
import {addTiles} from './tiles';
import {setUserLocation} from './user-location';
import {addYandexLogo} from './yandex-logo';

import {INITIAL_COORDINATE, INITIAL_ZOOM} from '@/constants';

export const map = L.map('map', {
  center: INITIAL_COORDINATE,
  zoom: INITIAL_ZOOM,
  zoomControl: true,
  attributionControl: false,
  zoomAnimation: true,
  fadeAnimation: true,
  markerZoomAnimation: true,
  maxBounds: L.latLngBounds([55.009776, 47.834869], [56.482203, 50.385253]),
  minZoom: INITIAL_ZOOM - 1,
});

export function initMap() {
  map.zoomControl.setPosition('bottomleft');
  // для z-index (маркеры выше полигонов)
  map.createPane('polygons');
  map.getPane('polygons')!.style.zIndex = '300';
  map.createPane('markers');
  map.getPane('markers')!.style.zIndex = '650';

  addYandexLogo();
  addTiles();
  addPolygon();
  addMarkers();
  initBridge();

  map.whenReady(() => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;

          setUserLocation([latitude, longitude]);
          // Маркер пользователя
          const userIcon = L.divIcon({
            html: '<div class="user-marker"></div>',
            className: 'user-marker-icon',
            iconSize: [20, 20],
          });

          L.marker([latitude, longitude], {icon: userIcon}).addTo(map);
        },
        (error) => {
          console.error('Ошибка геолокации:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    } catch (e) {
      console.log(e);
    } finally {
      notifyReady();
    }
  });
}

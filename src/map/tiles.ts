import L from 'leaflet';

import {map} from './map';

export function addTiles() {
  L.tileLayer(
    'https://tiles.api-maps.yandex.ru/v1/tiles/?apikey=3e6b8f73-ba41-4630-9fbb-b6232d876e22&lang=ru_RU&scale=2&l=map&x={x}&y={y}&z={z}&maptype=map&projection=web_mercator',
    {
      maxZoom: 19,
      keepBuffer: 4,
    },
  ).addTo(map);
}

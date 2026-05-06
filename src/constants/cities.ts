import {LatLngTuple} from 'leaflet';

import {MapPolygonInfo} from '@/types';

const kazanData = await import('@/assets/kazan.json');

const kazan: LatLngTuple[][] = kazanData.default.geojson.coordinates.map((c) => c.map((c2) => [c2[1], c2[0]])) as LatLngTuple[][];

export const citiesZones: MapPolygonInfo[] = kazan.map((k, i) => ({latlngs: k, id: 'Kazan' + i}));

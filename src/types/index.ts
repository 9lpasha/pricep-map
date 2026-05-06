type LatLngTuple = [number, number, number?];

export interface MapObjectInfo {
  latlng: LatLngTuple;
  id: string;
}

export interface MapPolygonInfo {
  latlngs: LatLngTuple[];
  id: string;
}

export interface PricepInfo extends MapObjectInfo {
  type?: string;
  booked: false;
}

export enum BridgeGetWebType {
  SET_VIEW = 'SET_VIEW',
  DISABLE_TOUCH_ZOOM = 'DISABLE_TOUCH_ZOOM',
  OPEN_PRICEP = 'OPEN_PRICEP',
  CLOSE_PRICEP = 'CLOSE_PRICEP',
  GET_PRICEPS = 'GET_PRICEPS',
  GET_BOOKINGS = 'GET_BOOKINGS',
}

export type BridgeGetData =
  | {
      type: BridgeGetWebType.CLOSE_PRICEP;
    }
  | {
      type: BridgeGetWebType.OPEN_PRICEP;
      pricep: PricepInfo;
    }
  | {
      type: BridgeGetWebType.SET_VIEW;
      center: [number, number];
      zoom: number;
    }
  | {
      type: BridgeGetWebType.DISABLE_TOUCH_ZOOM;
    }
  | {
      type: BridgeGetWebType.GET_PRICEPS;
      priceps: PricepInfo[];
    };

export enum BridgeGetMobileType {
  OPEN_PRICEP = 'OPEN_PRICEP',
  CLOSE_PRICEP = 'CLOSE_PRICEP',
  READY = 'READY',
}

export type BridgePostData =
  | {
      type: BridgeGetMobileType.OPEN_PRICEP;
      id: string;
    }
  | {
      type: BridgeGetMobileType.CLOSE_PRICEP;
    }
  | {
      type: BridgeGetMobileType.READY;
    };

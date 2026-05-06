import {map} from './map';
import {clearRoute, setPricepLocations} from './markers';

import {BridgeGetData, BridgeGetMobileType, BridgeGetWebType} from '@/types';
import {getBridgeDto} from '@/utils';

export function initBridge() {
  window.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data) as BridgeGetData;

      if (data.type === BridgeGetWebType.SET_VIEW) {
        map.setView(data.center, data.zoom);
      }

      if (data.type === BridgeGetWebType.DISABLE_TOUCH_ZOOM) {
        map.touchZoom.disable();
      }

      if (data.type === BridgeGetWebType.CLOSE_PRICEP) {
        clearRoute();
      }

      if (data.type === BridgeGetWebType.OPEN_PRICEP) {
        //
      }

      if (data.type === BridgeGetWebType.GET_PRICEPS) {
        setPricepLocations(data.priceps);
      }
    } catch (e) {
      console.log(e);
    }
  });
}

export function notifyReady() {
  window.ReactNativeWebView?.postMessage(getBridgeDto({type: BridgeGetMobileType.READY}));
}

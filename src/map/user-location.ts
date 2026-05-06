export let userLocation: undefined | [number, number] = undefined;
export const setUserLocation = (coords: [number, number]) => (userLocation = coords);

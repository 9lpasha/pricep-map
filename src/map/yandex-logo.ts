import L from 'leaflet';

import {map} from './map';

import logo from '@/assets/yndex_logo_ru.png';

export const addYandexLogo = () => {
  const YandexLogoControl = L.Control.extend({
    options: {
      position: 'bottomright',
    },

    onAdd() {
      const container = L.DomUtil.create('div', 'yandex-logo');

      container.innerHTML = `
      <a
        href="https://yandex.ru/maps"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="${logo}"
          alt="Yandex Maps"
        />
      </a>
    `;

      // чтобы карта не двигалась при клике
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      return container;
    },
  });

  new YandexLogoControl().addTo(map);
};

// Проверка поддержки браузером
if ('geolocation' in navigator) {
  console.log('Geolocation доступен');
} else {
  console.log('Geolocation не поддерживается');
  alert('Ваш браузер не поддерживает геолокацию');
}

// Получение текущей позиции (однократно)
export function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Успешное получение
      const {latitude, longitude, accuracy} = position.coords;
      console.log('Широта:', latitude);
      console.log('Долгота:', longitude);
      console.log('Точность:', accuracy, 'метров');

      // Дополнительные данные (если доступны)
      if (position.coords.altitude) {
        console.log('Высота:', position.coords.altitude);
      }
      if (position.coords.heading) {
        console.log('Направление:', position.coords.heading);
      }
      if (position.coords.speed) {
        console.log('Скорость:', position.coords.speed);
      }

      // Время получения
      console.log('Время:', new Date(position.timestamp));
    },
    (error) => {
      // Обработка ошибок
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error('Пользователь отказал в доступе');
          break;
        case error.POSITION_UNAVAILABLE:
          console.error('Информация о местоположении недоступна');
          break;
        case error.TIMEOUT:
          console.error('Время запроса истекло');
          break;
        default:
          console.error('Неизвестная ошибка:', error.message);
      }
    },
    {
      // Опции
      enableHighAccuracy: true, // высокая точность (GPS)
      timeout: 10000, // время ожидания в мс
      maximumAge: 0, // максимальный возраст кэша
    },
  );
}

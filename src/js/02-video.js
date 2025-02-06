// Імпортуємо плеєр з пакету @vimeo/player
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
// Функція для обробки оновлення часу
const onPlay = function (data) {
  save(STORAGE_KEY, data.seconds);
};
player.on('timeupdate', throttle(onPlay, 1000));

// Додати перевірку перед завантаженням часу
const savedTime = load(STORAGE_KEY);

if (savedTime !== undefined) {
  player.setCurrentTime(savedTime).catch(error => {
    console.error('Error setting current time:', error);
  });
}

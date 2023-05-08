import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  id: 236203659,
  width: 640,
});


if (localStorage.getItem('videoplayer-current-time') !== null) {
  const seconds = JSON.parse(
    localStorage.getItem('videoplayer-current-time')
  ).seconds;

  player.setCurrentTime(seconds).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
}

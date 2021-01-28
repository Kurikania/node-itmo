// 1. Требуется реализовать декоратор с параметрами pause,
// который откладывает выполнение функции на указанное
// количество секунд

function pause(func, time) {
  return function () {
    return setTimeout(func, time * 1000);
  };
}

function func() {
  console.log("Функция выполнится с задержкой в 2 секунды!");
}

let paused = pause(func, 2);
paused();

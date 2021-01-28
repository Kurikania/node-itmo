// 2*. Требуется реализовать декоратор с параметрами returnObject,
// который в случае, если функция возвращает массив, подменяет
// его объектом. Имена задаются в параметрах декоратора. Декоратор
// универсальный, количество имен переменное.

function return_object(func, ...args) {
  return function () {
    let obj = {};
    let count = 0;
    let result = func(...arguments);
    for (let arg of args) {
      obj[arg] = result[count];
      count++;
    }
    return obj;
  };
}

console.log("Пример использования №1");

function func() {
  return [1, 2];
}
let func_decoreted = return_object(func, "one", "two");
let r = func_decoreted();

console.log(r.one); // 1
console.log(r.two); //2

console.log("Пример использования №2:");

function func2() {
  return ["JS", "is", "programming language"];
}
let n = return_object(func2, "a", "b", "c")();
console.log(n.c); // 'programming language'

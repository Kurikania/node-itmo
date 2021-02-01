/* 
 1*. Генератор случайных паролей. Требуется реализовать генератор
(function*) случайных паролей указанной длины. В пароле можно 
использовать любые символы в верхнем и нижнем регистре. 
Например: password_generator(16), вернет случайный пароль 
длиной 16 символов.
*/
function* password_generator(length) {
  let symbols =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  let temp = "";
  let output;
  while (true) {
    for (let i = 0; i < length; ++i) {
      temp += symbols.charAt(Math.floor(Math.random() * symbols.length));
      output = temp;
    }
    temp = "";
    yield output;
  }
}

let password = password_generator(16);
console.log(password.next().value);
let password2 = password_generator(4);
console.log(password2.next().value);

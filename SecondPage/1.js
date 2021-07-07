// $(function () {
//   $(window).on("scroll resize", function () {
//     var prec = $(window).scrollTop() / ($(document).height() - $(window).height());
//     $(".progress-bar").css({
//       "width": ((100 * prec) | 0) + "%"
//     });
//     $('progress')[0].value = prec;
//   });
// });
// function progressBar() {
//     // Узнаем на сколько страница прокручена
//     let scroll = document.body.scrollTop || document.documentElement.scrollTop;
//     // Узнаем высоту всей страницы
//     let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     // Получаем в % на сколько прокручена страница
//     let scrolled = scroll / height * 100;

//     // Подставляем % прокрутки в ширину нашей линии
//     document.getElementById('progressBar').style.width = scrolled + '%';
// }

// // Запускаем функцию, когда пользователя скролит
// window.addEventListener('scroll', progressBar);

$(function () {
  $(window).on("scroll resize", function () {
    var o = $(window).scrollTop() / ($(document).height() - $(window).height());
      $(".progress-bar").css({
        "width": (100 * o | 0) + "%"
        });
          $('progress')[0].value = o;
      })
});

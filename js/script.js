/* number поместить все что связано с числами 
String информация которую можно описать словами
true/false либо да либо нет
null чего-то несуществует
undefined что-то существует, но значения никакого не имеет  */
/* let obj = {
    name:'apple',
    color: 'green',
    weight: 200
} */
/* Symbol технический тип данных */

/* alert(123); выводит информацию в ковычках (искользуется редко) */
/* console.log("fdshfghdjfhjd"); консольная команда чтобы общаться с разработчиком  */
/* let answer = confirm("вам есть 18?"); этой командой задаём любой вопрос
console.log(answer); получаем в консоль ответ от пользователя  */
/* let answer = prompt("вам есть 18?", ""); prompt-даёт пользователю ввести данные 
console.log(answer); */

/* console.log(4+4); в консоль выведется число 8 */

/* let isChecked = true,
    isClose = true;

console.log(isChecked && isClose); оператор и 

console.log(isChecked || isClose); оператор или  */

/* if (2*4 == 8*1) {
    console.log('верно')
} else{
    console.log('ошибка')
}
 */
/*  let answer = confirm("вам есть 18?"); 
if(answer){
    console.log("проходитк")
} else {
    console.log("вам ещё нет 18")
} */

/* const num = 50;
if (num <49){
    console.log("неправильно")
} else if (num > 100){
    console.log("правильно")
} else{
    console.log("верно")
} */

/* for(let i = 1; i < 8; i++){
    console.log(i)
} */

/* function logging(a , b){
    console.log(a+b)
}

logging(10, 5);
logging(10, 100); */


$(document).ready(function(){
    $('.corusel__inner').slick({
        speed: 1000,
        slidesToShow: 1,
        
        /* adaptiveHeight: true, */
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
            }
        },
            {
                breakpoint: 480,
                settings: {
                    dots: true,
                    arrows: false,
            }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item){
        $(item).each(function(i) {
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list ').eq(i).toggleClass('catalog-item__list_active');
            })
        });
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      $('[data-model=consultation]').on('click', function(){
          $('.overlay, #consalting').fadeIn();
      })
      $('.model__close').on('click', function(){
          $('.overlay, #consalting, #order, #thanks').fadeOut('slow');
      });

      

      $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .model__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
      });

      

      function valideForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                  required: true,
                  email: true
                },
              },
              messages: {
                name: {
                    required: "введите ваше имя",
                    minlength: jQuery.validator.format(" необходимо минимум {0} символа")
                  },
                phone: "введите телефон",
                email: {
                    required: "введите email",
                    email: "введите корректный email"
                  } 
              },
          });          
      };

      valideForms('#consultation-form');
      valideForms('#consalting form');
      valideForms('#order form');
      
      $('input[name=phone]').mask('+38(000) 000-0000', {selectOnFocus: true});


      $("form").submit(function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consalting, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $("form").trigger("reset");
        });
        return false;
      });
    

      //scroll
      $(window).scroll(function(){
        if($(this).scrollTop() > 500) {
            $('.pageup').fadeIn();
        } else{
            $('.pageup').fadeOut();
        }
      });

      $('a[href=#up]').on('click', function() {
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        return false;
      });
  });
  
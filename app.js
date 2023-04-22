// let tg = window.Telegram.WebApp;

// tg.expand();

// tg.MainButton.textColor = "#FFFFFF";
// tg.MainButton.color = "#2cab37";

// let item = "";

// let cost = document.getElementByIdlementById("cost");
// let slides_new = document.getElementByIdlementById("slides_new");
// let adaptations_new = document.getElementByIdlementById("adaptations_new");
// let clippings_normal_new = document.getElementByIdlementById("clippings_normal_new");
// let clippings_hard_new = document.getElementByIdlementById("clippings_hard_new");
// let slides_exist = document.getElementByIdlementById("slides_exist");
// let adaptations_exist = document.getElementByIdlementById("adaptations_exist");
// let clippings_normal_exist = document.getElementByIdlementById("clippings_normal_exist");
// let clippings_hard_exist = document.getElementByIdlementById("clippings_hard_exist");
// let adaptations_other = document.getElementByIdlementById("adaptations_other");
// let discount = document.getElementByIdlementById("discount");
// let clear_all = document.getElementByIdlementById("clear_all");
// let order = document.getElementByIdlementById("order");
// let lift_up = document.getElementByIdlementById("lift_up");

// изменяем значение стоимости
let cost_value = 1000000;
var cost = document.querySelector('#cost')
cost.textContent = cost_value + "₽";



// accordion animation
$(document).ready(function() {
	$('.accordion_trigger').click(function() {
		$(this).parent().toggleClass('accordion_item_active');
	});
});





// функция добавления класса при скролле
$(document).ready(function () {
    // const el_offset = $('#scrollable_el').offset().top; // значение отступа сверху элемента
    $(window).scroll(function () {
        const scrolled = $(this).scrollTop(); // то, насколько мы проскроллили
        let scrollable_area = $('#scrollable_area')
        if (scrolled > 1) {
            // элемент прилип. добавляем класс на всю площадь скролла,
            // так как только так можно явно задать поведение для всех
            // элементов внутри
            scrollable_area.addClass('el-fixed');
        } else if (scrolled < 1) {
            // элемент отлип. убираем класс
            scrollable_area.removeClass('el-fixed');

        }

    })
});


// Кнопка вверх
// Функция появления и скрытия кнопки
$(function(){
    // при скролле больше 200 px показать кнопку, иначе скрыть
    $(window).scroll(function(){
        if ($(this).scrollTop() > 150) {
            $('#scrolling').fadeIn();
        }
        else {
            $('#scrolling').fadeOut(400);
        }
    })
    // функция плавного скролла вверх
    $('#scrolling').click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 550);
        return false;
    })
})









// btn1.addEventListener("click", function(){
// 	if (tg.MainButton.isVisible) {
// 		tg.MainButton.hide();
// 	}
// 	else {
// 		tg.MainButton.setText("Вы выбрали товар 1!");
// 		item = "1";
// 		tg.MainButton.show();
// 	}
// });



// Telegram.WebApp.onEvent("mainButtonClicked", function(){
// 	tg.sendData(item);
// });

// let usercard = document.getElementById("usercard");

// let p = document.createElement("p");

// p.innerText = `${tg.initDataUnsafe.user.first_name}
// ${tg.initDataUnsafe.user.last_name}`;


// usercard.appendChild(p); 


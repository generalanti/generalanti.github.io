// let tg = window.Telegram.WebApp;

// tg.expand();

// tg.MainButton.textColor = "#FFFFFF";
// tg.MainButton.color = "#2cab37";

// let item = "";

// let cost = document.getElementByIdlementById("cost");


// изменяем значение стоимости
let cost_value = 1000000;
var cost = document.querySelector('#cost')
cost.textContent = cost_value + "₽";


// функция анимации аккордеона
$(document).ready(function () {
    // работаем по событию клик по триггеру
    $('.accordion_trigger').click(function () {
        // если аккордеон развернут, то сворачиваем
        if ($(this).parent().hasClass('accordion_item_active')) {
            $(this).parent().removeClass('accordion_item_active')
        }
        // если свернут, то разворачиваем и скроллим всю страницу к началу триггера
        else {
            $(this).parent().addClass('accordion_item_active');
            // скроллим к позиции триггера + вниз на n пикселей, чтобы стоимость
            // не перекрывала лэйбл триггера
            setTimeout(() => {
                $('body, html').animate({
                    scrollTop: $(this).offset().top - 92
                }, 500)
            }, 400)
        }

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

    });
});


// Кнопка вверх
// Функция появления и скрытия кнопки
$(document).ready(function () {
    // при скролле больше 200 px показать кнопку, иначе скрыть
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('#scrolling').fadeIn();
        } else {
            $('#scrolling').fadeOut(400);
        }
    });
    // функция плавного скролла вверх
    $('#scrolling').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 550);
        return false;
    });
});

// input_number
// стилизация непустых числовых вводов input_number в темной зоне
$(document).ready(function () {
// применительно к классам числовых вводов
    $('.input_number, .input_text').blur(function () {
        // проверяем, есть ли введенные значения
        let input_val = $.trim(this.value)
        if (input_val.length > 0) {
            // если есть, то добавляем к ним класс
            $(this).addClass('input_not_empty');
        } else {
            // и убираем, если значений нет
            $(this).removeClass('input_not_empty');
        }
    })
});

// функция добавления "%" при вводе числа скидки (и удалении "%" если цифр нет)
$(document).ready(function () {
    let discount = $('#discount')
    discount.change(function () {
        let input_val = $.trim(this.value)
        if (input_val.length > 0) {
            $(this).val(function (index, old) {
                return old.replace(/[^0-9]/g, '') + '%';
            });
        }
    });
    discount.blur(function () {
        let input_val = $.trim(this.value)
        if (input_val === '%') {
            $(this).val(function (index, old) {
                return old.replace('%', '');
            });
        }
    });
});


// функция стирания данных из инпутов расчета
$(document).ready(function () {
    $('#clear_all').click(function () {
        $('.input_number, #promocode').val('')
    });
});




// валидация числовых инпутов на темном фоне - можно вводить только числа
$('body').on('input', '.input_number.dark_bg_content', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// валидация числовых инпутов на светлом фоне - можно вводить только числа
$('body').on('input', '.input_number.light_bg_content', function () {
    this.value = this.value.replace(/[^0-9%]/g, '');
});

// валидация текстовых инпутов имени и фамилии
$('body').on('input', '#name, #last_name', function () {
    this.value = this.value.replace(/[^a-zA-Zа-яА-Я]/g, '');
});

// валидация текстового инпута промокода
$('body').on('input', '#promocode', function () {
    this.value = this.value.replace(/[^0-9a-zA-Zа-яА-Я]/g, '');
});



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


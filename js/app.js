let tg = window.Telegram.WebApp;
tg.expand();


// tg.MainButton.textColor = "#FFFFFF";
// tg.MainButton.color = "#2cab37";


// передача telegram_username из telegram
try {
    const tg_username = tg.initDataUnsafe.user.username;
} catch (e) {

}

// подключение к MySQL
// const mysql = require('mysql2');
//
// // create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     pass: 123,
//     database: 'test'
// });
//
// // simple query
// connection.query(
//     'SELECT * FROM `table',
//     function(err, results, fields) {
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );


// Калькулятор цен

// для тестов записал пока что эти цены. В будущем они будут тянуться из БД
const price_cover_new = 600
const price_slide_new = 400
const price_slide_exist = 350
const price_clipping_normal = 50
const price_clipping_hard = 150
const price_adaptation = 350


// временные переменные стоимости каждого инпута
var cost_slides_new = 0
var cost_clippings_normal_new = 0
var cost_clippings_hard_new = 0
var cost_adaptations_new = 0
var cost_slides_exist = 0
var cost_clippings_normal_exist = 0
var cost_clippings_hard_exist = 0
var cost_adaptations_exist = 0
var cost_adaptations_other = 0
var discounted_fraction = 1.00

var total_cost = 0

// обнуляем cost при открытии страницы
$(document).ready(function () {
    $('#cost').text(total_cost + "₽")
});


// События ввода в числовые инпуты и переключения чекбоксов

// NEW
$('#slides_new').on("input", function () {
    if (this.value > 1) {
        $('#alarm_new').css({"visibility": "hidden"})
        cost_slides_new = (this.value - 1) * price_slide_new + price_cover_new
    } else if (!$(this).val()) {
        $('#alarm_new').css({"visibility": "hidden"})
        cost_slides_new = 0
    } else {
        $('#alarm_new').css({"visibility": "visible"})
        cost_slides_new = 0
    }
    calculate_cost()
})

$('#clippings_normal_new').on("input", function () {
    cost_clippings_normal_new = this.value * price_clipping_normal
    calculate_cost()
})

$('#clippings_hard_new').on("input", function () {
    cost_clippings_hard_new = this.value * price_clipping_hard
    calculate_cost()
})

$('#adaptations_new').change(function () {
    if (this.checked) {
        cost_adaptations_new = $('#slides_new').val() * price_adaptation
    } else {
        cost_adaptations_new = 0
    }
    calculate_cost()
})

// EXIST
$('#slides_exist').on("input", function () {
    cost_slides_exist = this.value * price_slide_exist
    calculate_cost()
})

$('#clippings_normal_exist').on("input", function () {
    cost_clippings_normal_exist = this.value * price_clipping_normal
    calculate_cost()
})

$('#clippings_hard_exist').on("input", function () {
    cost_clippings_hard_exist = this.value * price_clipping_hard
    calculate_cost()
})

$('#adaptations_exist').change(function () {
    if (this.checked) {
        cost_adaptations_exist = $('#slides_exist').val() * price_adaptation
    } else {
        cost_adaptations_exist = 0
    }
    calculate_cost()
})

// ADAPTATIONS OTHER
$('#adaptations_other').on("input", function () {
    cost_adaptations_other = this.value * price_adaptation
    calculate_cost()
})

// DISCOUNT

// вытаскивает только числовую часть из discount
function leave_int_discount(raw_discount_val) {
    return raw_discount_val.replace(/[^\d]+/g, '');
}

// считает множитель скидки из значения discount
function discount_multiplier(discount_obj) {
    let discount_val = discount_obj.val()
    if (discount_val.length > 0) {
        let int_discount_val = leave_int_discount(discount_val)
        discounted_fraction = 1 - (int_discount_val / 100)
    } else {
        discounted_fraction = 1.00
    }
}

$('#discount').on("input", function () {
    discount_multiplier($(this))
    calculate_cost()
});


// расчет полной стоимости и вывод на экран
function calculate_cost() {
    total_cost =
        // округляем в большую сторону
        Math.ceil(
            discounted_fraction * (
                cost_slides_new +
                cost_clippings_normal_new +
                cost_clippings_hard_new +
                cost_adaptations_new +
                cost_slides_exist +
                cost_clippings_normal_exist +
                cost_clippings_hard_exist +
                cost_adaptations_exist +
                cost_adaptations_other))
    $('#cost').text(total_cost + "₽")
}


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


// функция плавного скролла вверх
function scroll_up() {
    $('body, html').animate({
        scrollTop: 0
    }, 550);
    return false;
}

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
    // скролл вверх
    $('#scrolling').click(function () {
        scroll_up()
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


// функция добавления "%" при вводе числа скидки (и удаления "%" если цифр нет)
$(document).ready(function () {
    let discount = $('#discount')
    // при вводе в инпут
    discount.on("input", function () {
        // при вставке числа 3 и более разрядов оставляет только первые 2
        if (this.value.length > 2) {
            $(this).val(function (index, old) {
                return old.slice(0, 2) + '%';
            });
        }
        // при вводе в конец добавляется %
        $(this).val(function (index, old) {
            return old.replace(/[^0-9]/g, '') + '%';
        });
        // каретка переносится перед %
        $(this).caretTo('%');
    });
    // при вводе в инпут (стирании до %) (мгновенно. работает отдельно от .on("input"))
    discount.bind("change input", function (event) {
        // если в инпуте только %, то он удаляется
        if (this.value === '%') {
            $(this).val('')
        }
    });
    // при фокусе (клике) на инпут
    discount.on("click", function () {
        // если есть % то каретка переносится перед %
        if (this.value.indexOf('%') !== -1) {
            $(this).caretTo('%')
        }
    });
    // при переносе фокуса (клике на другой элемент страницы)
    discount.blur(function () {
        // если в инпуте только %, то он удаляется
        if (this.value === '%') {
            $(this).val('')
        }
    })
});


// функция стирания данных из инпутов расчета
$(document).ready(function () {
    $('#clear_all').click(function () {
        $('.input_number, #promocode').val('');
        $('.input_number, .input_text').removeClass('input_not_empty');
        $('input[type="checkbox"]').prop("checked", false)
        disable_checkbox($('#slides_new'), $('#adaptations_new'))
        scroll_up()
    });
});


// отключение чекбоксов, если данные в кол-во слайдов не введены
function disable_checkbox(input_obj, checkbox_obj) {
    if (!input_obj.val() || input_obj.val() < 2) {
        checkbox_obj.attr("disabled", true)
    } else {
        checkbox_obj.removeAttr("disabled")
    }
}

$('#slides_new').on("input", function () {
    disable_checkbox($('#slides_new'), $('#adaptations_new'))
})


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


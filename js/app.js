let tg = window.Telegram.WebApp;
tg.expand();


// tg.MainButton.textColor = "#FFFFFF";
// tg.MainButton.color = "#2cab37";


// передача telegram_username из telegram
try {
    const tg_username = tg.initDataUnsafe.user.username;
} catch (e) {

}

// "₽";


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
        $('.input_number, #promocode').val('');
        $('.input_number, .input_text').removeClass('input_not_empty');
        $('input[type="checkbox"]').prop("checked", false)
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

var total_cost = 0
$('#cost').text(total_cost)
console.log($('#cost').textContent)
// $('#cost').textContent = ToString(0)

// events

// NEW
$('#slides_new').on("input", function () {
    if (this.value > 1) {
        $('#alarm_new').css({"visibility": "hidden"})
        cost_slides_new = (this.value - 1) * price_slide_new + price_cover_new
        calculate_cost()
    } else if (!$(this).val()) {
        $('#alarm_new').css({"visibility": "hidden"})
        cost_slides_new = 0
        calculate_cost()
        console.log(cost_slides_new)
    } else {
        $('#alarm_new').css({"visibility": "visible"})
        cost_slides_new = 0
        calculate_cost()
    }

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
        cost_adaptations_new = $('#slides_new').value * price_adaptation
        calculate_cost()
    } else {
        cost_adaptations_new = 0
    }
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
        cost_adaptations_exist = $('#slides_exist').value * price_adaptation
        calculate_cost()
    } else {
        cost_adaptations_exist = 0
    }
})

// ADAPTATIONS OTHER
$('#adaptations_other').on("input", function () {
    cost_adaptations_other = this.value * price_adaptation
    calculate_cost()
})


function calculate_cost() {
    total_cost =
        cost_slides_new +
        cost_clippings_normal_new +
        cost_clippings_hard_new +
        cost_adaptations_new +
        cost_slides_exist +
        cost_clippings_normal_exist +
        cost_clippings_hard_exist +
        cost_adaptations_exist +
        cost_adaptations_other
    console.log("total cost = " + total_cost)
    $('#cost').text(total_cost)
}


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


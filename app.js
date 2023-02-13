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

// accordion animation

$(document).ready(function() {
	$('.accordion_trigger').click(function() {
		$(this).next('.accordion_content').slideToggle(200);
	});
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


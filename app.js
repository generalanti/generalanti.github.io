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


let cost_cost = 0.07;
document.querySelector('#cost').textContent = cost_cost;


// accordion animation

// $(document).ready(function() {
// 	$('.accordion_trigger').click(function() {
// 		$(this).next('.accordion_content').slideToggle(200);
// 	});
// });


// window.onscroll = function() {add_stiky()};
//
// var cost_container = document.getElementById("cost_container");
// var sticky = cost_container.offsetTop;
//
// function add_stiky() {
//   if (window.pageYOffset >= sticky) {
//     cost_container.classList.add("sticky")
//   } else {
//     cost_container.classList.remove("sticky");
//   }
// }


window.addEventListener(
    "scroll",
    () => {
        document.body.style.setProperty(
            "--scroll",
            window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        );
    },
    false
);


const scrollable = document.querySelector('.scrollable');
const stickyProject = document.querySelector('.project')

let current = 0;
let target = 0;
const ease = 0.1;

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

function init(){
    document.body.style.height = `${scrollable.getBoundingClientRect().height}px`;
}

function smoothScroll(){
    target = window.scrollY;
    current = lerp(current, target, ease);
    scrollable.style.transform = `translate3d(0, ${-current}px, 0)`;
    sticky()
    window.requestAnimationFrame(smoothScroll);
}

function sticky(){
    let offset = window.innerHeight * 2;

    if (current >= offset){
        stickyProject.style.transform = `translate3d(0, ${current - offset}px, 0)`;
    }
}


init()
smoothScroll()














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


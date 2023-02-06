function menu_burger(){
    $('.menu-burger').on("click", function (){
        $(this).parent().toggleClass('active')
    })
}
function scrollerTop(){
    $('#topScroller').on("click", function (){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
}

$(function (){
    menu_burger();
    scrollerTop();
})

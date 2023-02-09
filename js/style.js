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
function bs_scroll(){
    let header = $('header')
    let windowWidth = window.innerWidth;
    $(window).on('scroll', function (){
        //haut de l'écran
        let scrollTopScreen = $(window).scrollTop()
        //milieu de l'écran
        let scrollMiddleScreen = scrollTopScreen + (window.innerHeight / 2)

        if ($('.single-content').length && windowWidth > 782){
            for (let i=0; i< $('.single-content h2').length; i++){
                aside_trigger(i, scrollMiddleScreen)
            }
        }

        if (window.innerWidth > 900){
            header.addClass('scroll')
        }
        if ($(window).scrollTop() === 0 || $('body').hasClass('menu')){
            header.removeClass('scroll')
        }
    })
}
function animate_text(){
    let delay = 50,
        delay_start = 0,
        contents,
        letters;

    let elem = document.querySelector(".animate-text")

    contents = elem.textContent.trim();
    elem.textContent = "";
    letters = contents.split("");
    elem.style.visibility = 'visible';

    letters.forEach(function (letter, index_1) {
        setTimeout(function () {
            elem.textContent += letter;
        }, delay_start + delay * index_1);
    });
    delay_start += delay * letters.length;
}
function aside(){
    let aside = $('.bs-aside');
    let title = $('.single-content h2');

    title.each(function (index){
        $(this).attr('id', 'chap'+(index+1))
        let content = $(this).html();
        aside.append('<a href="#chap' + (index+1) + '"></a>')
        let aside_item = $('.bs-aside a');
        aside_item.eq(index).text(content)
    })
}

function aside_responsive(){
    $('.bs-single-columns').prepend('<aside class= "back-item"></aside>')

    let back_item = $('.back-item')
    back_item.css('margin-left', window.innerWidth - 75)

    $(window).on('resize', function (){
        back_item.css('margin-left', window.innerWidth - 75)
    })

    back_item.on('click', function (){
        window.scrollTo({
            top: $('.bs-single-columns').offset().top,
            behavior: 'smooth'
        });
    })
}
function aside_trigger(index, line){
    let title = $('.single-content h2');
    let spacer = $('.wp-block-spacer');
    let top = title.eq(index).offset().top
    let bottom = spacer.eq(index).offset().top
    let aside_item = $('.bs-aside a');

    if (title.length){
        if(line > top && line < bottom){
            aside_item.eq(index).addClass('is-selected')
        }else{
            aside_item.eq(index).removeClass('is-selected')
        }
    }
}
function aside_height(){
    let aside = $('.bs-aside')
    aside.css('max-height', window.innerHeight - 100)
}

$(function (){
    let windowWidth = window.innerWidth;

    menu_burger();
    scrollerTop();
    bs_scroll();

    if(windowWidth > 782 && $('.animate-text').length){
        animate_text()
    }

    if ($('.bs-aside').length){
        aside()
        $(window).on('resize', function (){
            aside_height()
            if(windowWidth > 782){
                aside_height()
            }
            if (windowWidth < 782){
                aside_responsive()
            }
        })
        if(windowWidth > 782){
            aside_height()
        }
        if (windowWidth < 782){
            aside_responsive()
        }
    }
})

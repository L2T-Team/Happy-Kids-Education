$(function () {
  $('.zoom').hover(function () {
    $(this).addClass('animated pulse')
    $(this).one('animationend', function () {
      $(this).removeClass('animated pulse')
    })
    $(this).one('mouseleave', function () {
      $(this).removeClass('animated pulse')
    })
  })
})
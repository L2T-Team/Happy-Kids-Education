(function ($) {
  // Search
  var $searchWrap = $("#search-form-wrap"),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $(".nav-search-btn").on("click", function () {
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass("on");
    stopSearchAnim(function () {
      $(".search-form-input").focus();
    });
  });

  $(".search-form-input").on("blur", function () {
    startSearchAnim();
    $searchWrap.removeClass("on");
    stopSearchAnim();
  });

  // Share
  $("body")
    .on("click", function () {
      $(".article-share-box.on").removeClass("on");
    })
    .on("click", ".article-share-link", function (e) {
      e.stopPropagation();

      var $this = $(this),
        url = $this.attr("data-url"),
        encodedUrl = encodeURIComponent(url),
        id = "article-share-box-" + $this.attr("data-id"),
        title = $this.attr("data-title"),
        offset = $this.offset();

      if ($("#" + id).length) {
        var box = $("#" + id);

        if (box.hasClass("on")) {
          box.removeClass("on");
          return;
        }
      } else {
        var html = ['<div id="' + id + '" class="article-share-box">', '<input class="article-share-input" value="' + url + '">', '<div class="article-share-links">', '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + "&url=" + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"><span class="fa fa-twitter"></span></a>', '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"><span class="fa fa-facebook"></span></a>', '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"><span class="fa fa-pinterest"></span></a>', '<a href="https://www.linkedin.com/shareArticle?mini=true&url=' + encodedUrl + '" class="article-share-linkedin" target="_blank" title="LinkedIn"><span class="fa fa-linkedin"></span></a>', "</div>", "</div>"].join("");

        var box = $(html);

        $("body").append(box);
      }

      $(".article-share-box.on").hide();

      box
        .css({
          top: offset.top + 25,
          left: offset.left,
        })
        .addClass("on");
    })
    .on("click", ".article-share-box", function (e) {
      e.stopPropagation();
    })
    .on("click", ".article-share-box-input", function () {
      $(this).select();
    })
    .on("click", ".article-share-box-link", function (e) {
      e.preventDefault();
      e.stopPropagation();

      window.open(this.href, "article-share-box-window-" + Date.now(), "width=500,height=450");
    });

  // Caption
  $(".article-entry").each(function (i) {
    $(this)
      .find("img")
      .each(function () {
        if ($(this).parent().hasClass("fancybox") || $(this).parent().is("a")) return;

        var alt = this.alt;

        if (alt) $(this).after('<span class="caption">' + alt + "</span>");

        $(this).wrap('<a href="' + this.src + '" data-fancybox="gallery" data-caption="' + alt + '"></a>');
      });

    $(this)
      .find(".fancybox")
      .each(function () {
        $(this).attr("rel", "article" + i);
      });
  });

  if ($.fancybox) {
    $(".fancybox").fancybox();
  }

  // Mobile nav
  var $container = $("#container"),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $("#main-nav-toggle").on("click", function () {
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass("mobile-nav-on");
    stopMobileNavAnim();
  });

  $("#wrap").on("click", function () {
    if (isMobileNavAnim || !$container.hasClass("mobile-nav-on")) return;

    $container.removeClass("mobile-nav-on");
  });

  $(".zoom").hover(function () {
    $(this).addClass("animated pulse");
    $(this).one("animationend", function () {
      $(this).removeClass("animated pulse");
    });
    $(this).one("mouseleave", function () {
      $(this).removeClass("animated pulse");
    });
  });

  // AUTO SLIDERS
  $(document).ready(function () {
    const slideInterval = 4000;  // THE TIMER FOR SLIDER
    const numberOfSlides = $(".slide-container").length;
    let currentSlide = 0;

    function changeSlide(index) {
      try {
        const radioButtons = document.querySelectorAll('input[name="radio-buttons"]');
        radioButtons.forEach(radioButton => radioButton.checked = false);
        radioButtons[index].checked = true;
        currentSlide = index;
      } catch (error) {}
    }

    setInterval(() => {
      const nextSlideIndex = currentSlide === (numberOfSlides - 1) ? 0 : (currentSlide % numberOfSlides) + 1;
      changeSlide(nextSlideIndex);
    }, slideInterval);

    const nextButton = $('.next-slide');
    const prevButton = $('.prev-slide');

    nextButton.click(function () {
      console.log("NUMBER: ", (currentSlide % numberOfSlides) + 1)
      changeSlide((currentSlide % numberOfSlides) + 1);
    });

    prevButton.click(function () {
      console.log("NUMBER: ", (currentSlide % numberOfSlides) + 1)

      changeSlide((currentSlide === 0) ? numberOfSlides : currentSlide - 1);
    });
  });

})(jQuery);

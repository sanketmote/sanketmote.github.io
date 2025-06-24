// Enhanced Animations for Sanket Mote Portfolio

(function($) {
  'use strict';

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Loading Animation
  $(window).on('load', function() {
    $('.loading').addClass('hidden');
    setTimeout(function() {
      $('.loading').hide();
    }, 500);
  });

  // Scroll-triggered animations
  function animateOnScroll() {
    $('.fade-in-up').each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('animate');
      }
    });

    $('.scale-in').each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('animate');
      }
    });

    $('.slide-in-left').each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('animate');
      }
    });

    $('.slide-in-right').each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('animate');
      }
    });
  }

  // Initialize scroll animations
  $(window).on('scroll', animateOnScroll);
  $(document).ready(animateOnScroll);

  // Enhanced hover effects
  $('.service-item').hover(
    function() {
      $(this).addClass('pulse');
    },
    function() {
      $(this).removeClass('pulse');
    }
  );

  // Profile icons hover effect
  $('.profile').hover(
    function() {
      $(this).addClass('bounce');
    },
    function() {
      $(this).removeClass('bounce');
    }
  );

  // Typing animation for headings
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.html('');
    
    function type() {
      if (i < text.length) {
        element.html(element.html() + text.charAt(i));
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Initialize typing animation when section is visible
  $('.section-heading h2').each(function() {
    var $this = $(this);
    var originalText = $this.text();
    
    $(window).on('scroll', function() {
      var elementTop = $this.offset().top;
      var elementBottom = elementTop + $this.outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        if (!$this.hasClass('typed')) {
          $this.addClass('typed');
          typeWriter($this, originalText, 50);
        }
      }
    });
  });

  // Enhanced menu toggle with animation
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var close = document.getElementById("menu-close");

  toggle.addEventListener("click", function(e) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      menu.classList.add("shake");
      setTimeout(function() {
        menu.classList.remove("shake");
      }, 500);
    } else {
      menu.classList.add("open");
      menu.classList.add("fade-in");
    }
  });

  close.addEventListener("click", function(e) {
    menu.classList.remove("open");
    menu.classList.add("shake");
    setTimeout(function() {
      menu.classList.remove("shake");
    }, 500);
  });

  // Smooth scrolling with enhanced animation
  $(".main-menu a").on("click", function(e) {
    e.preventDefault();
    var target = $(this).attr("href");
    var $target = $(target);
    
    if ($target.length) {
      $('html, body').animate({
        scrollTop: $target.offset().top - 80
      }, 1000, 'easeInOutQuart');
    }
    
    // Close menu on mobile
    if ($(window).width() < 846) {
      menu.classList.remove("open");
    }
  });

  // Enhanced isotope items animation
  $('.isotope-item-0').hover(
    function() {
      $(this).addClass('glow');
    },
    function() {
      $(this).removeClass('glow');
    }
  );

  // Project cards hover effect
  $('.service-item-2').hover(
    function() {
      $(this).find('img').addClass('scale-in');
    },
    function() {
      $(this).find('img').removeClass('scale-in');
    }
  );

  // Timeline items animation
  $('.act').hover(
    function() {
      $(this).addClass('slide-in-left');
    },
    function() {
      $(this).removeClass('slide-in-left');
    }
  );

  // Parallax effect for background
  $(window).on('scroll', function() {
    var scrolled = $(window).scrollTop();
    var parallax = $('.parallax');
    var speed = 0.5;
    
    parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
  });

  // Enhanced form interactions (if any forms are added later)
  $('input, textarea').focus(function() {
    $(this).parent().addClass('focused');
  }).blur(function() {
    if (!$(this).val()) {
      $(this).parent().removeClass('focused');
    }
  });

  // Counter animation for statistics (if any are added)
  function animateCounter(element, target, duration = 2000) {
    var start = 0;
    var increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.text(Math.floor(start));
        requestAnimationFrame(updateCounter);
      } else {
        element.text(target);
      }
    }
    
    updateCounter();
  }

  // Initialize counters when they come into view
  $('.counter').each(function() {
    var $this = $(this);
    var target = parseInt($this.data('target'));
    
    $(window).on('scroll', function() {
      var elementTop = $this.offset().top;
      var elementBottom = elementTop + $this.outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        if (!$this.hasClass('counted')) {
          $this.addClass('counted');
          animateCounter($this, target);
        }
      }
    });
  });

  // Enhanced image loading with fade-in effect
  $('img').on('load', function() {
    $(this).addClass('fade-in');
  });

  // Add floating effect to certain elements
  $('.floating').each(function(index) {
    $(this).css('animation-delay', (index * 0.2) + 's');
  });

  // Enhanced mobile menu
  $(window).on('resize', function() {
    if ($(window).width() < 846) {
      $(".main-menu a").on("click", function() {
        menu.classList.remove("open");
      });
    }
  });

  // Add smooth transitions to all interactive elements
  $('a, button, .service-item, .isotope-item-0, .profile').css({
    'transition': 'all 0.3s ease'
  });

  // Enhanced scroll indicator
  $(window).on('scroll', function() {
    var scrolled = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = (scrolled / height) * 100;
    
    // Create progress bar if it doesn't exist
    if ($('.scroll-progress').length === 0) {
      $('body').append('<div class="scroll-progress"></div>');
      $('.scroll-progress').css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '0%',
        'height': '3px',
        'background': 'linear-gradient(90deg, #667eea, #764ba2)',
        'z-index': '9999',
        'transition': 'width 0.3s ease'
      });
    }
    
    $('.scroll-progress').css('width', progress + '%');
  });

  // Add CSS for scroll progress bar
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
      }
    `)
    .appendTo('head');

})(jQuery); 
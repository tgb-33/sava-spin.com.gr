/*
* ----------------------------------------------------------------------------------------
Author       : Tanvir Hossain
Template Name: Wize - Creative Personal Portfolio
Version      : 1.0
* ----------------------------------------------------------------------------------------
*/


(function($) {

    "use strict";

    $(document).ready(function() {

        /*
         * ----------------------------------------------------------------------------------------
         *  EXTRA JS - Close mobile menu on link click
         * ----------------------------------------------------------------------------------------
         */
        // Используем делегирование событий на случай динамического добавления ссылок
        $('.main-header .navigation').on('click', '.nav-link-click', function(e) {
            var $this = $(this);
            var $parentLi = $this.closest('li');
            var $navbarCollapse = $('.navbar-collapse'); // Находим актуальный элемент

            // Закрываем меню только если это НЕ родительский пункт с href="#" ИЛИ если это обычная ссылка
            if (!$parentLi.hasClass('has-children') || ($this.attr('href') && $this.attr('href') !== '#')) {
                // Проверяем, видимо ли меню (особенно на мобильных)
                if ($('body').hasClass('mobile-menu-visible') || $navbarCollapse.is(':visible')) {
                    // Убираем класс с body
                    $('body').removeClass('mobile-menu-visible');
                    // Убираем класс active с кнопки-бургера
                    $('.mobile-menu-toggle').removeClass('active');
                    // Скрываем сам блок меню с анимацией (надежнее)
                    if ($navbarCollapse.length > 0 && $(window).innerWidth() < 992) {
                         $navbarCollapse.slideUp(250); // Плавно скрыть
                    }

                    // Закрываем ВСЕ открытые подменю при закрытии основного
                     $('.main-header .navigation li.has-children.submenu-open')
                         .removeClass('submenu-open')
                         .children('ul.sub-menu').slideUp(200); // Скрываем подменю
                     // Убираем поворот у ВСЕХ иконок
                     $('.main-header .navigation li.has-children .dropdown-btn i').removeClass('rotate-180');
                }
            }
            // Важно: Если это ссылка href="#" внутри has-children, то клик по ней обработается ниже
            // и не должен закрывать меню сразу же. Поэтому здесь нет else.
        });


        /*
         * ----------------------------------------------------------------------------------------
         *  HEADER STYLE JS (Fix on scroll)
         * ----------------------------------------------------------------------------------------
         */
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollAmount = 100; // Порог фиксации хедера
                if (windowpos >= scrollAmount) {
                    siteHeader.addClass('fixed-header');
                } else {
                    siteHeader.removeClass('fixed-header');
                }
            }
        }
        headerStyle(); // Вызов при загрузке
        $(window).on('scroll', headerStyle); // Вызов при скролле


        /*
         * ----------------------------------------------------------------------------------------
         *  MAGNIFIC POPUP JS
         * ----------------------------------------------------------------------------------------
         */
        if ($.fn.magnificPopup) {
            // Image popups
            $('.work-popup').magnificPopup({
                 type: 'image',
                 removalDelay: 300, // Delay removal for animation
                 mainClass: 'mfp-with-zoom', // Animation class
                 gallery: { enabled: true }, // Enable gallery mode
                 zoom: { enabled: false } // Disable zoom effect if not needed
            });
            // Iframe popups (Youtube, Vimeo, Google Maps)
            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                 disableOn: 700, // Disable on smaller screens
                 type: 'iframe',
                 mainClass: 'mfp-fade', // Fade animation
                 removalDelay: 160,
                 preloader: false, // Disable preloader if not needed
                 fixedContentPos: false // Better handling on mobile
             });
        }

        /*
         * ----------------------------------------------------------------------------------------
         *  SCROLL TO UP JS
         * ----------------------------------------------------------------------------------------
         */
         var progressWrap = document.querySelector('.progress-wrap');
         if (progressWrap) {
            var progressPath = document.querySelector('.progress-wrap path');
             if (progressPath) {
                var pathLength = 0;
                try {
                    pathLength = progressPath.getTotalLength(); // May throw error in some environments
                 } catch (e) {
                    console.warn("Could not get total length of SVG path.", e);
                    progressWrap.style.display = 'none'; // Hide if error
                }

                if (pathLength > 0) {
                     progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
                     progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
                     progressPath.style.strokeDashoffset = pathLength;
                     progressPath.getBoundingClientRect(); // Trigger reflow
                     progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

                     var updateProgress = function() {
                         try {
                             var scroll = $(window).scrollTop();
                             var height = $(document).height() - $(window).height();
                             // Avoid division by zero and handle negative scroll values
                             var progress = height > 0 ? pathLength - (Math.max(0, scroll) * pathLength / height) : 0;
                             progressPath.style.strokeDashoffset = Math.max(0, Math.min(progress, pathLength));
                         } catch (e) {
                             console.error("Error updating scroll progress:", e);
                         }
                     }
                     updateProgress(); // Initial update
                     $(window).on('scroll', updateProgress); // Update on scroll

                     var offset = 150; // Show button after scrolling this amount
                     var duration = 550; // Animation duration for scrolling to top

                     $(window).on('scroll', function() {
                         if ($(this).scrollTop() > offset) {
                             $(progressWrap).addClass('active-progress'); // Use jQuery for class manipulation
                         } else {
                             $(progressWrap).removeClass('active-progress');
                         }
                     });

                     $(progressWrap).on('click', function(event) {
                         event.preventDefault();
                         $('html, body').animate({ scrollTop: 0 }, duration);
                         return false;
                     });
                 } else {
                     progressWrap.style.display = 'none'; // Hide if pathLength is 0
                 }
            } else {
                 if (progressWrap) progressWrap.style.display = 'none'; // Hide if path element not found
            }
        }

        /* ==========================================================================
           SCROLLER ANIMATION (Company Logos) - Optional, keep if used
           ========================================================================== */
        const scrollers = document.querySelectorAll(".scroller");
        if (scrollers.length > 0) {
             // Check for reduced motion preference
             if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                 addAnimation();
             }

             function addAnimation() {
                scrollers.forEach((scroller) => {
                    scroller.setAttribute("data-animated", true); // Mark as animated

                    const scrollerInner = scroller.querySelector(".scroller__inner");
                    if (scrollerInner) {
                        const scrollerContent = Array.from(scrollerInner.children);
                        if (scrollerContent.length > 0) {
                           // Duplicate items for seamless scrolling
                           scrollerContent.forEach((item) => {
                                const duplicatedItem = item.cloneNode(true);
                                duplicatedItem.setAttribute("aria-hidden", true); // Hide from screen readers
                                scrollerInner.appendChild(duplicatedItem);
                            });
                        } else {
                             console.warn("Scroller inner content is empty.");
                         }
                    } else {
                        console.warn("Scroller inner element not found.");
                    }
                });
             }
        }

        /*
         * ----------------------------------------------------------------------------------------
         *  CUSTOM CURSOR JS - Optional, keep if used
         * ----------------------------------------------------------------------------------------
         */
         const cursorBall = document.getElementById('ball'); // Assuming these IDs exist in HTML
         const magicCursor = document.getElementById('magic-cursor');

         // Check if GSAP is loaded and elements exist
         if (typeof gsap !== 'undefined' && cursorBall && magicCursor) {
            gsap.set(magicCursor, { opacity: 0 }); // Initially hide

            // Move cursor on mouse move
            document.addEventListener('mousemove', function(e) {
                 gsap.to(magicCursor, {
                     duration: 0.3,
                     x: e.clientX,
                     y: e.clientY,
                     ease: 'power2.out' // Smooth easing
                 });
            });

            // Fade in/out on entering/leaving the window
            document.addEventListener('mouseenter', () => {
                 gsap.to(magicCursor, { duration: 0.3, opacity: 1 });
            });
            document.addEventListener('mouseleave', () => {
                 gsap.to(magicCursor, { duration: 0.3, opacity: 0 });
            });

            // Scale effect on hovering specific elements
            const hoverElements = document.querySelectorAll('a, button, .cursor-pointer'); // Select interactive elements
            hoverElements.forEach(function(element) {
                element.addEventListener('mouseenter', function() {
                    magicCursor.classList.add('hovered'); // Add class for potential style changes
                    gsap.to(magicCursor, { duration: 0.3, scale: 1.5, ease: 'power1.out' });
                });
                element.addEventListener('mouseleave', function() {
                    magicCursor.classList.remove('hovered');
                    gsap.to(magicCursor, { duration: 0.3, scale: 1, ease: 'power2.out' });
                });
            });
         } else {
            // console.log("GSAP or cursor elements not found, custom cursor disabled.");
         }

        /*
         * ----------------------------------------------------------------------------------------
         *  MOBILE MENU & DROPDOWN LOGIC (Revised for Clarity)
         * ----------------------------------------------------------------------------------------
         */

         // --- Mobile Menu Toggle (Burger Click) ---
        if ($('.mobile-menu-toggle').length) {
             $('.mobile-menu-toggle').on('click', function(e) {
                 e.preventDefault(); // Prevent default button action
                 console.log("Mobile toggle clicked"); // Debug log

                 // Toggle class on body to control global state
                 $('body').toggleClass('mobile-menu-visible');

                 // Toggle active class on the burger button itself (for styling the 'X')
                 $(this).toggleClass('active');

                 // Toggle the visibility of the main menu container
                 var $navbarCollapse = $('.navbar-collapse');
                 if ($navbarCollapse.length > 0) {
                    $navbarCollapse.slideToggle(300); // Use slide animation
                 } else {
                     console.error("'.navbar-collapse' element not found for mobile menu.");
                 }

                // If opening the menu, ensure no submenus are lingering open
                if ($('body').hasClass('mobile-menu-visible')) {
                    // Optionally close any open submenus when main menu opens
                    // $('.main-header .navigation li.has-children.submenu-open')
                    //    .removeClass('submenu-open')
                    //    .children('ul.sub-menu').hide(); // Hide immediately
                    // $('.main-header .navigation li.has-children .dropdown-btn i').removeClass('rotate-180');
                } else {
                    // If closing the main menu, ensure all submenus are closed too
                     $('.main-header .navigation li.has-children.submenu-open')
                        .removeClass('submenu-open')
                        .children('ul.sub-menu').slideUp(200); // Animate closing
                     $('.main-header .navigation li.has-children .dropdown-btn i').removeClass('rotate-180');
                 }
             });
        }

         // --- Dropdown Submenu Logic ---
         if ($('.main-header .navigation li.has-children').length) {
             // Add dropdown button IF it doesn't exist
             $('.main-header .navigation li.has-children').each(function() {
                 if ($(this).find('.dropdown-btn').length === 0) {
                     $(this).append('<button type="button" class="dropdown-btn"><i class="ri-arrow-down-s-line"></i></button>');
                 }
             });

             // --- Click on Dropdown Button (Arrow) ---
             // Use event delegation for dynamically added buttons
             $('.main-header .navigation').on('click', 'li.has-children > .dropdown-btn', function(e) {
                 e.preventDefault(); // Prevent button default action
                 e.stopPropagation(); // Stop click from bubbling up to parent li/a
                 console.log("Submenu toggle button clicked"); // Debug log

                 var $parentLi = $(this).closest('li'); // Get the parent LI
                 var $subMenu = $parentLi.children('ul.sub-menu'); // Get the direct child submenu

                 // --- Close other open submenus on the same level ---
                 $parentLi.siblings('.has-children.submenu-open').each(function(){
                     $(this).removeClass('submenu-open'); // Remove class
                     $(this).children('ul.sub-menu').slideUp(300); // Animate closing
                     $(this).find('.dropdown-btn i').removeClass('rotate-180'); // Reset icon rotation
                 });

                 // --- Toggle the current submenu ---
                 $parentLi.toggleClass('submenu-open'); // Toggle state class on LI
                 $subMenu.slideToggle(300); // Animate open/close
                 $(this).find('i').toggleClass('rotate-180'); // Toggle icon rotation class
             });

             // --- Click on Parent Link (e.g., <a href="#">) on Mobile ---
             // Use event delegation
             $('.main-header .navigation').on('click', 'li.has-children > a', function(e) {
                 // Check if on mobile viewport AND the link is effectively '#' or empty
                 if ($(window).innerWidth() < 992 && ($(this).attr('href') === '#' || $(this).attr('href') === '' || $(this).attr('href') === '/#')) { // Added '/#' check
                     e.preventDefault(); // Prevent jumping to top or navigating
                     console.log("Parent link (# or empty) clicked on mobile"); // Debug log

                     // Trigger a click on the sibling dropdown button to open/close the submenu
                     // Use .find() relative to parent LI to be safer
                     $(this).closest('li').find('.dropdown-btn').trigger('click');
                 }
                 // If it's a real link or on desktop, the link will navigate as usual (and the menu closing logic at the top will handle it)
             });
         }


        // ## Testimonials Active - Optional, keep if used
        if ($('.testimonials-wrap').length && $.fn.slick) {
            $('.testimonials-wrap').slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000, // Slower speed
                arrows: true,
                speed: 1000,
                focusOnSelect: false,
                prevArrow: '.testimonial-prev', // Ensure these selectors exist in HTML
                nextArrow: '.testimonial-next', // Ensure these selectors exist in HTML
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 767, // On screens smaller than 767px
                        settings: {
                            slidesToShow: 1 // Show only 1 testimonial
                        }
                    }
                ]
            });
        }

        // ## Project Filter - Optional, keep if used and Isotope is loaded
        if ($('.project-filter li').length && $('.project-masonry-active').length) {
             // Check if Isotope and imagesLoaded are available
             if (typeof $.fn.imagesLoaded !== 'undefined' && typeof $.fn.isotope !== 'undefined') {
                 var $container = $('.project-masonry-active');

                 // Initialize Isotope after images have loaded
                 $container.imagesLoaded( function() {
                     $container.isotope({
                         itemSelector: '.item', // Selector for grid items
                         layoutMode: 'masonry' // Or 'fitRows', etc.
                     });
                 });

                 // Filter items on button click
                 $(".project-filter li").on('click', function() {
                     $(".project-filter li").removeClass("current"); // Remove active class from all
                     $(this).addClass("current"); // Add active class to clicked item

                     var selector = $(this).attr('data-filter'); // Get the filter value

                     // Apply the filter to Isotope
                     $container.isotope({
                         filter: selector
                     });
                 });
             } else {
                 console.warn("Isotope or imagesLoaded jQuery plugin not available for project filter.");
             }
        }

        /* ## Fact Counter - Optional, keep if used and Appear.js is loaded */
        if ($('.counter-text-wrap').length && $.fn.appear) {
            $('.counter-text-wrap').appear(function() {
                 var $t = $(this);
                 // Check if it hasn't been counted already
                 if (!$t.hasClass("counted")) {
                    $t.addClass("counted"); // Mark as counted

                    var $countText = $t.find(".count-text");
                    var stop = parseInt($countText.attr("data-stop"), 10);
                    var speed = parseInt($countText.attr("data-speed"), 10) || 2000; // Default speed

                    // Animate the count
                    $({ countNum: $countText.text() }).animate({ countNum: stop }, {
                        duration: speed,
                        easing: "linear", // Or 'swing'
                        step: function() {
                            $countText.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $countText.text(this.countNum); // Ensure final value is set
                        }
                    });
                 }
            }, { accY: 0 }); // Trigger when the element is 0px below the viewport
        }

        // ## Scroll to Target - Optional, keep if used
        if ($('.scroll-to-target').length) {
            $(".scroll-to-target").on('click', function(e) {
                e.preventDefault(); // Prevent default anchor behavior
                var targetSelector = $(this).attr('data-target'); // Get target selector from data attribute
                var $target = $(targetSelector);

                if ($target.length) { // Check if target exists
                    $('html, body').animate({
                        scrollTop: $target.offset().top // Scroll to target's top offset
                    }, 1000); // Animation duration
                } else {
                    console.warn("Scroll target not found:", targetSelector);
                }
                return false; // Prevent further event propagation
            });
        }

        // ## Nice Select - Optional, keep if used and NiceSelect is loaded
        if ($.fn.niceSelect) {
            try {
                $('select').niceSelect(); // Apply NiceSelect to all select elements
             } catch(e) {
                 console.warn("NiceSelect initialization error:", e);
             }
        }

        // ## WOW Animation - Optional, keep if used and WOW.js is loaded
        if (typeof WOW === 'function') {
            try {
                 new WOW({
                     mobile: false // Disable WOW animations on mobile devices (optional)
                 }).init();
             } catch(e) {
                 console.warn("WOW.js initialization error:", e);
             }
        }

    }); // --- End document.ready ---


    /* ==========================================================================
       When document is loaded, do (Preloader, Isotope init)
       ========================================================================== */
    $(window).on('load', function() {

        // --- Preloader Animation ---
        const preloader = document.querySelector(".preloader");
        const svg = document.getElementById("preloaderSvg"); // Ensure this ID exists in HTML
        const loadText = document.querySelector(".preloader-heading .load-text"); // Ensure this selector exists

        // Check if GSAP is loaded and elements exist
        if (preloader && svg && loadText && typeof gsap !== 'undefined') {
             const tl = gsap.timeline({
                 onComplete: () => { // Function to run after timeline completes
                    if (preloader) {
                        // Use GSAP for smoother fade out/removal
                        gsap.to(preloader, { duration: 0.3, opacity: 0, onComplete: () => preloader.style.display = "none" });
                    }
                 }
             });

             const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z"; // SVG path for curve animation
             const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z"; // SVG path for flat animation

             tl.to(loadText, { delay: 1.2, y: -100, opacity: 0 }); // Animate text out
             tl.to(svg, { duration: 0.5, attr: { d: curve }, ease: "power2.easeIn" }) // Morph SVG to curve
               .to(svg, { duration: 0.5, attr: { d: flat }, ease: "power2.easeOut" }); // Morph SVG to flat
             tl.to(preloader, { duration: 0.7, y: "-110%", ease: "power2.in" }, "-=0.5"); // Animate preloader up slightly overlapping
             // tl.set(preloader, { display: "none" }); // Handled by onComplete now

        } else {
             // Fallback if GSAP or elements are missing
             if (preloader) {
                 preloader.style.display = "none";
                 console.log("Preloader hidden via fallback (GSAP or elements missing).");
             }
        }

         // --- Initialize Isotope Layouts After Images Loaded ---
         // Ensure Isotope and imagesLoaded are available
         if (typeof $.fn.imagesLoaded !== 'undefined' && typeof $.fn.isotope !== 'undefined') {
             // Project Masonry
            var $masonry = $('.project-masonry-active');
             if ($masonry.length) {
                 $masonry.imagesLoaded( function() {
                     $masonry.isotope({
                         itemSelector: '.item',
                         layoutMode: 'masonry' // Or 'fitRows'
                     });
                 });
             }

             // Blog Standard Layout (if using Masonry)
             var $blogWrap = $('.blog-standard-wrap'); // Ensure this class exists on the container
             if ($blogWrap.length) {
                 $blogWrap.imagesLoaded( function() {
                     $blogWrap.isotope({
                         itemSelector: '.item', // Ensure blog items have this class
                         layoutMode: 'masonry' // Or 'fitRows'
                     });
                 });
             }
         } else {
             // console.warn("Isotope or imagesLoaded not available for layout initialization.");
         }

    }); // --- End window.load ---

})(window.jQuery); // Pass jQuery to the closure
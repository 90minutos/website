function removeHours(e) {
    $(e).parent(".hours-range").remove();
    let a = e.dataset.day,
        t = $(".day-" + a + " .hours-range").length;
    if (t > 1) {
        let e = 1;
        $(".day-" + a + " .extra-hours-range").each((function(t) { e = t + 2, $(this).find(".hour-from").attr("name", a + "-from-" + e), $(this).find(".hour-to").attr("name", a + "-to-" + e) }))
    }
    t < 3 && $(".day-" + a).removeClass("full")
}
$ = jQuery.noConflict(), $('[href="#"]').click((function(e) { e.preventDefault() })), $(".btn-main-menu").click((function() {
    let e = $(".main-menu-overlay"),
        a = $("#main-menu-wrapper");
    e.fadeIn(300), e.addClass("active"), a.fadeIn(300), a.addClass("active")
})), $(".btn-close-menu").click((function() {
    let e = $(".main-menu-overlay"),
        a = $("#main-menu-wrapper");
    e.removeClass("active"), a.removeClass("active")
})), $(".main-menu-overlay").click((function() {
    let e = $(".main-menu-overlay"),
        a = $("#main-menu-wrapper");
    e.removeClass("active"), a.removeClass("active")
})), $(document).ready((function() {
    $(".gallery-carousel")[0] && ($(".gallery-carousel").slick({ slidesToShow: 1, slidesToScroll: 1, arrows: !0 }), $(".thumbnails-carousel").slick({ slidesToShow: 4, slidesToScroll: 1, asNavFor: ".gallery-carousel", focusOnSelect: !1, responsive: [{ breakpoint: 576, settings: { arrows: !1, slidesToScroll: 1 } }] }), $(".thumbnails-carousel .slick-slide").on("click", (function(e) { $(".thumbnails-carousel .slick-current").removeClass("slick-current"), $(this).addClass("slick-current"), $(".gallery-carousel").slick("slickGoTo", $(this).data("slickIndex")) })), $(".gallery-carousel-item figure, .gallery-carousel-item .open-lightbox").click((function(e) {
        const a = $(this).parents(".slick-gallery")[0],
            t = $(a).find(".lightbox-gallery")[0];
        $(t).slick("slickGoTo", $(e.target).attr("slide")), $("#header").hide();
        const l = $(a).find(".lightbox-gallery-container")[0];
        $(l).addClass("opened")
    })), $(".lightbox-gallery").slick({ infinite: !1 }), $(".close-lightbox").click((function(e) {
        const a = $(this).parents(".lightbox-gallery-container")[0];
        $(a).removeClass("opened"), $("#header").show()
    })))
})), $(document).ready((function() { $(".wpcf7-form").removeAttr("novalidate") })), window.onload = () => {
    if (document.querySelector(".image-selector")) {
        let uploaders = document.getElementsByClassName("uploader");
        for (let index = 0; index < uploaders.length; index++) {
            uploaders[index].addEventListener("change", (function(t) {
                let l = new FileReader;
                l.onload = function(e) { $(".uploader img").eq(index).attr("src", e.target.result) }, l.readAsDataURL(t.target.files[0]), changeImageButtons[index].classList.add("active"), document.querySelector(".uploader .wpcf7-not-valid-tip") && uploaders[index].classList.remove("wpcf7-not-valid")
            }), !1);
        }
        let changeImageButtons = document.getElementsByClassName("btn-change-image");
        let filephotos = document.getElementsByClassName("filephotoclass");
        for (let index = 0; index < changeImageButtons.length; index++) {
            changeImageButtons[index].addEventListener("click", (function() {
                filephotos[index].click();
            }))
        }
    }
    if (document.querySelector(".hours-selector")) {
        let e, a = document.querySelectorAll(".hours-selector .day");
        for (let t of Object.values(a)) {
            let a = t.querySelector(".switch-day input");
            a.addEventListener("change", (function() { e = a.name, a.checked ? ($(".day-" + e + " .hour").prop("required", !0), t.classList.add("active")) : (t.classList.remove("active"), $(".day-" + e + " .hour").prop("required", !1)) })), t.querySelector(".add-hours").addEventListener("click", a => {
                a.preventDefault();
                let l = t.querySelector(".values"),
                    r = t.querySelectorAll(".hours-range").length + 1;
                if (r <= 3) {
                    let a = '<div class="hours-range extra-hours-range"><div class="inputs"><input type="text" name="' + e + "-from-" + r + '" placeholder="ej: 08:00 am" class="hour hour-from" required><span>-</span><input type="text" name="' + e + "-to-" + r + '"placeholder="ej: 12:00 pm" class="hour hour-to" required></div><button type="button" class="btn-remove" data-day="' + e + '" aria-label="Quitar" onClick="removeHours(this)"><span class="icon icon-close"></span></button></div>';
                    $(l).append(a)
                }
                r >= 3 && t.classList.add("full")
            })
        }
    }
}, $(document).ready((function() {
    if ($(".tabs-card")[0]) {
        const e = new Date,
            a = 0 === e.getDay() || 6 === e.getDay() ? 0 : e.getDay() - 1;
        $(".tabs-card .tabs").slick({ arrows: !1, asNavFor: ".tabs-card .body", focusOnSelect: !0, initialSlide: a, slidesToShow: 3, slidesToScroll: 1 }), $(".tabs-card .body").slick({ arrows: !1, asNavFor: ".tabs-card .tabs", initialSlide: a, slidesToShow: 1, slidesToScroll: 1 })
    }
}));
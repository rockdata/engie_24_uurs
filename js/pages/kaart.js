'use strict';

let kaart = {
    initSlider: function() {
        var bridges = [],
            host = window.location.origin;
        $.getJSON(host + "/bridges.json?a=" + new Date().getTime(), 
            function(data) {
            data.bridges.sort(sortByProperty("id"));    
            $.each(data.bridges, function(i, f) {
                var slide = "",
                    responsive = "",
                    icon = "",
                    state = "",
                    popup = "",
                    host = window.location.origin,
                    hideDownload = "",
                    hidePopup = "";

                if (f.type == "car") {
                    icon = "car-icon";
                } else {
                    icon = "boat-icon";
                }

                if (f.popup_content == "-") {
                    hidePopup = " hide";
                }

                if (f.download_url == "-") {
                    hideDownload = " hide";
                }                

                if (f.state == "P") {
                    state = "in-progress";
                } else if (f.state == "NP") {
                    state = "not-planned";
                } else if (f.state == "WIP") {
                    state = "work-in-progress";
                } else if (f.state == "D") {
                    state = "done";
                }

                if (f.show == "yes") {
                    slide = "<div class='swiper-slide " + state + "'><div class='swipper-slide-inner' data-index='" + f.id + "'><div class='img-wrap'>" + "<img src='" + host + f.image_url + "' alt='' /></div>";
                    slide += "<div class='slide-inner'><div class='title-wrap'><h3 class='title'>" + f.name + "</h3><span class='tooltip-text'>" + f.name + "</span>";
                    slide += "<i class=" + icon + "></i></div>";
                    slide += "<p class='info'>" + f.info + "</p>";
                    slide += "</div><a href='" + host + f.download_url + "' class='link left" + hideDownload + "' download><span>DOWNLOAD </span>OMLEIDING</a><a href='javascript:;' class='link right overlay" + hidePopup + "' data-index='" + f.id +"'><span>MEER </span>INFORMATIE</a></div></div>";

                    $(slide).appendTo(".swiper-wrapper");

                    responsive = "<div class='bridge " + state + "' data-index='" + f.id +"'>";
                    responsive += "<div class='title-wrap'><h3 class='title'>" + f.name + "</h3><i class=" + icon + "></i></div>";
                    responsive += "<p class='info'>" + f.info + "</p>";
                    responsive += "<a href='" + host + f.download_url + "' class='link left" + hideDownload + "' download><span>DOWNLOAD </span>OMLEIDING</a><a href='javascript:;' class='link right overlay" + hidePopup + "' data-index='" + f.id +"'><span>MEER </span>INFORMATIE</a></div>";

                    $(responsive).appendTo(".bridges-responsive");

                    popup = "<div class='popup' data-index='" + f.id + "'><div class='popup-inner'><a href='javascript:;' class='popup-close'><img src='" + host + "/images/svg/Close_icon.svg' alt='' /></a>";
                    popup += "<div class='scroll-panel'>" + f.popup_content + "</div><a href='javascript:;' class='link bottom popup-close'>SLUITEN</a></div>";
                    popup += "<div class='overlay-bg'></div></div>";

                    $(popup).appendTo("body");                   
                }
            });

            let $slider = $('.swiper-container');
            if ($slider !== undefined && $slider.length) {
                    _swiper = new Swiper(".swiper-container", {
                    slidesPerView: 2,
                    speed: 1000,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    simulateTouch: false,
                    spaceBetween: 20,
                    slidesPerGroup: 1,
                    initialSlide: 0,
                    loop: true
                });
            }

            $(".overlay").on("click", function() { 
                var $this = $(this),
                    index = $this.attr("data-index");

                $(".popup[data-index='" + parseInt(index) + "']").addClass("is-visible");
                slimScroll($(".popup.is-visible"));
            });

            $(document).on("click", ".popup-close, .overlay-bg", function (e) {
                $(".popup").removeClass("is-visible");
            });

            $(window).on('resize', function() {
                slimScroll($(".popup.is-visible"));
            });

        });

        function slimScroll($this) {
            $this.find(".scroll-panel, .slimScrollDiv").css("height", "auto");
            var $modalScroll = $this,
                $scrollPanel = $modalScroll.find(".scroll-panel:visible"),
                modalHeight = $modalScroll.find(".popup-inner").outerHeight(true),
                scrollPanelH = $scrollPanel.outerHeight(true),                
                windowH = $(window).height(),
                top = parseInt($modalScroll.css("top")),
                allowedModalH = windowH - 2 * top,    
                overlayHeight = allowedModalH - (modalHeight - scrollPanelH),
                paddingSpace = ($(window).width() < 768) ? 20 : 120;

            if ((modalHeight + paddingSpace) > allowedModalH) {
                $scrollPanel.slimScroll({
                    height: overlayHeight,
                    size: "7px",
                    touchScrollStep: 20,
                    distance: "10px",
                    wheelStep: 8,
                    alwaysVisible: !1
                })
            }
        };

        function sortByProperty(property) {
            return function (x, y) {
                return ((x[property] === y[property]) ? 0 : ((parseInt(x[property]) > parseInt(y[property])) ? 1 : -1));
            };
        }
    }
};

module.exports = kaart;
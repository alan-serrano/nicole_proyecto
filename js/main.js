// Plugin Slider
$(document).ready(function(){

    setDiameterSlider();
  

    // -------------------------------------------------------------
    // Añadiendo imagen circular al slider
   
/// ### ---- ### --------------------- ### ---- ### ///
    
    
    $(window).on("resize", function () {
            setDiameterSlider();
    });

    // Funciones

        // Función para obtener el ancho del círculo
    function setDiameterSlider(){
        var alto = $(window).height();
        var ancho = $(window).width();
        
        var radio;
        var resta;
        if(alto > ancho){
            radio = ancho;
            resta = "20vw";
            
        } else{
            radio = alto;
            resta = "20vh";
        }

        radio = radio/2*0.8;

        // -----------------------------------------------------
        // Creación de imagen SVG
        // ---------------------------------------------------


        var fn1 = $.fn.roundSlider.prototype._setProperties;
        $.fn.roundSlider.prototype._setProperties = function () {
            fn1.apply(this);
            var o = this.options;
            // o.radius = radio;
            var  r = o.radius,
                d = r * 2,
                r1 = r - (o.width / 2) - this._border(true),
                svgNS = "http://www.w3.org/2000/svg";
                
            this._circum = Math.PI * (r1 * 2);
            console.log(this._circum);
            
    
            var $svg = $(document.createElementNS(svgNS, "svg"));
            $svg.attr({
                "height": d,
                "width": d
            });
    
            this.$circle = $(document.createElementNS(svgNS, 'circle')).attr({
                "fill": "transparent",
                "class": "rs-transition",
                "cx": r,
                "cy": r,
                "r": r1,
                "stroke-width": o.width,
                "stroke-dasharray": this._circum
            }).appendTo($svg);
            this.$svg_box = $(document.createElement("div")).addClass("rs-transition rs-svg").append($svg).css({
                "height": d,
                "width": d,
                "transform-origin": "50% 50%",
                "transform": "rotate(" + (o.startAngle + 180) + "deg)"
            }).appendTo(this.innerContainer);
        }
    
        var fn2 = $.fn.roundSlider.prototype._changeSliderValue;
        $.fn.roundSlider.prototype._changeSliderValue = function (val, deg) {
            fn2.apply(this, arguments);
            deg = deg - this.options.startAngle;
    
            if (this._rangeSlider) {
                this.$svg_box.rsRotate(this._handle1.angle + 180);
                deg = this._handle2.angle - this._handle1.angle;
             
            }
            var pct = (1 - (deg / 360)) * this._circum;
            this.$circle.css({
                strokeDashoffset: pct
            });
        }



        //Creación de slider
        var anchoSlider = 2;
        $("#slider").roundSlider({
           
            radius: radio,
            width: anchoSlider,
            handleSize: "+20",
            showTooltip: false,
            sliderType: "min-range",
    
        });

 

        

        // Modificando atributo svg

        var sliderObject = $("#slider").data("roundSlider");
        
      
        var o = sliderObject.options;
        var  r = o.radius,
            d = r * 2,
            r1 = r - (o.width / 2) - sliderObject._border(true),
            svgNS = "http://www.w3.org/2000/svg";
                
        sliderObject._circum = Math.PI * (r1 * 2);
        sliderObject._changeSliderValue();
      
        $("#slider svg").attr({
            height: r*2,
            width: r*2 
        })

        $(".rs-transition.rs-svg").css({
            height: r*2,
            width: r*2
        })
        $("#slider svg circle").attr({
            cx: r,
            cy: r,
            r: r - (anchoSlider / 2) - 2,
                
                "cx": r,
                "cy": r,
                "r": r - (anchoSlider / 2) - 2,
                "stroke-dasharray": sliderObject._circum
        })

        // $("#slider").data("roundSlider")._setProperties();
        console.log($("#slider").data("roundSlider"));
    }
})

// Asignación de clase cuando se da click al ícono

document.addEventListener("DOMContentLoaded", function () {
    // Variables
    var menuIcon = document.getElementsByClassName("barra-menu")[0];
    var menuContenedor = document.getElementsByClassName("menu-contenedor")[0];
    var linkServicios = document.getElementById("link-servicios");
    var seccionServicios = document.getElementById("seccion-servicios");

    menuIcon.addEventListener("click", function () {
        menuContenedor.classList.toggle("open");
        if (condition) {
            
        }
    })

    
    linkServicios.addEventListener("click", () =>{
        seccionServicios.classList.toggle("open");
    })

})
/* ===========================================================
 * bootstrap-popover.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover
    
  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.' + this.options.titleClass)[this.options.html ? 'html' : 'text'](title)
      $tip.find('.' + this.options.contentClass)[this.options.html ? 'html' : 'text'](content)
      if ( typeof this.options.buttons=='object' ) {
    	  $tip.find('.'+ this.options.footerClass).remove()
    	  $tip.find('.'+ this.options.contentClass).after(this.getButtonsJQuery());
      }
    }
  
  , changeContent: function (data) {
      var $tip = this.tip()
        , title = this.getTitle()
        , $e = this.$element
        , content  
        	
      content = (typeof data == 'function' ? data.call($e[0]) :  data)

      $tip.find('.' + this.options.contentClass)[this.options.html ? 'html' : 'text'](content)

      this.options.content = data;
    }
  
  , changeTitle: function (data) {
      var $tip = this.tip()
        , title = this.getTitle()
        , $e = this.$element
        , title  
        	
      title = (typeof data == 'function' ? data.call($e[0]) :  data)

      $tip.find('.' + this.options.titleClass)[this.options.html ? 'html' : 'text'](title)

      this.options.title = data;
    }
  
  , hasContent: function () {
      return (typeof(this.getTitle())!="undefined" && this.getTitle().length>0) || (typeof(this.getContent())!="undefined" && this.getContent().length>0)
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }
  
  , getBestPlacement: function () {  
	  var positions = ["bottom", "left", "top", "right", "bottomLeft", "leftBottom", "leftTop", "topLeft", "topRight", "rightTop", "rightBottom", "bottomRight"]
	    , x1 //ordenada x superior izquierda del popover
  	    , x2 //ordenada x superior derecha del popover
  	    , y1 //ordenada y inferior izquierda del popover
  	    , y2 //ordenada y inferior derecha del popover
  	    , scrollTop = $(window).scrollTop()
	    , scrollLeft = $(window).scrollLeft()
	    , placement
	    , $tip = this.tip()
	    , actualWidth = $tip[0].offsetWidth
        , actualHeight = $tip[0].offsetHeight
	    , pos = this.getPosition()
	    , placement
	    , centerMargin = this.options.centerMargin
	  // Por cada positions va calculando su posicion:
	  //  - Si cabe dentro de la pantalla (return false) se queda con esa
	  //  - Si no cabe dentro de la pantalla (return true) y continua con la siguiente posicion
  	  $.each(positions,function(index){
  		 switch( positions[index] ){
  		 	case 'bottom': //Abajo
  		 		x1 = pos.left + pos.width / 2 - actualWidth / 2;
  		 		y1 = pos.top + pos.height;
  		 		break;
  		 	case 'left': //Izquierda
  		 		x1 = pos.left - actualWidth;
  		 		y1 = pos.top + pos.height / 2 - actualHeight / 2;
  		 		break;
  		 	case 'top': //Arriba
  		 		x1 = pos.left + pos.width / 2 - actualWidth / 2;
  		 		y1 = pos.top - actualHeight;
  		 		break;
  		 	case 'right': //Derecha
  		 		x1 = pos.left + pos.width;
  		 		y1 = pos.top + pos.height / 2 - actualHeight / 2;
  		 		break;
  		 	case 'topLeft': //arribaIzquierda
  		 		x1 = pos.left + pos.width / 2 - actualWidth + centerMargin;
  		 		y1 = pos.top - actualHeight;
  		 		break;
  		 	case 'topRight': //arribaDerecha
  		 		x1 = pos.left + pos.width / 2 - centerMargin;
  		 		y1 = pos.top - actualHeight;
  		 		break;
  		 	case 'bottomLeft': //abajoIzquierda
  		 		x1 = pos.left + pos.width / 2 - actualWidth + centerMargin;
  		 		y1 = pos.top + pos.height;
  		 		break;
  		 	case 'bottomRight': //abajoDerecha
  		 		x1 = pos.left + pos.width / 2 - centerMargin;
  		 		y1 = pos.top + pos.height;
  		 		break;
  		 	case 'leftTop': //izquierdaArriba
  		 		x1 = pos.left - actualWidth;
  		 		y1 = pos.top + (pos.height/2) - actualHeight + centerMargin;
  		 		break;
  		 	case 'rightTop': //derechaArriba
  		 		x1 = pos.left + pos.width;
  		 		y1 = pos.top + (pos.height/2) - actualHeight + centerMargin;
  		 		break;
  		 	case 'leftBottom': //izquierdaAbajo
  		 		x1 = pos.left - actualWidth;
  		 		y1 = pos.top + (pos.height/2) - centerMargin;
  		 		break;
  		 	case 'rightBottom': //derechaAbajo
  		 		x1= pos.left + pos.width;
  		 		y1= pos.top + (pos.height/2) - centerMargin;
  		 		break;
  	     }
  		 
  		 x2= x1 + actualWidth //ordenada x1 mas el ancho del popover
  		 y2= y1 + actualHeight //ordenada y1 mas el alto del popover
  		 
  		 //popover esta fuera de la pantalla por la izquierda o por arriba
  		 if(x1 - scrollLeft < 0 || x2 - scrollLeft < 0 || y1 - scrollTop  < 0 || y2 - scrollTop < 0) return true
  		 //popover esta por debajo de la pantalla				
		 if(y2 - scrollTop > $(window).outerHeight()) return true
		 //popover esta fuera de la pantalla por la derecha
		 if(x2 - scrollLeft > $(window).outerWidth()) return true
			
		 placement = positions[index]
		 return false // se para y se queda con esa posicion si entra 
  	  });
	  
	  if( placement==undefined ) return 'rightBottom'
	  
	  return placement
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find("." + this.options.arrowClass)
    }
  
  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (( (100 * delta) / dimension) + "%") : '')
    }
  
  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , delta
        , replace
        , pos = this.getPosition()

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')
        
        
      this.replaceArrow( 0, height, 'top')
      this.replaceArrow( 0 , width, 'left')
    	  
      if ( placement.match(/^bottom\B/) ){
    	  $tip.addClass('bottom')
    	  this.replaceArrow( pos.left + pos.width/2 - offset.left, width, 'left')
      }else if ( placement.match(/^left\B/) ){
    	  $tip.addClass('left')
    	  this.replaceArrow( pos.top + pos.height/2 - offset.top , height, 'top')
      }else if( placement.match(/^top\B/) ){
    	  $tip.addClass('top')
    	  this.replaceArrow( pos.left + pos.width/2 - offset.left, width, 'left')
      }else if( placement.match(/^right\B/) ){
    	  $tip.addClass('right')
    	  this.replaceArrow( pos.top + pos.height/2 - offset.top , height, 'top')
      }
      
    }
  
  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

	  if(this.options.autohide){
		  $(this.$element).attr('showingPopover', false); 
	      clickedAway = false;
	      $(document).off("click.outPopover"+  $(this.$element).attr('id') );
	      $(document).off("click.inPopover"+  $(this.$element).attr('id') );
	  }
	  $(document).off("click.crossPopover"+  $(this.$element).attr('id') );  
        
      this.$element.trigger('hidden')

      return this
    }
  
  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')
        , centerMargin = this.options.centerMargin

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        $tip.removeClass('fade top bottom left right bottomRight bottomLeft topRight topLeft leftTop leftBottom rightTop rightBottom in')
        this.setContent()
        
        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        if(placement=='auto') placement = this.getBestPlacement();
        
        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
          case 'topLeft': //arribaIzquierda
		 	tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth + centerMargin}	
		 	break;
		  case 'topRight': //arribaDerecha
			tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - centerMargin}
		 	break;
		  case 'bottomLeft': //abajoIzquierda
			tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth + centerMargin}
		 	break;
		  case 'bottomRight': //abajoDerecha
		    tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - centerMargin}
		 	break;
		  case 'leftTop': //izquierdaArriba
		 	tp = {top: pos.top + (pos.height/2) - actualHeight + centerMargin, left: pos.left - actualWidth}	
		 	break;
		  case 'rightTop': //derechaArriba
		 	tp = {top: pos.top + (pos.height/2) - actualHeight + centerMargin, left: pos.left + pos.width}	
		 	break;
		 case 'leftBottom': //izquierdaAbajo
		 	tp = {top: pos.top + (pos.height/2) - centerMargin, left: pos.left - actualWidth}
		 	break;
		 case 'rightBottom': //derechaAbajo
			tp = {top: pos.top + (pos.height/2) - centerMargin, left: pos.left + pos.width}
		 	break;
        }

        this.applyPlacement(tp, placement)
        
        if(this.options.autohide){
        	$(this.$element).attr('showingPopover', true);
//          EVENTO DE CLICK EN CUALQUIER ELEMENTO
          	$(document).on("click.outPopover"+  $(this.$element).attr('id')
          			       ,{elemento: this.$element}
          	               , function(event){
          	            	   if(event.data.elemento.attr("showingpopover") && clickedAway){
          	            		   event.data.elemento.popover('hide');
          	            	   } else {
          	            		   clickedAway = true;
          	            	   }});		
//          EVENTO DE CLICK EN EL POPOVER O SUS ELEMENTOS
            $(document).on("click.inPopover"+ $(this.$element).attr('id'),".popover,#ui-datepicker-div,.ui-corner-all", function(event){
      			clickedAway=false;
      		} );
        }
        
        $tip.find('a.close[data-dismiss="popover"]').on('click.crossPopover'+ $(this.$element).attr('id')
        		                                        ,{elemento: this.$element}
                                                        , function(event){
                                                        	event.data.elemento.popover('hide');
                                                        })
        
        this.$element.trigger('shown')
      }
    }
  , getButtonsJQuery: function () {
	    var $buttons
	      , $anchor	
	      , buttons
	      
	    $buttons = $('<div></div>').addClass(this.options.footerClass);
	    
	    buttons = this.options.buttons
	    
	    //for(var button in this.options.buttons){
    	for(var i=0; i<buttons.length; i++){
	    	$buttons.append( $anchor = $(this.options.buttonsTemplate) )
	    	
	    	for(var attribute in buttons[i]){ //Recorremos los atributos del objeto
	    		if(!(attribute=='btnClass'||attribute=='name')) $anchor.attr(attribute,buttons[i][attribute])
	 		}
	    	
	    	$anchor.addClass(this.options.buttonsClass)
	    	
	    	if (typeof buttons[i].href=='undefined') $anchor.attr('href','#')
	    	if (typeof buttons[i].btnClass != "undefined") $anchor.addClass(buttons[i].btnClass)
	    	if (typeof buttons[i].name != "undefined") $anchor.attr('name',buttons[i].name)
	    }
	    	
	    return $buttons
  }
})

 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover
  
  $.fn.popover = function (option, parameter) {
	    return this.each(function () {
	      var $this = $(this)
	        , data = $this.data('popover')
	        , options = typeof option == 'object' && option
	      if( !(typeof parameter=='undefined') ){
	    	  if (typeof option == 'string') data[option](parameter)
	      }else{
		      if (!data) $this.data('popover', (data = new Popover(this, options)))
		      if (typeof option == 'string') data[option]()
	      }
	      
	    })
	  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'bottom'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><a class="close" data-dismiss="popover">×</a><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  , centerMargin: 20
  , arrowClass: 'arrow'
  , titleClass: 'popover-title'
  , contentClass: 'popover-content'
  , footerClass: 'popover-footer'
  , buttons: ''
  , buttonsTemplate: '<a></a>'
  , buttonsClass: 'btn'
  , autohide : true
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

var clickedAway = false;
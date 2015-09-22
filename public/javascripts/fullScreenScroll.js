/* full-Screen-Scroll plugin of jQuery
 * by Tiny 2015-9-19
 */

;(function($, window, document, undefined){
  'use strict';
  var defaults = {
    'container': '#scrollContainer',
    'sections': 'section',
    'duration': 1000,
    'loop': true,
    'direction': 'vertical',
    'keyboard': true,
    'method': 'ease',
    'dots': true,  //show the dots that can switch sections
    'list': '#dots li' //dots selector
  };

  var scrollFlag = true;
  var sectionArray = [];
  var sectionIndex = 0;
  var settings = {};
  var container, sections;

  var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"];
  var transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];

  function abilityTest(arr){
    var body = ($("body"))[0];
    for(var i = 0; i < arr.length; i++){
      if(arr[i] in body.style){
        return true;
      }
    }
    return false;
  }

  var FSS = $.fn.fullScreenScroll = function(options){
    settings = $.extend({}, defaults, options || {});

    //change container to jQuery object
    container = $(settings.container);
    sections = container.find(settings.sections);

    //add sections to the array
    sections.each(function() {
      sectionArray.push($(this));
    });
    return this.each(function(){
      if(settings.direction == "horizontal"){

      }

      if(settings.dots){
        bindDotsClick();
      }

      if(settings.keyboard){
        onKeyDown();
      }
    });
  }

  var moveToPage = function(index) {
    var scrollAbility = abilityTest(transform) && abilityTest(transition);
    var target = $(sectionArray[index]);
    var pos = target.position();
    if(!pos){ return; }

    scrollFlag = false;
    if(scrollAbility){
      var translate = "";
      if(settings.direction == "horizontal"){
        translate = "-" + pos.left + "px, 0px";
      } else {
        translate = "0px, -" + pos.top + "px";
      }
      container.css({
        "transition": "all " + settings.duration + "ms " + settings.method,
        "transform": "translate(" + translate + ")"
      });
      scrollFlag = true;
    } else {
      var move = (settings.direction == "horizontal") ? {left: -pos.left} : {top: -pos.top};
      container.animate(move, settings.duration, function(){
        scrollFlag = true;
      });
    }
    target.addClass("focus").siblings().removeClass("focus");
    if(settings.dots){
      renderDots(index);
    }
  }

  function renderDots(index){
    $(settings.list).eq(index).addClass("focus").siblings().removeClass("focus");
  }

  function bindDotsClick(){
    $(function(){
      $(settings.list).each(function(index) {
        $(this).click(function(){
          moveToPage(index);
        });
      });
    });
  }

  function onKeyDown(){
    var keyID;
    $(window).keydown(function(e){
      clearTimeout(keyID);
      keyID = setTimeout(function() {
        var keyCode = e.keyCode;
        if(keyCode == 37||keyCode == 38){
          FSS.moveUp();
        }else if(keyCode == 39||keyCode == 40){
          FSS.moveDown();
        }
      }, 200);
    });
  }

  FSS.moveDown = function() {
    if(sectionIndex < sectionArray.length - 1){
      sectionIndex++;
    } else if(settings.loop) {
      sectionIndex = 0;
    }
    moveToPage(sectionIndex);
  }

  FSS.moveUp = function(){
    if(sectionIndex!=0){
      sectionIndex--;
    } else if(settings.loop){
      sectionIndex = sectionArray.length - 1;
    }
    moveToPage(sectionIndex);
  }

  var mouseWheelHandler = function(e) {
    e.preventDefault();
    e.preventDefault();
    var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    if(scrollFlag){
      if (value < 0) {
        FSS.moveDown();
      } else {
        FSS.moveUp();
      }
    }
    return false;
  }

  var Touch = {
    baseX: 0,
    baseY: 0,
    destX: 0,
    destY: 0,
    start: function (e) {
      // e.preventDefault();
      var point = e.targetTouches[0];
      this.baseX = point.pageX;
      this.baseY = point.pageY;
    },
    move: function (e) {
      // e.preventDefault();
      var point = e.targetTouches[0];
      this.destX = point.pageX;
      this.destY = point.pageY;
    },
    end: function (e) {
      // e.preventDefault();
      if(settings.direction == "horizontal"){
        if(this.destX > this.baseX){
          FSS.moveUp();
        } else if(this.destX < this.baseX){
          FSS.moveDown();
        }
      } else {
        if(this.destY > this.baseY){
          FSS.moveUp();
        } else if(this.destY < this.baseY) {
          FSS.moveDown();
        }
      }
    }
  };

  function reSize(){
    var height = $(window).height();
    var width = $(window).width();

  }

  //bind mousewheel event on document
  $(document).on("mousewheel DOMMouseScroll", mouseWheelHandler);
  //touch
  document.addEventListener('touchstart', Touch.start);
  document.addEventListener('touchmove', Touch.move);
  document.addEventListener('touchend', Touch.end);
  //resize
  var reSizeID;
  $(window).resize(function(){
    clearTimeout(reSizeID);
    reSizeID = setTimeout(function(){
      moveToPage(sectionIndex);
    }, 100);
  });


})(jQuery, window, document);

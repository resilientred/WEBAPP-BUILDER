/**
 * Created by Crystian on 3/2/14.
 */

loader.loadingScreen = (function(el, animationElements){
  'use strict';

  var t        = false,
      duration = 1000;

  function on(callback){
    toggle(callback, true);
  }

  function off(callback){
    toggle(callback, false);
  }

  function toggle(callback, togg){
    togg = togg === undefined ? t : togg;
    callback = callback ? callback : function(){};
    if(togg){
      t = false;
      el.classList.remove('fadeout');
      el.classList.add('fadein');
      if(animationElements){
        animationSwitch(true);
      }
      setTimeout(function(){
        callback();
      }, duration);//be careful, it is on the css too
    } else {
      t = true;
      el.classList.remove('fadein');
      el.classList.add('fadeout');
      setTimeout(function(){
        if(animationElements){
          animationSwitch(false);
        }
        callback();
      }, duration);//be careful, it is on the css too
    }
  }

  function animationSwitch(v){
    if(animationElements.length === 0){
      return;
    }
    var i = 0,
        l = animationElements.length;

    for(; i < l; i++){
      var el = animationElements[i];
      if(v){
        el.classList.add('on');
      } else {
        el.classList.remove('on');
      }
    }
  }

  return {
    on: on,
    off: off,
    toggle: toggle
  };

}(byId('loadingScreen'), document.getElementsByClassName('loadingAnimation')));

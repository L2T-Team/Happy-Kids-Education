$(function () {
  'use strict';
  function changeLang() {
    // var lang = this.value;
    // var canonical = this.dataset.canonical;
    // var path = '/';
    // if (lang !== 'en') path += lang + '/';

    // location.href = path + canonical;
  }
  document.getElementById('lang-select').addEventListener('change', function () {
    var lang = this.value;
    var canonical = this.dataset.canonical;
    var url
    url = window.location.href;
    var a = url.split("/")
    var b;
    a.forEach((item,index)=>{
      if(index!=a.length-1){
        if(index<=0){
          b=item
        }else{
          b=b+'/'+item
        }
      }else{
        return
      }
    })
    location.href=b+'/'+lang
    // location.href = '/' + lang + '/' + canonical

  });
});
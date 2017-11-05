'use strict';
function getData(n, t, o, r) {
  $.ajax({
    type: t,
    url: n,
    async: 1,
    data: o,
    success: function (n) {
      r(n)
    },
    error: function (n) {
//      var t = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'error.html';
//      window.location.href = t
        alert(JSON.stringify(n))
    }
  })
}
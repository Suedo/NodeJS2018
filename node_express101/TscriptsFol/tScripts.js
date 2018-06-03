$(function(){
  $('#get-button').on('click',function() {

    $.ajax({
      url: '/products',
      contentType: 'application/json',
      success: function(res){
        var tbodyEl = $('tbody')
        tbodyEl.html('')
        res.products.forEach(function(x){
          tbodyEl.append("<tr><td>" + x.name + "</td></tr>")
        })
      }
    });

 });
});

$("#shorten-btn").click(function(e){
  e.preventDefault();
  var pathname = window.location.href;
  var urlText = $("#url-field").val();
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {long_url: urlText}, //data sending out to server is in JSON
    success: function(data){
      console.log(data)
      console.log(pathname)
      $("#shortenURL a").remove() //remove any previous a href link
      $('#shortenURL').append('<a href="' + data.shortUrl + '">'+ pathname + data.shortUrl +'</a>')
    }
  });
})

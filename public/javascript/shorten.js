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
      $("#shortenURL a").remove() //remove any previous a href link
      $("#shortenURL strong").remove() //remove any previous a p tag
      if (data.shortUrl === "#"){
        $('#shortenURL').append('<strong>Remember to put http:// or https:// format </strong>')
      } else{
        $('#shortenURL').append('<a href="' + data.shortUrl + '">'+ pathname + data.shortUrl +'</a>')
      }
    }
  });
})

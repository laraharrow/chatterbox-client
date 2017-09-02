// YOUR CODE HERE:
var app = {
  user: window.location.search,
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  init: function() {
    console.log('init ran');
  },
  send: function(mess) {
    console.log('app.send called, message is : ' + JSON.stringify(mess));
    $.ajax({
      url: app.server,
      type: 'POST',
      data: mess,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('GET MESSAGES', data);
        for (var i = 1; i < 10; i ++) {
          if (data.results[i]) {
            app.renderMessage(data.results[i].text);
          }
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get messages', data);
      }
    });
  },
  clearMessages: function() {
    //clear DOM
    $('#chat').empty();
  },
  renderMessage: function(mess) {
    console.log('renderMessage ran');
    $('#chat').append(`<div>${mess.text}</div>`);
  }
    
  
};


// var message = {
//   username: 'lll',
//   text: 'trololo',
//   roomname: '4chan'
// };


// $.ajax({
//   url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent', data);
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });





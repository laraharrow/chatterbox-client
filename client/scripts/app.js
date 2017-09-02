// YOUR CODE HERE:
class App {
  constructor () {
    this.user = window.location.search.substr(10);
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  }


  init() {
    console.log('init ran');
  }

  send(mess) {
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
  }

  fetch() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        //console.log('GET MESSAGES', data.results[96].text);
        var currentRooms = {};
        for (var i = 0; i < data.results.length; i ++) {
          if (data.results[i].text) {
            //console.log('Inside FOR loop ', i, data.results[i].text);
            app.renderMessage(data.results[i]);
            if (!currentRooms[data.results[i].roomname] && data.results[i].roomname !== undefined) {
              currentRooms[data.results[i].roomname] = data.results[i].roomname;
              app.renderRoom(currentRooms[data.results[i].roomname]);
            } 
            
          }
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get messages', data);
      }
    });
  }
    
  clearMessages() {
    //clear DOM
    $('#chats').empty();
  }

  renderMessage(mess) {
    console.log('renderMessage ran');
    $('#chats').append(`<div>${mess.username}: ${mess.text}</div>`);
  }
  
  renderRoom(room) {
    console.log('renderRoom ran');
    
    $('#roomSelect').append(`<div>${room}</div>`);
  }
}

var app = new App;

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





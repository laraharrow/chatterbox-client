// YOUR CODE HERE:


class App {
  constructor () {
    this.user = window.location.search.substr(10);
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.friends = {};
  }


  init() {
    console.log('init ran');
    app.fetch();
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
        console.log('GET MESSAGES', data.results[96]);
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

    var cleanUsername = app.escapeXSS(mess.username);
    if (app.friends[mess.username]) {
      $('#chats').append(`<div><button onClick="app.handleUsernameClick('${cleanUsername}')">${cleanUsername}:</button> <b>${app.escapeXSS(mess.text)}</b></div>`);
    } else {
      $('#chats').append(`<div><button onClick="app.handleUsernameClick('${cleanUsername}')">${cleanUsername}:</button> <p>${app.escapeXSS(mess.text)}</p></div>`);
    }
  }

  renderRoom(room) {
    $('#roomSelect').append(`<div>${room}</div>`);
  }

  handleUsernameClick(username) {
    console.log('handleUsernameClick called on user : ', username);
    if (!app.friends[username]) {
      $('#friensList').append(`<p>${username}</p>`);
      app.friends[username] = true;
    }
  }

  escapeXSS(string) {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
  }
}

var app;
$(document).ready(() => {
  app = new App;
  app.init());
}

// Object {
  // createdAt : "2017-05-27T20:55:14.174Z",
  // objectId: "mB7wBQAdbQ",
  // roomname: "testRoom",
  // text: "ukjhj",
  // updatedAt: "2017-05-27T20:55:14.174Z",
  //username: "user"
//}


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

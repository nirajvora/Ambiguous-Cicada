// var db = require('./db');
var ChatRoom = require("./chats.js").ChatRoom;
var Message = require("./chats.js").Message;
var User = require("./auth.js").User;

//create waiting room that will hold userids
var waitingRoom = [];

//create open chatrooms data structure
var openChatRooms = {};

//need method to add user to waiting room
//user should be object with name and id props
exports.joinLobby = function (user) {


  //on add check if another user is in waiting room
  if (waitingRoom.length > 0) {
    //remove both user ids from waiting room
    var otherUser = waitingRoom.pop();
    console.log(otherUser);
    console.log(user);
    //make a new entry on chatrooms DB
    ChatRoom.create({
      users: [
        { id: user.id,
          name: user.name
        },
        { id: otherUser.id,
          name: otherUser.name
        }
      ],
      messages: []
    }, function (err, chatroom) {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        openChatRooms[user.id] = chatroom._id;
        openChatRooms[otherUser.id] = chatroom._id;
      }
    });

  } else {
    waitingRoom.push(user);
  }
};

//need method to check the open chatrooms data structure
exports.findChatRoom = function (user) {
  //should take a user id as arguments
  //should return a chatroomid or null;
  console.log(openChatRooms);
  return openChatRooms[user.id] || null;
};


//export the above methods

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //only send out the games where there is only one player
  let roomsToJoin = {...req.rooms};

  for(key in roomsToJoin.games){
    //if the room has more than one player
    if(roomsToJoin.games[key].clients.length > 1){
      //remove the room from the hash map
      delete roomsToJoin.games[key]
    }
  }

    res.json(req.rooms);
  
  });

  router.delete('/room' + '/:id', function(req,res){

    let roomToDelete = req.params.id;
    for(key in req.rooms.games){
      if(req.rooms.games[key].clients[0].gameId === roomToDelete){
        delete req.rooms.games[roomToDelete]
      }
    }
  })


module.exports = router;

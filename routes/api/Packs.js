const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const { check, body, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended:false})
const secret = process.env.jwtSecret;

const User = require("../../models/User");

router.post('/openpack' + '/:id', function(req, res) {
    let max = req.body.spells.length;
    let min = 0;
    
    let cards = [];
    console.log(req.params.id)

    for(let i=0; i < 3; i++){
       cards.push(Math.floor(Math.random() * (max - min) + min) );
    }
        
    if(req.params.id !== null){
        User.findOne({_id: req.params.id}).then(user => {
            console.log(user)
            if(user){
                user.packs -= 1
                //for each card in the pack
                for(let j=0; j<cards.length; j++){
                    //check if the card is already unlocked for that player
                    if(user.unlockedSpells.includes(cards[j])){
                        //add to the gold the player has
                        user.gold += 300;
                    }else{
                        user.unlockedSpells.push(cards[j])
                    }
                }

                user.save()
                .then(user => res.json({ 'gold': user.gold, 'spells': user.unlockedSpells, 'pack': cards, 'packs': user.packs }))

            }
        })
    }
  
});

router.post('/buypacks' + '/:id', (req, res) => {
    //req.body.item
    //{ "numberOfPacks": 1, "price": 1000 }

    User.findOne({_id: req.params.id})
        .then(user => {
            if (user){
                if (user.gold > req.body.item.price){
                    user.gold -= req.body.item.price
                    user.packs += req.body.item.numberOfPacks
                }
            }

            user.save()
                .then(user => res.json({ 'gold': user.gold, 'packs': user.packs}))
        })
})

router.get('/getpacks' + '/:id', (req, res) => {
     if(req.params.id !== null){
        User.findOne({_id: req.params.id})
            .then(user => {
                if(user){
                    res.json(user.packs);
                }
            })
    }
})

router.get('/test', (req, res) => {
    res.json({'test':'test'})
})

module.exports = router;
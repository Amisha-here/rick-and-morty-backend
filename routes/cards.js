const express = require('express')

const auth = require('../middleware/auth.js');


const { getCard,getCards,createCard,deleteCard } = require('../controllers/cards.js');

const router = express.Router();

router.get('/', auth,getCards);
router.get('/:id', getCard);
router.post('/', auth,createCard);
router.delete('/:id',auth,deleteCard);

module.exports = router;

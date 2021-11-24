import express from 'express';
import auth from  '../middleware/auth.js'

import { getCard,getCards,createCard,deleteCard } from '../controllers/cards.js';

const router = express.Router();

router.get('/', auth,getCards);
router.get('/:id', getCard);
router.post('/', auth,createCard);
router.delete('/:id',auth,deleteCard);

export default router;
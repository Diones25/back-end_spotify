import { Router } from 'express';
import spotifyController from '../controllers/spotifyController';

const router = Router();

router.get('/', spotifyController.home);
router.get('/search', spotifyController.search);
router.get('/lyrics', spotifyController.getLyrics);

export default router;
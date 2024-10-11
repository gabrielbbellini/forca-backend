const WordGuessingController = () => import('#controllers/word_guessing_controller');
import router from '@adonisjs/core/services/router';

router.get('/api/word/:uuid?', [WordGuessingController, 'createGame']);
router.post('/api/word/:uuid/character', [WordGuessingController, 'guessCharacter']);
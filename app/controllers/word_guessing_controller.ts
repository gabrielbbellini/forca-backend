import { GuessRequest } from "#models/guess_request";
import Word from "#models/word";
import WordGuessing from "#models/word_guessings";
import WordGuessingCharacter from "#models/word_guessings_character";
import { HttpContext } from "@adonisjs/core/http";
import db from "@adonisjs/lucid/services/db";
import { randomUUID } from "crypto";

export default class WordGuessingController {
  public async createGame({ params, response }: HttpContext ) {
    let uuid = params.uuid;
    let wordGuessing: WordGuessing | null;
    if (!uuid) {
      const randomWord: Word = await db
      .from('word')
      .select('word')
      .orderByRaw('RANDOM()')
      .firstOrFail();
      
      uuid = randomUUID();
      await WordGuessing.create({ id: uuid, word: randomWord.word });
      wordGuessing = await WordGuessing.find(uuid);
    } else {
      wordGuessing = await WordGuessing.query()
      .where('id', uuid)
      .preload('characters')
      .firstOrFail();
    }


    if (!wordGuessing) {
      return response.status(400).json({message: "Palavra não encontrada."});
    }

    const serializedWordGuessing = wordGuessing.toJSON();
    serializedWordGuessing.wordsLength = wordGuessing.word.split(' ').reduce((acc, curr) => {
      acc.push(curr.length);
      return acc;
    }, new Array());

    return response.json(serializedWordGuessing);
  }

  public async guessCharacter({ params, request, response }: HttpContext) {
    if (!params.uuid) {
      return response.status(400).json({message: 'Palavra não encontrada.'});
    }

    const guessRequest: GuessRequest = request.body() as GuessRequest;
    if (!guessRequest.character) {
      return response.status(400).json({message: 'Escolha um caracter (character).'});
    }

    if (guessRequest.character.length > 1) {
      return response.json({message: `Só é permitido um caracter por vez.`});
    }

    const wordGuessing = await WordGuessing.findBy('id', params.uuid);
    if (!wordGuessing) {
      return response.status(400).json({message: 'Palavra não encontrada.'});
    }
  
    if (wordGuessing.isVictory != null) {
      return response.json({message: `Esta partida já acabou.`});
    }

    const wordGuessingsCharacters: WordGuessingCharacter[] = await WordGuessingCharacter.findManyBy('word_guessings_uuid', params.uuid);
    const guessedCharacters: string[] = wordGuessingsCharacters.map((guessedCharacter) => guessedCharacter.character);
    if (guessedCharacters.includes(guessRequest.character)) {
      return response.json({message: `O caracter '${guessRequest.character}' já foi utilizado.`});
    }
    
    let countGuesseds = 0;
    const wordParts = wordGuessing.word.split(' ');
    for (let i = 0; i < wordParts.length; i++) {        
      for (let j = 0; j < wordParts[i].length; j++) {
        if (guessRequest.character.toLocaleLowerCase() === wordParts[i][j].toLocaleLowerCase()) {
          countGuesseds++;
          await WordGuessingCharacter.create({ wordGuessingsUuid: params.uuid, character: guessRequest.character, wordIndex: i, characterIndex: j, isCorrect: true })
        }
      }
    }

    if (!countGuesseds) {
      await WordGuessingCharacter.create({ wordGuessingsUuid: params.uuid, character: guessRequest.character, isCorrect: false })
      wordGuessing.remainingAttempts--;
    }

    const totalCorrectGuesses = wordGuessingsCharacters.filter((guessedCharacter) => guessedCharacter.isCorrect)?.length + countGuesseds;

    if (!wordGuessing.remainingAttempts) {
      wordGuessing.isVictory = false;
    } else if (totalCorrectGuesses === wordGuessing.word.replaceAll(' ', '').length) {
      wordGuessing.isVictory = true;
    }
    await wordGuessing.save();

    const updatedWordGuessings = await WordGuessing.query()
    .where('id', params.uuid)
    .preload('characters')
    .firstOrFail();

    const serializedWordGuessing = updatedWordGuessings.toJSON();
    serializedWordGuessing.wordsLength = updatedWordGuessings.word.split(' ').reduce((acc, curr) => {
      acc.push(curr.length);
      return acc;
    }, new Array());    

    return response.json(serializedWordGuessing);
  }
}
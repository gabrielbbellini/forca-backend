import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import WordGuessingsCharacter from './word_guessings_character.js';
import { type HasMany } from '@adonisjs/lucid/types/relations';

export default class WordGuessings extends BaseModel {
  static table = 'word_guessings';

  @column({ isPrimary: true })
  declare id: string;

  @column({ serializeAs: null })
  declare word: string

  @column()
  declare remainingAttempts: number;

  @column()
  declare charactersUsed: string;

  @column()
  declare isVictory: boolean;

  @column()
  declare correctGuesses: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime;

  @hasMany(() => WordGuessingsCharacter, {
    foreignKey: 'wordGuessingsUuid',
  })
  declare characters: HasMany<typeof WordGuessingsCharacter>;
}
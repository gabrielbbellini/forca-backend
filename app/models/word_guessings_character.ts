import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import WordGuessings from './word_guessings.js'

export default class WordGuessingCharacter extends BaseModel {
  static table = 'word_guessings_character'

  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare wordGuessingsUuid: string

  @column()
  declare character: string

  @column()
  declare wordIndex: number

  @column()
  declare characterIndex: number

  @column()
  declare isCorrect: boolean

  @belongsTo(() => WordGuessings, {
    foreignKey: 'wordGuessingsUuid',
  })

  declare wordGuessings: BelongsTo<typeof WordGuessings>
}

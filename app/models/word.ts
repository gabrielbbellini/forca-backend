import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Word extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({serializeAs: null})
  declare word: string;
}
import { BaseSchema } from "@adonisjs/lucid/schema"

export default class CreateWordsGuessingCharacterTable extends BaseSchema {
  protected tableName = 'word_guessings_character'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.uuid('word_guessings_uuid').references('id').inTable('word_guessings').onDelete('CASCADE')

      table.string('character', 1).notNullable()

      table.integer('word_index').nullable()

      table.integer('character_index').nullable()

      table.boolean('is_correct').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateWordGuessingTable extends BaseSchema {
    protected tableName = 'word_guessings'
  
    public async up () {
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary()
  
        table.string('word', 100).notNullable()
  
        table.integer('remaining_attempts').notNullable().defaultTo(3)

        table.boolean('is_victory').nullable()
  
        table.timestamp('created_at', { useTz: true }).notNullable()
        table.timestamp('updated_at', { useTz: true }).notNullable()
      })
    }
  
    public async down () {
      this.schema.dropTable(this.tableName)
    }  
}
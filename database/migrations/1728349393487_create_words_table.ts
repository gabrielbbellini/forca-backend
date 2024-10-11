import { BaseSchema } from "@adonisjs/lucid/schema"

export default class WordTable extends BaseSchema {
  protected tableName = 'word'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('word', 100).notNullable().unique()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
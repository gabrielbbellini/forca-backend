import { BaseSchema } from "@adonisjs/lucid/schema"

export default class InsertWordsIntoWordTable extends BaseSchema {
  protected tableName = 'word'

  public async up () {
    // Insere 10 palavras simples e curtas na tabela word
    await this.db.table(this.tableName).insert([
      { word: 'Sol' },
      { word: 'Lua' },
      { word: 'Flor' },
      { word: 'Mar' },
      { word: 'Água' },
      { word: 'Céu' },
      { word: 'Ar' },
      { word: 'Fogo' },
      { word: 'Vento' },
      { word: 'Terra' }
    ])
  }

  public async down () {
    // Remove as palavras inseridas no método up
    await this.db
      .from(this.tableName) // Use 'from' para selecionar a tabela antes do 'whereIn'
      .whereIn('word', ['Sol', 'Lua', 'Flor', 'Mar', 'Água', 'Céu', 'Ar', 'Fogo', 'Vento', 'Terra'])
      .delete()
  }  
}

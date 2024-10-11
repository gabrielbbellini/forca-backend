  export default class GuessResponse {
    exists: boolean;
    indexes: number[];

    constructor() {
      this.exists = false;
      this.indexes = [];
    }

    public toJSON() {
      const json: any = {
        exists: this.exists,
      }
  
      if (this.indexes.length) {
        json.indexes = this.indexes;
      }
  
      return json;
    }
  }
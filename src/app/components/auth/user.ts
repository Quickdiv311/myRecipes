export class User {
      constructor(
            public username: string,
            public id: string,
            private _token: string,
            private _tokenExpirationdate: Date){}

      get token(){
          if(!this._tokenExpirationdate || new Date() > this._tokenExpirationdate) return null;

          return this._token
      }
}
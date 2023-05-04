class Api {
    constructor({baseUrl,headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    
    _checkOk(res) {
        if (res.ok) return res.json();
        return Promise.reject(res.status);
      }
    
    getCards(){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => this._checkOk(res));
    }
         
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => this._checkOk(res));
    }

    editUserProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: about
          }),
        })

        .then((res) => this._checkOk(res));
    }
    
    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            link: link
          }),
        })
        
        .then((res) => this._checkOk(res));
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        
        .then((res) => this._checkOk(res));
    }
    
    dislikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers
        })
         
        .then((res) => this._checkOk(res));
    }

    changeAvatar(link){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        }),
      })

      .then((res) => this._checkOk(res));
    }

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
       
    .then((res) => this._checkOk(res));
  }
}

export {Api};
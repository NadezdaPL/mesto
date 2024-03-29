export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  addInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    });
  }

  createCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    });
  }

  addLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    });
  }

  removeLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  addAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

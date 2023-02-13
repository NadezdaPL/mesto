export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _returnResult(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
    // return Promise.reject(`Ошибка: ${response.status}`);
  }

  async getInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._returnResult(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._returnResult(response);
  }

  async addInfo(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    });
    return this._returnResult(response);
  }

  async createCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    });
    return this._returnResult(response);
  }

  async addLike(id) {
    const response = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    });
    return this._returnResult(response);
  }

  async removeLike(id) {
    const response = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    });
    return this._returnResult(response);
  }

  async deleteCard(id) {
    const response = await fetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    });
    return this._returnResult(response);
  }

  async addAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._returnResult(response);
  }
}

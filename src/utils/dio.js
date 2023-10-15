import {getAuth} from "firebase/auth";

export class Dio {
  async get(url, headers = {}) {
    return this.dio(url, "GET", undefined, {
      ...headers,
    });
  }

  async post(url, body = {}, headers = {}) {
    return this.dio(url, "POST", JSON.stringify(body) ,{
      'Content-Type' : 'application/json',
      ...headers,
    });
  }

  async put(url, body = {}, headers = {}) {
    return this.dio(url, "PUT", JSON.stringify(body), {
      ...headers,
    });
  }

  async delete(url, headers = {}) {
    return this.dio(url, "DELETE", undefined, {
      ...headers,
    });
  }

  async getIdToken() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    } 
    return '';
  }

  async dio(url, method, body, headers) {
    const idToken = await this.getIdToken();
    console.log(idToken);
    const mergedOptions = {
      method: `${method}`,
      headers: {
        ...headers,
        Authorization: `Bearer ${idToken??''}`,
      },
      body:body,
    };
    try {
      const response = await fetch(url, mergedOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response)
      return response.json();
    } catch (e) {
      throw new Error("Network response was not ok");
    }
  }
  
}

import {getAuth} from "firebase/auth";

export class Dio {
  async get(url, headers = {}) {
    const idToken = await this.getIdToken();
    return this.dio(url, "GET", undefined, {
      Authorization: `Bearer ${idToken}`,
      ...headers,
    });
  }

  async post(url, body, headers = {}) {
    const idToken = await this.getIdToken();
    const isFormData = body instanceof FormData;
    const bodySelect = body instanceof FormData ? body : JSON.stringify(body)
    return this.dio(url, "POST", bodySelect ,{
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      Authorization: `Bearer ${idToken}`,
      ...headers,
    });
  }

  async imagepost(url, body, headers = {}){
    const idToken = await this.getIdToken();
    return this.dio(url, "POST", body, {
      Authorization: `Bearer ${idToken}`,
      ...headers,
    })
  }

  async put(url, body = {}, headers = {}) {
    const idToken = await this.getIdToken();
    return this.dio(url, "PUT", body, {
      Authorization: `Bearer ${idToken}`,
      ...headers,
    });
  }

  async delete(url, headers = {}) {
    const idToken = await this.getIdToken();
    return this.dio(url, "DELETE", undefined, {
      Authorization: `Bearer ${idToken}`,
      ...headers,
    });
  }

  async getIdToken() {
    try {
      const auth = getAuth();
      return await auth.currentUser.getIdToken();
    } catch (e) {
      return "";
    }
  }

  async dio(url, method, body, headers) {
    const mergedOptions = {
      method: `${method}`,
      headers: headers,
      body:body,
    };
    try {
      const response = await fetch(url, mergedOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (e) {
      throw new Error("Network response was not ok");
    }
  }
  
}

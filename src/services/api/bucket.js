import { Dio } from "../../utils/dio.js";
import { baseURL } from "../api.js";

export default class BucketAPI {
  constructor() {
    this.dio = new Dio();
  }

  async media(files) {
    try {
      const formData = new FormData();
      // Array.from(files).forEach((file, index) => {
      //   formData.append(`files`, file);
      //   console.log(formData.getAll(`files`))
      // });
      for(let i=0; i < files.length; i++){
        formData.append('files',files[i])
      }
      const response = await this.dio.imagepost(baseURL.bucket.media, formData);
      return response;
    } catch (error) {
      return error;
    }
  }
}
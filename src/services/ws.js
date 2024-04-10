import { address } from "./api.js";

export default class WS {
  constructor(user) {
    this.url = `ws://${address}:8001/ws/v1/chat/${user.uid}/`;
    this.socket??this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.onConnect();
    };

    this.socket.onmessage = (event) => {
      this.onMessage(event.data);
    };

    this.socket.onclose = () => {
      this.onDisconnect();
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try{
        this.socket.send(message);
        console.log(message)
      }catch(error){
        console.log(error)
      }
    }
  }

  onConnect() {
    console.log("WebSocket connected");
  }

  onDisconnect() {
    console.log("WebSocket disconnected");
  }

  onMessage(message) {
    console.log("Websocket message sucsses")
  }
}
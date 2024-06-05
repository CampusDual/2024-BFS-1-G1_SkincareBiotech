import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {environment} from '../../../environments/environment';
import { Message } from './message';


 export const WS_ENDPOINT = "ws://localhost:4299";   // wsEndpoint: 'ws://localhost:8081'
// export const WS_ENDPOINT = environment.apiEndpoint;   // wsEndpoint: 'ws://localhost:8081'

@Injectable({
  providedIn: 'root'
})
// manejar la conexion websocket
export class DataService {

  private socket$: WebSocketSubject<any>;

  private messagesSubject = new Subject<Message>();
  public messages$ = this.messagesSubject.asObservable();

  public connect(): void {
// inicia socket en el caso de que este cerrado/!exista
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      //suscribe mensajes recibidos
      this.socket$.subscribe(
        msg => {
          console.log('Received message of type: ' + msg.type);
          this.messagesSubject.next(msg);
        }
      );
    }
  }

  // enviar mensajesa traves de socket
  sendMessage(msg: Message): void {
    console.log('sending message: ' + msg.type);
    this.socket$.next(msg);
  }

  // crea un nuevo socket
  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: WS_ENDPOINT,
      //registrar conexion abierta
      openObserver: {
        next: () => {
          console.log('[DataService]: connection ok');
        }
      },
      //registrar conexion cerrada, envia mensaje de cierre de conexion
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
          this.socket$ = undefined;
          // intentamos reconectar
          this.connect();
        }
      }
    });
  }
}
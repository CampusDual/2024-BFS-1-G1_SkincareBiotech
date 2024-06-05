import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Message } from './message';

// variables for media constraints
const mediaConstraints = {
  audio: true,
  video: { width: 720, height: 540 }
};

const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements AfterViewInit{
  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('remoteVideo') remoteVideo: ElementRef;

  private localStream: MediaStream;
  private peerConnection: RTCPeerConnection;

  constructor(private dataService: DataService) { }
  ngAfterViewInit(): void {
    this.addIncomingMessageHandler();
    this.requestMediaDevices();
  }


  private async requestMediaDevices(): Promise<void>{
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
   // this.localVideo.nativeElement.srcObject = this.localStream;
     this.pauseLocalVideo();
  }

   pauseLocalVideo(): void{
    this.localStream.getVideoTracks().forEach(track => {
      track.enabled = false;
    });
    this.localVideo.nativeElement.srcObject = undefined;
  }

  startLocalVideo(): void{
    this.localStream.getTracks().forEach(track => { 
      track.enabled = true;
    });
    //solo se tiene que agregar la señal del dispositivo al componente (muteado por defecto en el video local)
    this.localVideo.nativeElement.srcObject = this.localStream;
  }

  async call(): Promise<void>{
    this.createPeerConnection();
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    try {
      // offer contiene toda la informacion de los medios para establecer la sesion
      const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
      await this.peerConnection.setLocalDescription(offer);

      this.dataService.sendMessage({
        type: 'offer',
        data: offer
      });
    } catch (err) {
      this.handleGetUserMediaError(err);
    }
  }


  private handleGetUserMediaError(err: Error): void {
   switch (err.name) {
    case 'NotFoundError':
      alert('No se puede establecer la conexion: no se encuentra la camara/microfono');
      break;
    case 'SecurityError':
      alert('Permisos de Seguridad denegados')
      break;
    case 'PermissionDeniedError':
      alert('Permisos denegados')
      break;
    default:
      console.log(err);
      alert('Error al establecer la conexion: ' + err.message);
    }
    this.closeVideoCall();
  }

  private createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          // los public STUN servers permiten descubrir la IP publica para determinar la forma en la que estan conectados a internet los users
          urls: ['stun:stun.l.google.com:19302']
        }
      ]
  });
  this.peerConnection.onicecandidate= this.handleIceEvent;
  this.peerConnection.onicegatheringstatechange = this.handleIceConnectionStateChangeEvent;
  this.peerConnection.onsignalingstatechange = this.handleSignalingStateEvent;
  this.peerConnection.ontrack = this.handleTrackEvent;
}

  private closeVideoCall(): void {
    if(this.peerConnection){
      this.peerConnection.onicecandidate= null;
      this.peerConnection.onicegatheringstatechange = null;
      this.peerConnection.onsignalingstatechange = null;
      this.peerConnection.ontrack = null;
    }
    this.peerConnection.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    });

    this.peerConnection.close();
    this.peerConnection = null;
  }

  // se recibe un evento desde la api webRTC y me da el candidato, lo envio al otro peer
  private handleIceEvent = (event: RTCPeerConnectionIceEvent): void => {
    console.log(event);
    if(event.candidate){
      this.dataService.sendMessage({
        type: 'ice-candidate',
        data: event.candidate
      });
    }
  }

  // en el caso de erroren la conexion, cerramos la conexion
  private handleIceConnectionStateChangeEvent = (event: Event): void => {
    console.log(event);
    switch (this.peerConnection.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        this.closeVideoCall();
        break;
    }

  }

  // en el caso de que el estado de la conexion se mantenga cerrado, cerramos la conexion
  private handleSignalingStateEvent = (event: Event): void => {
    console.log(event);
    switch (this.peerConnection.signalingState) {
      case 'closed':
        this.closeVideoCall();
        break;
    }
  }

  // se recibe un check desde el remote y le hacemos un attach al remote
  private handleTrackEvent = (event: RTCTrackEvent): void => {
    console.log(event);
    // se accede a los stremas de RCTrackEvent y se le asigna al remote video el primer stream
    this.remoteVideo.nativeElement.srcObject = event.streams[0];
  }

  // controlar los mensajes entrantes
  addIncomingMessageHandler() {
    this.dataService.connect();
    this.dataService.messages$.subscribe(
      msg => {
        switch (msg.type) {
          case 'offer':
            this.handleOfferMessage(msg.data);
            break;
          case 'answer':
            this.handleAnswerMessage(msg.data);
            break;
          case 'hangup':
            this.handleHangupMessage(msg);
            break;
          case 'ice-candidate':
            this.handleIceCandidateMessage(msg.data);
            break;
          default:
            // para debuggear
            console.log('Unknown message type: ' + msg.type);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  handleOfferMessage(msg: RTCSessionDescriptionInit): void {
    if(!this.peerConnection){
      this.createPeerConnection();
    }
    
    if(!this.localStream){
      this.startLocalVideo();
    }
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg))
    .then(() =>{
      this.localVideo.nativeElement.srcObject = this.localStream;
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      })
    })
    .then(() => {
      return this.peerConnection.createAnswer();
    }).then((answer) => {
      return this.peerConnection.setLocalDescription(answer);
    }).then(() => {
      this.dataService.sendMessage({
        type: 'answer',
        data: this.peerConnection.localDescription
      });
    }).catch(this.handleGetUserMediaError);
  }
  
  handleAnswerMessage(data: any):void {
    this.peerConnection.setRemoteDescription(data);
  }
  
  handleHangupMessage(msg: Message): void {
    this.closeVideoCall();
  }
  
  handleIceCandidateMessage(data: any):void {
    this.peerConnection.addIceCandidate(data).catch(this.reportError);
  }

  private reportError = (err: Error) => {
    console.log('Error: ' + err.name);
    console.log(err);
  }

  hangUp(): void{
    this.dataService.sendMessage({
      type: 'hangup',
      data: ''
    });
    this.closeVideoCall();
  }
}

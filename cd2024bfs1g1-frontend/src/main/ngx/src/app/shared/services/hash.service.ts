import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HashService{

    async generateUniqueHash(): Promise<string> {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(Date.now().toString());
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash =hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        if(localStorage.getItem('hash') !==null){
            return localStorage.getItem('hash');
        }else{
            localStorage.setItem('hash',hash);
            return localStorage.getItem('hash');
        } 
      }
}

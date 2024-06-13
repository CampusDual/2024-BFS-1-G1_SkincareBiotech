import { Injectable, OnDestroy } from "@angular/core";
import { OTranslateService } from "ontimize-web-ngx";
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements OnDestroy {

  private isEnSubject = new BehaviorSubject<boolean>(false);
  private isEsSubject = new BehaviorSubject<boolean>(true);
  private translateSubscription: Subscription;

  isEn$ = this.isEnSubject.asObservable();
  isEs$ = this.isEsSubject.asObservable();

  constructor(private translate: OTranslateService) {
    this.getLanguage();
    this.subscribeToLanguageChanges();
  }

  getLanguage() {
    const idiom = this.translate.getCurrentLang();

    if (idiom === 'en') {
      this.isEnSubject.next(true);
      this.isEsSubject.next(false);
    } else {
      this.isEnSubject.next(false);
      this.isEsSubject.next(true);
    }
    console.log(idiom);
  }

  private subscribeToLanguageChanges() {
    this.translateSubscription = this.translate.onLanguageChanged.subscribe(lang => {
      this.getLanguage();
    });
  }

  ngOnDestroy() {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }
}
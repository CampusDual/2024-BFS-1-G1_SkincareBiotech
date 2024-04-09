import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AppConfig, AppearanceService, OTranslateService, Util } from 'ontimize-web-ngx';

@Component({
  selector: 'settings-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsAppearanceComponent {

  public availableLangs: string[] = [];
  public currentLang: string;
  public darkDefaultMode = false;

  @ViewChild('toggleDark')
  private toggleDark: MatSlideToggle;

  constructor(
    private appConfig: AppConfig,
    private translateService: OTranslateService,
    private appearanceService: AppearanceService
  ) {
    this.availableLangs = this.appConfig.getConfiguration().applicationLocales;
    this.currentLang = this.translateService.getCurrentLang();
    this.darkDefaultMode = this.appearanceService.isDarkMode();

  }

  changeLang(e: MatRadioChange): void {
    if (this.translateService && this.translateService.getCurrentLang() !== e.value) {
      this.translateService.use(e.value);
    }
  }

  changeDarkMode(e: MatSlideToggleChange): void {
    this.appearanceService.setDarkMode(e.checked);
  }

}

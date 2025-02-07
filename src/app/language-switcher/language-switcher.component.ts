import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent implements OnInit {
  currentLocale = 'en';

  constructor() { }

  ngOnInit() {
    const locale = window.location.pathname.split('/')[1];
    if (locale === 'da' || locale === 'en') {
      this.currentLocale = locale;
    }
  }

  switchLanguage(locale: string) {
    window.location.href = `/${locale}`;
  }
}
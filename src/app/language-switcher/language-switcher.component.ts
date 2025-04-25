import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LocaleOption { code: string; label: string; }

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  locales: LocaleOption[] = [
    { code: 'en', label: 'English' },
    { code: 'da', label: 'Dansk' }
  ];

  current = this.detectLocale();

  private detectLocale(): string {
    const parts = window.location.pathname.split('/');
    return this.locales.some(l => l.code === parts[1]) ? parts[1] : 'en';
  }

  switch(lang: string) {
    // Split and remove empty segments
    const parts = window.location.pathname.split('/').filter(p => p !== ''); 
  
    // Remove existing locale (if present)
    if (parts.length > 0 && this.locales.some(l => l.code === parts[0])) {
      parts.shift(); 
    }
  
    // Prepend new locale
    parts.unshift(lang); 
  
    // Rebuild the path
    const newPath = '/' + parts.join('/') + window.location.search + window.location.hash;
    window.location.href = newPath;
  }
}
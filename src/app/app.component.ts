import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './services/navbar.service';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from "./language-switcher/language-switcher.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Website';
  navbarVisible$ = this.navbarService.navbarVisible$;

  constructor(private navbarService: NavbarService) {}
  
  ngOnInit(): void {
    window.scrollTo(0, 0);

  }
}


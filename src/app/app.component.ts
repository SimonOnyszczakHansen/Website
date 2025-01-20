import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Route, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Website';

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}


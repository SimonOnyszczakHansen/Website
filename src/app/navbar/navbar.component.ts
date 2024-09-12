import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  activeSection: string = 'home';
  underlineWidth: number = 0;
  underlineLeft: number = 0;

  @ViewChild('navbar', { static: false }) navbar!: ElementRef;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngAfterViewInit() {
    this.setUnderlinePosition();
  }

  setActive(section: string) {
    this.activeSection = section;
    this.router.navigate(['/' + section]);

    setTimeout(() => {
      this.setUnderlinePosition();
    }, 0);
  }

  setUnderlinePosition() {
    const navbarElement = this.navbar.nativeElement;
    const activeLink = navbarElement.querySelector(`.nav-link.active`);
  
    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const offsetParentRect = activeLink.offsetParent.getBoundingClientRect();
      const navbarScrollLeft = navbarElement.scrollLeft; // Get the scroll left of the navbar
  
      this.underlineWidth = linkRect.width;
      this.underlineLeft = linkRect.left - offsetParentRect.left + navbarScrollLeft; // Calculate the relative left position
  
      this.cdr.detectChanges();
    }
  }
}

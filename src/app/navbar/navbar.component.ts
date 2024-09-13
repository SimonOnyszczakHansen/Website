import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnInit {
  activeSection: string = '';
  underlineWidth: number = 0;
  underlineLeft: number = 0;
  isInitialLoad: boolean = true;

  @ViewChild('navbar', { static: false }) navbar!: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef, 
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url.split('/')[1];
        if (currentRoute) {
          this.activeSection = currentRoute;
        } else {
          this.activeSection = 'home';
        }
        setTimeout(() => {
          this.setUnderlinePosition();
        }, 0);
      }
    });
  }

  goToHome() {
    this.setActive('home');
  }

  goToProjects() {
    this.setActive('projects');
  }

  goToAbout() {
    this.setActive('about');
  }

  goToContact() {
    this.setActive('contact')
  }

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
      const navbarScrollLeft = navbarElement.scrollLeft;

      this.underlineWidth = linkRect.width;
      this.underlineLeft = linkRect.left - offsetParentRect.left + navbarScrollLeft;

      if (this.isInitialLoad) {
        navbarElement.classList.add('no-transition');
        setTimeout(() => {
          navbarElement.classList.remove('no-transition');
          this.isInitialLoad = false;
        }, 100);
      }

      this.cdr.detectChanges();
    }
  }
}

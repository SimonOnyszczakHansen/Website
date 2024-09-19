import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  activeSection: string = '';
  underlineWidth: number = 0;
  underlineLeft: number = 0;
  isInitialLoad: boolean = true;

  isMenuActive: boolean = false;

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

  ngAfterViewInit() {
    this.setUnderlinePosition();
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.cdr.detectChanges();

    const hamburger = this.navbar.nativeElement.querySelector('.hamburger');
    if (hamburger) {
      hamburger.classList.toggle('active', this.isMenuActive);
    }
  }

  onNavClick(section: string): void {
    this.setActive(section);
    this.isMenuActive = false;

    // Remove 'active' class from hamburger
    const hamburger = this.navbar.nativeElement.querySelector('.hamburger');
    if (hamburger) {
      hamburger.classList.remove('active');
    }

    this.cdr.detectChanges();
  }

  setActive(section: string): void {
    this.activeSection = section;
    this.router.navigate(['/' + section]);

    setTimeout(() => {
      this.setUnderlinePosition();
    }, 0);
  }

  goToHome() {
    this.onNavClick('home');
  }

  goToProjects() {
    this.onNavClick('projects');
  }

  goToAbout() {
    this.onNavClick('about');
  }

  goToContact() {
    this.onNavClick('contact');
  }
  
  setUnderlinePosition() {
    const navbarElement = this.navbar.nativeElement;
    const activeLink: HTMLElement | null = navbarElement.querySelector(`.nav-link.active`);

    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const offsetParent = activeLink.offsetParent as HTMLElement;
      const offsetParentRect = offsetParent.getBoundingClientRect();
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
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.navbar && !this.navbar.nativeElement.contains(target)) {
      if (this.isMenuActive) {
        this.isMenuActive = false;
        
        // Remove 'active' class from hamburger
        const hamburger = this.navbar.nativeElement.querySelector('.hamburger');
        if (hamburger) {
          hamburger.classList.remove('active');
        }

        this.cdr.detectChanges();
      }
    }
  }
}

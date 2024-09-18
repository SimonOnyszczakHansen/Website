import { 
  Component, 
  AfterViewInit, 
  ElementRef, 
  ViewChild, 
  ChangeDetectorRef, 
  OnInit, 
  HostListener 
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class NavbarComponent implements AfterViewInit, OnInit {
  activeSection: string = '';
  underlineWidth: number = 0;
  underlineLeft: number = 0;
  isInitialLoad: boolean = true;

  // New Property to Track Menu State
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

  /**
   * Toggles the visibility of the mobile menu.
   */
  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  /**
   * Handles navigation link clicks.
   * Sets the active section, navigates, and closes the menu.
   * @param section The section to activate.
   */
  onNavClick(section: string): void {
    this.setActive(section);
    this.isMenuActive = false; // Close the menu after selection
  }

  /**
   * Sets the active section and navigates to the corresponding route.
   * @param section The section to activate.
   */
  setActive(section: string): void {
    this.activeSection = section;
    this.router.navigate(['/' + section]);

    setTimeout(() => {
      this.setUnderlinePosition();
    }, 0);
  }

  /**
   * Navigation Methods
   */
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

  /**
   * Optional: Closes the mobile menu when clicking outside of the navbar.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.navbar && !this.navbar.nativeElement.contains(target)) {
      if (this.isMenuActive) {
        this.isMenuActive = false;
        this.cdr.detectChanges();
      }
    }
  }
}

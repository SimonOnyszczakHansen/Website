import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const heroContent = this.el.nativeElement.querySelector('.hero-content');
    
    if (heroContent) {
      const rect = heroContent.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        this.renderer.addClass(heroContent, 'in-view');
      }
    }
  }
}

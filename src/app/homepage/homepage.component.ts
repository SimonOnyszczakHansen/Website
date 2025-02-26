import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FooterComponent],

  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private el: ElementRef, private renderer: Renderer2, private route: Router) {}

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

  goToContactPage() {
    this.route.navigate(['contact'])
  }
}

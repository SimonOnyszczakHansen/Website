import { Component, ElementRef, ViewChildren, AfterViewInit, QueryList, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgFor],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  images: string[] = [
    "assets/images/PasswordGenerator.png",
    "assets/images/PasswordGenerator2.png"
  ];
  currentSlide: number = 0;
  slideIntervalId: any;

  ngOnInit(): void {
    this.startSlideshow();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    this.projectCards.forEach((projectCard) => {
      observer.observe(projectCard.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.clearSlideshow();
  }

  // Slideshow logic
  startSlideshow() {
    this.slideIntervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 8000);
  }

  clearSlideshow() {
    if (this.slideIntervalId) {
      clearInterval(this.slideIntervalId);
    }
  }
}

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

  passwordGeneratorImages: string[] = [
    "assets/images/PasswordGenerator.webp",
    "assets/images/PasswordGenerator2.webp"
  ];

  vscodeThemeImages: string[] = [
    "assets/images/CustomTheme1.webp",
    "assets/images/CustomTheme2.webp"
  ]
  currentSlidePasswordGenerator: number = 0;
  slideIntervalIdPasswordGenerator: any;

  currentSlideVscodeTheme: number = 0;
  slideIntervalIdVscodeTheme: any;

  ngOnInit(): void {
    this.startPasswordGeneratorSlideshow();
    this.startVscodeThemeSlideshow();
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
    this.clearPasswordGeneratorSlideshow();
  }

  startPasswordGeneratorSlideshow() {
    const slideShow = () => {
      this.currentSlidePasswordGenerator = (this.currentSlidePasswordGenerator + 1) % this.passwordGeneratorImages.length;
      requestAnimationFrame(slideShow);
    };
    requestAnimationFrame(slideShow);
  }

  startVscodeThemeSlideshow() {
    this.slideIntervalIdVscodeTheme = setInterval(() => {
      this.currentSlideVscodeTheme = (this.currentSlideVscodeTheme + 1) % this.vscodeThemeImages.length;
      }, 8000);
  }

  clearPasswordGeneratorSlideshow() {
    if (this.slideIntervalIdPasswordGenerator) {
      clearInterval(this.slideIntervalIdPasswordGenerator);
    }
  }

  clearVscodeThemeSlideshow() {
    if (this.slideIntervalIdVscodeTheme) {
      clearInterval(this.slideIntervalIdVscodeTheme);
      }
  }
}
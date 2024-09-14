import { Component, ElementRef, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

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
}

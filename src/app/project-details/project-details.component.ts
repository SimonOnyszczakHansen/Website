import { NgIf, Location } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  projectId!: string;
  loading = true;
  error: string | null = null;
  activeSection = 'section1';

  private observer!: IntersectionObserver;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = id;
      } else {
        this.error = 'Project ID not found';
      }
      this.loading = false;
    }, error => {
      this.error = 'Failed to load project details';
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => this.observer.observe(section));
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  goBack(): void {
    this.location.back();
  }

  scrollToSection(sectionId: string): void {
    const offset = 100;
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const scrollPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
      this.activeSection = sectionId;
    }
  }
}

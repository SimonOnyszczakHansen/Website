import { NgIf } from '@angular/common';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';

interface Project {
  id: string;
  title: string;
  description: string;
  sections: {
    introduction: string;
    howItWorks: string;
    usage: string;
  };
  images: {
    preview: string;
    result: string;
  };
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  projectId!: string;
  project!: Project;
  loading = true;
  error: string | null = null;
  activeSection = 'section1';
  private intersectionObserver!: IntersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.projectId = id;
          this.loadProjectDetails(id);
        } else {
          this.error = 'Project ID not found';
          this.loading = false;
        }
      },
      error: () => {
        this.error = 'Failed to load project details';
        this.loading = false;
      },
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  scrollToSection(sectionId: string): void {
    const offset = 150;
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const scrollPosition = window.scrollY + elementPosition - offset;
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
      this.activeSection = sectionId;
    }
  }

  private loadProjectDetails(id: string): void {
    setTimeout(() => {
      if (id === 'password-generator') {
        this.project = {
          id: 'password-generator',
          title: 'Password Generator',
          description:
            'This application generates robust, memorable passwords by blending personal words or interests with random elements. Unlike typical generators that churn out random gibberish, this approach ensures each password remains highly secure yet easy to recall. The tool also detects whether your browser is set to English or Danish, enhancing usability across different language settings.',
          sections: {
            introduction:
              'Welcome to my Password Generator project! This tool lets you combine personal keywords—like your hobbies, favorite foods, or even special numbers—with randomly added symbols and characters to create truly unique passwords. It supports both Danish and English out of the box, switching automatically based on your browser settings. Each password is crafted to be both strong and user-friendly, reflecting your individual preferences while maintaining the highest security standards.',
            howItWorks:
              'Under the hood, the main logic is implemented in script.js. When you add one or more tags—perhaps “soccer,” “pizza,” or “2023”—the script merges them with randomized elements and inserts special characters to increase complexity. If your tags contain Danish letters (æ, ø, å), they can be selectively converted for added security. The result is a personalized password that balances memorability with best-practice security measures, ensuring it’s difficult to crack yet easy for you to remember.',
            usage:
              'After providing your tags, simply click “Generate Password” to see a newly created base password and optional site-specific variations. A built-in strength meter will let you know if your password meets recommended security levels. Additional features include a video tutorial accessible via a modal window and predefined tag sets for quick starts. Whether you need a quick login credential for social media or a complex passphrase for financial accounts, this Password Generator adapts to your requirements while maintaining top-tier security.',
          },
          images: {
            preview: 'assets/images/PasswordGenerator.png',
            result: 'assets/images/password-generator-result.png',
          },
        };
      } else {
        this.error = 'Project not found';
      }
      this.loading = false;
      this.cdr.detectChanges();
      this.initializeIntersectionObserver();
    }, 1000);
  }
  

  private initializeIntersectionObserver(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
          this.cdr.detectChanges();
        }
      });
    }, options);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => this.intersectionObserver.observe(section));
  }
}

import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as prism from 'prismjs';
import 'prismjs/components/prism-typescript';

interface Section {
  id: string,
  title: string,
  content: string,
  image?: string,
}

interface Project {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  codesnippet: string;
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  projectId!: string;
  project!: Project;
  loading = true;
  error: string | null = null;
  activeSection = 'section1';
  sanitizedCodeSnippet: SafeHtml | null = null;
  private intersectionObserver!: IntersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }

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

  ngAfterViewInit(): void {
    prism.highlightAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project?.codesnippet) {
      this.sanitizeAndHighlightCode(this.project.codesnippet);
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  scrollToSection(sectionId: string): void {
    const offset = 200;
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
          description: 'This application securely generates memorable passwords by mixing personal keywords (like your hobbies) with randomized elements. Unlike typical generators that churn out random gibberish, ours ensures each password remains both robust and easy to recall. It also detects your browser language (English or Danish) for a smoother experience.',
          sections: [
            {
              id: 'introduction',
              title: 'Introduction',
              content: 'The Password Generator is built around the idea that a strong password should not only resist brute-force attacks but also be easy to remember. It accomplishes this by letting users input personal words—such as hobbies, colors, and numbers—and blending them with special characters, uppercase options, and random placement to produce unique combinations. The generator ensures the final result meets modern security standards, including length and character variety, while remaining personal enough to recall without hassle.',
              image: 'assets/images/PasswordGenerator.png',
            },
            {
              id: 'features',
              title: 'Key Features',
              content: 'One of its central features is dynamic input: interests and numbers can be typed or chosen from predefined lists, making it easy to experiment with different memorable words. A built-in mechanism transforms certain Danish characters into symbols for enhanced security, automatically detecting if the browser is in Danish or English. On-screen sliders let users instantly adjust overall length or how many letters are extracted from each interest. The tool evaluates the strength of the password on the spot, highlighting whether it meets criteria such as lowercase, uppercase, numbers, special characters, and overall length. Once a base password is formed, an additional slider allows for appending abbreviated service names, ensuring that each login (such as for Facebook, Google, or LinkedIn) gets a unique, traceable, yet still memorable password.',
            },
            {
              id: 'technology',
              title: 'Technology and Implementation',
              content: 'The project uses HTML, CSS, and Vanilla JavaScript for a responsive, intuitive single-page application. The code dynamically enforces rules as you type, instantly updating what the password might look like and whether it meets the criteria. The interface is styled to adapt gracefully to different screens, and each step is designed to guide the user without overwhelming them with too many fields at once. Hoverable tooltips clarify any confusing features, such as how the special character mapping works or how many characters from a website name get appended. A short modal video can also guide new users through the entire process in case they feel uncertain about generating a secure passphrase.',
            },
            {
              id: 'conclusion',
              title: 'Conclusion',
              content: 'This Password Generator proves that memorable passwords can be safe when carefully combining personal interests with structured randomness. By automating best practices and nudging the user to include a variety of character types, the generator produces truly robust credentials. The multilingual functionality further extends accessibility for users, whether they prefer an English or Danish interface. This project reflects an ongoing commitment to security-minded design, offering not just raw strength but practical memorability for everyday use.',
              image: 'assets/images/PasswordGeneratorResult.png',
            },
          ],
          codesnippet: '',
        };
        this.sanitizeAndHighlightCode(this.project.codesnippet);
      } else if (id == 'portionpal') {
        this.project = {
          id: 'portionpal',
          title: 'PortionPal',
          description:
            '...',
          sections: [
            {
              id: '',
              title: '',
              content: '',
            }
          ],
          codesnippet: ''
        }
      } else if (id == "smart-city-traffic-management") {
        this.project = {
          id: 'smart-city-traffic-management',
          title: 'Smart City Traffic Management',
          description: '...',
          sections: [
            {
              id: '',
              title: '',
              content: '',
            }
          ],
          codesnippet: '',
        }
      }
      else {
        this.error = 'Project not found';
      }
      this.loading = false;
      this.cdr.detectChanges();
      this.initializeIntersectionObserver();
    }, 2000);
  }

  private sanitizeAndHighlightCode(code: string): void {
    this.sanitizedCodeSnippet = this.sanitizer.bypassSecurityTrustHtml(
      `<pre><code class="language-js">${code}</code></pre>`
    );

    setTimeout(() => prism.highlightAll(), 0);
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
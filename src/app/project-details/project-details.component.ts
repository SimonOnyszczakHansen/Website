import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as prism from 'prismjs';
import 'prismjs/components/prism-typescript';

interface Section {
  id: string,
  title: string,
  content: string,
}

interface Project {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  images: {
    preview: string;
    result: string;
  };
  codesnippet: string;
}

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
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

  ngAfterViewInit(): void {
    prism.highlightAll(); // Initial highlighting after view initialization
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re-run Prism.js highlighting if the content changes dynamically
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
            'This application securely generates memorable passwords by mixing personal keywords (like your hobbies) with randomized elements. Unlike typical generators that churn out random gibberish, ours ensures each password remains both robust and easy to recall. It also detects your browser language (English or Danish) for a smoother experience.',
          sections: [
            {
              id: 'introduction',
              title: '🔐 How Password Generation Works',
              content: 'Welcome to my Password Generator project! Here, you can combine personal keywords—such as your favorite foods, hobbies, or important numbers—with randomized symbols and characters to craft a truly unique password. The tool supports Danish and English right out of the box, automatically matching your browser’s settings. Each generated password is secure and personalized, ensuring strong protection while staying easy to remember.',
            },
            {
              id: 'logic',
              title: '⚙️ The Logic Behind Password Generation',
              content: 'Under the hood, the main logic resides in script.js...',
            },
            {
              id: 'security',
              title: '🔒 Security Features',
              content: 'The password generator applies several security measures to ensure robust protection...',
            },
            {
              id: 'usage',
              title: '📌 How to Use This Password Generator',
              content: 'Begin by entering your chosen tags, then click “Generate Password”...',
            }
          ],
          images: {
            preview: 'assets/images/PasswordGenerator.png',
            result: 'assets/images/PasswordGeneratorResult.png',
          },
          codesnippet: `
function generateBasePassword(tags, charactersPerTag, minLength) {
  const nonNumberTags = tags.filter((tag) => isNaN(tag));
  const numbers = tags.filter((tag) => !isNaN(tag));
  let password = '';

  // Build the password by partially combining each interest with a number
  nonNumberTags.forEach((tag) => {
    let partial = tag.slice(0, charactersPerTag);
    // Capitalize the first letter
    partial = partial.charAt(0).toUpperCase() + partial.slice(1);
    password += partial;
    
    if (numbers.length) {
      password += numbers.shift(); // Insert a number after each interest
    }
  });

  // Append leftover numbers, ensure at least one special character
  if (!/[!@#$%^&*()_\-+=[\]{};:'"\\|,.<>/?]/.test(password)) {
    password += '!';
  }
  return password + numbers.join('');
}`,
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
          images: {
            preview: 'assets/images/PortionPal.png',
            result: 'assets/images/PortionPalResult.png',
          },
          codesnippet: ''
        }
      } else if (id == "smart-city-traffic-management")  {
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
          images: {
            preview: 'assets/images/TrafficManagement.png',
            result: '',
          },
          codesnippet: '',
        }
      }    
      else {
        this.error = 'Project not found';
      }
      this.loading = false;
      this.cdr.detectChanges();
      this.initializeIntersectionObserver();
    }, 1000);
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

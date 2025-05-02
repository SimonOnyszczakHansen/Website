import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  icon?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FooterComponent, CommonModule, RouterLink],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent {
  events: TimelineEvent[] = [
    {
      date: '2015 - 2016',
      title: $localize `Paperboy`,
      description: $localize `Delivered the papers for Folketidende in my local area`,
      icon: 'fas fa-newspaper',
    },
    {
      date: $localize `Jan 2022 - July 2022`,
      title: $localize `Basic Course 2: Data & Communication`,
      description: $localize `took the basic course 2 for data and communication to start my career as a developer`,
      icon: 'fas fa-user-graduate',
    },
    {
      date: $localize `Aug 2022 - Oct 2022`,
      title: 'H1',
      icon: 'fas fa-user-graduate',
    },
    {
      date: $localize `apr 2023 - june 2023`,
      title: 'H2',
      icon: 'fas fa-user-graduate',
    },
    {
      date: 'Jan 2024 - Apr 2024',
      title: 'H3',
      icon: 'fas fa-user-graduate',
    },
    {
      date: $localize `Oct 2024 - Jan 2025`,
      title: 'H4',
      icon: 'fas fa-user-graduate',
    }
  ];
}

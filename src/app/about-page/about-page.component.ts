import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent {
  events: TimelineEvent[] = [
    {
      date: '2021',
      title: 'wdwdaw',
      description: '',
      icon: 'fas fa-user-graduate',
    },
    {
      date: '2022',
      title: 'WJSIFEIF',
      description: '',
      icon: 'fas fa-book-reader'
    },
    {
      date: '2023',
      title: 'WJSIFEIF',
      description: '',
    },
    {
      date: '2024',
      title: 'WJSIFEIF',
      description: '',
    },
    {
      date: '2025',
      title: 'WJSIFEIF',
      description: '',
    }
  ];
}

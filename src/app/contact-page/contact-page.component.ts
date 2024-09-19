import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})

export class ContactPageComponent {
  contactForm: FormGroup;
  showModal = false;      // Controls the visibility of the modal
  modalTitle = '';        // Title of the modal
  modalMessage = '';      // Message inside the modal

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.http.post('api/send-email.php', formData).subscribe(
        (response) => {
          // Show success modal
          this.modalTitle = 'Success';
          this.modalMessage = 'Your message has been sent successfully!';
          this.showModal = true;
          this.contactForm.reset();
        },
        (error) => {
          // Show error modal (request failed)
          this.modalTitle = 'Error';
          this.modalMessage = 'An error occurred while sending your message. Please try again.';
          this.showModal = true;
          console.error(error);
        }
      );
    } else {
      // Show error modal (form invalid)
      this.modalTitle = 'Form Error';
      this.modalMessage = 'Please fill out all fields correctly before submitting the form.';
      this.showModal = true;
    }
  }  

  closeModalOnOutsideClick(event: Event)  {
    this.showModal = false;
  }
  // Close modal
  closeModal() {
    this.showModal = false;
  }
}
import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbar],
  template: `
<mat-toolbar color="primary" class="footer">
  <div class="footer-content">
    <span class="footer-text">&copy; 2025 Your Company Name</span>
    <div class="footer-links">
      <a mat-button href="https://example.com/privacy" target="_blank">Privacy Policy</a>
      <a mat-button href="https://example.com/terms" target="_blank">Terms of Service</a>
      <a mat-button href="https://example.com/contact" target="_blank">Contact Us</a>
    </div>
  </div>
</mat-toolbar>


  `,
  styles: `.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 8px 16px;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-text {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .footer-links {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .footer-links a {
    color: #ffffff;
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  
    .footer-links {
      justify-content: center;
    }
  }
  
  @media (max-width: 480px) {
    .footer-text {
      font-size: 12px;
    }
  
    .footer-links a {
      font-size: 12px;
    }
  }
  
  `
})
export class FooterComponent {

}

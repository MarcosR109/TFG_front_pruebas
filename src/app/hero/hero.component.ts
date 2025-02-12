import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-hero',
  imports: [MatButton],
  template: `
<div class="hero">
  <div class="hero-content">
    <h1>Welcome to Our Product</h1>
    <p>Discover amazing features and solutions tailored for your needs.</p>
    <button mat-raised-button color="primary">Get Started</button>
    <button mat-button>Learn More</button>
  </div>
</div>
  `,
  styles: `
  .hero {
  background: url('https://img.freepik.com/free-vector/red-background-comic-style_23-2149034894.jpg?semt=ais_incoming') no-repeat center center;
  background-size: cover;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 16px;
}

.hero-content {
  max-width: 800px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }
}
`
})
export class HeroComponent {

}

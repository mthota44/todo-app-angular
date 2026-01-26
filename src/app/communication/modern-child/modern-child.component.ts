import { Component, input, output, model, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * ==============================================================================
 * 🚀 MODERN ANGULAR COMPONENT (Signals API)
 * ==============================================================================
 * 
 * In Angular 17/18, we can use "Signals" for communication.
 * This is cleaner, faster, and more reactive than the old @Input/@Output decorators.
 */

@Component({
  selector: 'app-modern-child',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modern-child.component.html',
  styleUrl: './modern-child.component.css'
})
export class ModernChildComponent {

  // 1. SIGNAL INPUT
  // Tells Angular: "I expect a string. If not provided, use default."
  dataFromParent = input<string>('Waiting...');

  // 2. SIGNAL MODEL (Two-Way)
  // Tells Angular: "I share this number with my parent. We can both change it."
  countModel = model<number>(0);

  // 3. SIGNAL OUTPUT
  // Tells Angular: "I can emit events to my parent."
  onBellRing = output<string>();

  constructor() {
    // 4. EFFECT (Auto-Run Logic)
    // Runs automatically whenever a signal inside it changes.
    effect(() => {
      console.log(`Child detects change: ${this.dataFromParent()}`);
    });
  }

  sendNotification() {
    this.onBellRing.emit('Ding Dong! 🔔');
  }
}

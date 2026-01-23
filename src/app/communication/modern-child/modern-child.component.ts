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
    template: `
    <div class="modern-child">
      <h3>🚀 Modern Child (Signals)</h3>
      
      <!-- 1. SIGNAL INPUT -->
      <div class="section">
        <strong>1. Signal Input (input()):</strong>
        <!-- We read signals like functions: dataFromParent() -->
        <p class="highlight">{{ dataFromParent() }}</p>
      </div>

      <!-- 2. SIGNAL MODEL (2-Way Binding) -->
      <div class="section">
        <strong>2. Model Input (model()):</strong><br>
        <small>Change this value, it updates parent automatically!</small><br>
        <input [ngModel]="countModel()" (ngModelChange)="countModel.set($event)" type="number">
      </div>

      <!-- 3. MODERN OUTPUT -->
      <div class="section">
        <strong>3. Modern Output (output()):</strong><br>
        <button (click)="sendNotification()">🔔 Ring Bell</button>
      </div>
    </div>
  `,
    styles: [`
    .modern-child {
      border: 2px solid #9C27B0;
      background-color: #F3E5F5;
      padding: 20px;
      margin-top: 20px;
      border-radius: 10px;
    }
    .section { margin-bottom: 15px; border-bottom: 1px dashed #CE93D8; padding-bottom: 10px; }
    .highlight { color: #6A1B9A; font-weight: bold; font-size: 1.1em; }
    button { background-color: #9C27B0; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; }
    button:hover { background-color: #7B1FA2; }
    input { padding: 5px; width: 60px; }
  `]
})
export class ModernChildComponent {

    // ==========================================================================
    // 1. SIGNAL INPUTS (Replaces @Input)
    // ==========================================================================
    // Old: @Input() dataFromParent: string = 'default';
    // New: dataFromParent = input<string>('default');
    dataFromParent = input<string>('Waiting for signal...');

    // You can also make it required:
    // requiredData = input.required<string>();

    // ==========================================================================
    // 2. SIGNAL MODEL (Replaces @Input + @Output for 2-way binding)
    // ==========================================================================
    // This creates a writable signal that syncs with the parent.
    // Parent uses: [(countModel)]="parentValue"
    countModel = model<number>(0);

    // ==========================================================================
    // 3. MODERN OUTPUT (Replaces @Output)
    // ==========================================================================
    // Old: @Output() onBellRing = new EventEmitter<string>();
    // New: onBellRing = output<string>();
    onBellRing = output<string>();

    constructor() {
        // ==========================================================================
        // EFFECT (Replaces ngOnChanges)
        // ==========================================================================
        // Effects run automatically whenever any signal they read changes.
        effect(() => {
            console.log(`[Modern Child] The input changed to: ${this.dataFromParent()}`);
            console.log(`[Modern Child] The count model is now: ${this.countModel()}`);
        });
    }

    sendNotification() {
        this.onBellRing.emit('Ding Dong! 🔔 (from Signals Child)');
    }
}

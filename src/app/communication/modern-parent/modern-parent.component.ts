import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModernChildComponent } from '../modern-child/modern-child.component';

@Component({
    selector: 'app-modern-parent',
    standalone: true,
    imports: [CommonModule, FormsModule, ModernChildComponent],
    template: `
    <div class="container">
      <h1>⚡ Modern Angular Communication (v17+)</h1>
      <p>Using <strong>Signals</strong>: <code>input()</code>, <code>output()</code>, and <code>model()</code>.</p>

      <div class="row">
        
        <!-- PARENT -->
        <div class="col parent-box">
          <h2>👨‍💻 Parent Component</h2>

          <!-- 1. SENDING DATA -->
          <div class="section">
            <strong>1. Send Signal Input:</strong><br>
            <input type="text" [(ngModel)]="parentMessage" placeholder="Type for child...">
          </div>

          <!-- 2. TWO-WAY BINDING -->
          <div class="section">
            <strong>2. Two-Way Model (model()):</strong><br>
            <button (click)="counter = counter - 1">-</button>
            <span class="counter-display">{{ counter }}</span>
            <button (click)="counter = counter + 1">+</button>
            <br><small>Updates in both Parent & Child!</small>
          </div>

          <!-- 3. OUTPUT LOG -->
          <div class="section">
            <strong>3. Output Log:</strong>
            <p class="log" *ngIf="lastLog">{{ lastLog }}</p>
          </div>
        </div>

        <!-- CHILD -->
        <div class="col">
          <!-- 
             SYNTAX REMAINS "MOSTLY" THE SAME IN HTML!
             [dataFromParent]="..."  -> Sets the input signal
             [(countModel)]="..."    -> Bi-directional sync with model signal
             (onBellRing)="..."      -> Listens to output signal
          -->
          <app-modern-child
            [dataFromParent]="parentMessage"
            [(countModel)]="counter"
            (onBellRing)="handleRing($event)">
          </app-modern-child>
        </div>

      </div>

      <div class="explanation">
          <h3>🧐 What Changed?</h3>
          <ul>
            <li><strong>No Decorators:</strong> No more <code>{{ '@' }}Input</code> or <code>{{ '@' }}Output</code>. We use functions.</li>
            <li><strong>Signals:</strong> Inputs are now read-only Signals (e.g. <code>myInput()</code>).</li>
            <li><strong>Two-Way Binding:</strong> <code>model()</code> creates a writable signal that syncs both ways automatically.</li>
            <li><strong>Effects:</strong> We use <code>effect()</code> instead of <code>ngOnChanges</code> to react to updates.</li>
          </ul>
      </div>
    </div>
  `,
    styles: [`
    .container { padding: 20px; max-width: 1000px; margin: 0 auto; }
    .row { display: flex; gap: 20px; flex-wrap: wrap; }
    .col { flex: 1; min-width: 300px; }
    .parent-box { border: 2px solid #673AB7; background-color: #EDE7F6; padding: 20px; border-radius: 10px; }
    .section { margin-bottom: 15px; border-bottom: 1px dashed #B39DDB; padding-bottom: 10px; }
    .counter-display { font-size: 1.5em; font-weight: bold; margin: 0 10px; }
    .log { background: #fff; padding: 5px; border-left: 4px solid #E91E63; }
    button { margin: 5px; cursor: pointer; padding: 5px 10px; }
    input { padding: 8px; width: 70%; }
    .explanation { margin-top: 30px; background: #FFF9C4; padding: 15px; border-radius: 8px; border: 1px solid #FBC02D; }
  `]
})
export class ModernParentComponent {

    parentMessage: string = 'Hello Signals!';
    counter: number = 10;
    lastLog: string = '';

    handleRing(msg: string) {
        this.lastLog = `${new Date().toLocaleTimeString()}: ${msg}`;
    }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LifecycleChildComponent } from './lifecycle-child.component';

@Component({
    selector: 'app-lifecycle-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, LifecycleChildComponent],
    template: `
    <div class="container">
      <h1>♻️ Lifecycle Hooks Demo</h1>
      <p>Open the <strong>Console (F12)</strong> to watch the lifecycle journey.</p>

      <div class="controls">
        <!-- TOGGLE BUTTON -->
        <button (click)="isChildVisible = !isChildVisible" 
                [ngClass]="{'btn-red': isChildVisible, 'btn-green': !isChildVisible}">
          {{ isChildVisible ? 'destroy' : 'create' }} Child Component
        </button>

        <br><br>

        <!-- INPUT CHANGE -->
        <div *ngIf="isChildVisible">
          <label>Change Input Data: </label>
          <input type="text" [(ngModel)]="parentInput" placeholder="Type here...">
          <small> (Triggers ngOnChanges)</small>
        </div>
      </div>

      <!-- THE CHILD COMPONENT -->
      <div *ngIf="isChildVisible; else noChild">
        <app-lifecycle-child [data]="parentInput"></app-lifecycle-child>
      </div>

      <ng-template #noChild>
        <div class="empty-state">
          <p>👻 Component is dead/not created.</p>
        </div>
      </ng-template>

      <div class="explanation">
        <h3>📝 Cheat Sheet</h3>
        <ul>
          <li><strong>ngOnChanges</strong>: Runs when {{ '@' }}Input changes.</li>
          <li><strong>ngOnInit</strong>: Runs once when component starts. (API calls go here!)</li>
          <li><strong>ngDoCheck</strong>: Runs constantly (change detection). Be careful!</li>
          <li><strong>ngAfterViewInit</strong>: Runs when HTML is done rendering.</li>
          <li><strong>ngOnDestroy</strong>: Runs right before it vanishes. (Cleanup/Unsubscribe).</li>
        </ul>
      </div>
    </div>
  `,
    styles: [`
    .container { padding: 20px; max-width: 800px; margin: 0 auto; }
    .controls { background: #f5f5f5; padding: 20px; border-radius: 8px; border: 1px solid #ccc; }
    .empty-state { background: #ffebee; border: 2px dashed #f44336; padding: 20px; text-align: center; margin-top: 10px; }
    .btn-green { background: #4caf50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 4px; font-weight: bold; }
    .btn-red { background: #f44336; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 4px; font-weight: bold; }
    .explanation { margin-top: 30px; background: #e3f2fd; padding: 20px; border-left: 5px solid #2196f3; }
    li { margin-bottom: 8px; }
  `]
})
export class LifecycleDemoComponent {
    isChildVisible: boolean = false;
    parentInput: string = 'Hello World';
}

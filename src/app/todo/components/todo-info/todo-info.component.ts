import { Component } from '@angular/core';

@Component({
    selector: 'app-todo-info',
    standalone: true,
    template: `
    <div style="background-color: #f0f8ff; padding: 15px; margin-top: 20px; border-radius: 8px;">
      <h3>Todo Information</h3>
      <p>This component is loaded inside the TodoComponent via a nested router-outlet!</p>
      <p>Here you could show statistics, charts, or detailed descriptions.</p>
    </div>
  `
})
export class TodoInfoComponent { }

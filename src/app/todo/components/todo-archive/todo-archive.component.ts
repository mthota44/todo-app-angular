import { Component } from '@angular/core';

@Component({
    selector: 'app-todo-archive',
    standalone: true,
    template: `
    <div style="background-color: #fff0f5; padding: 15px; margin-top: 20px; border-radius: 8px;">
      <h3>Archived Todos</h3>
      <p>This is another child route example.</p>
      <ul>
        <li><s>Old Task 1</s></li>
        <li><s>Old Task 2</s></li>
      </ul>
    </div>
  `
})
export class TodoArchiveComponent { }

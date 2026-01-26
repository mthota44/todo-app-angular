import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LifecycleChildComponent } from './lifecycle-child.component';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, LifecycleChildComponent],
  templateUrl: './lifecycle-demo.component.html',
  styleUrl: './lifecycle-demo.component.css'
})
export class LifecycleDemoComponent {

  isChildVisible: boolean = false;
  parentInput: string = 'Hello World';

  toggleChild() {
    this.isChildVisible = !this.isChildVisible;
  }
}


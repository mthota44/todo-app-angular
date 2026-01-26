import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModernChildComponent } from '../modern-child/modern-child.component';

@Component({
  selector: 'app-modern-parent',
  standalone: true,
  imports: [CommonModule, FormsModule, ModernChildComponent],
  templateUrl: './modern-parent.component.html',
  styleUrl: './modern-parent.component.css'
})
export class ModernParentComponent {

  parentMessage: string = 'Hello Signals!';
  counter: number = 10;
  lastLog: string = '';

  handleRing(msg: string) {
    this.lastLog = msg;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-third-party-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, BaseChartDirective],
  templateUrl: './third-party-demo.component.html',
  styleUrls: ['./third-party-demo.component.css']
})
export class ThirdPartyDemoComponent {

  // Editor Content
  editorContent = '<h3>Hello, this is a Quill Editor!</h3><p>You can edit this text...</p>';

  // Bar Chart Configuration
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      { data: [65, 59, 80, 81, 56], label: 'Tasks Completed' },
      { data: [28, 48, 40, 19, 86], label: 'Tasks Pending' }
    ]
  };

  // Pie Chart Configuration
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
    datasets: [{
      data: [300, 500, 100]
    }]
  };
  public pieChartType: ChartType = 'pie';

}

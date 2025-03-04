import { Component } from '@angular/core';
import { ExpenseFormComponent } from "./components/expense-form/expense-form.component";
import { ExpenseListComponent } from "./components/expense-list/expense-list.component";
import { ExpenseSummaryComponent } from "./components/expense-summary/expense-summary.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ExpenseFormComponent, ExpenseListComponent, ExpenseSummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expenseTracker';
  
}

import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense/expense.module';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-summary',
  imports: [CommonModule],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.css'
})
export class ExpenseSummaryComponent {
  total$: Observable<number>;
  expenses$: Observable<Expense[]>;

  constructor(private expenseService: ExpenseService) {
    this.expenses$ = this.expenseService.expenses$;
    this.total$ = this.expenses$.pipe(map(expenses => expenses.reduce((acc, exp) => acc + exp.amount, 0)));
  }
}

import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Observable } from 'rxjs';
import { Expense } from '../../models/expense/expense.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
  expenses$: Observable<Expense[]>;

  constructor(private expenseService: ExpenseService) {
    this.expenses$ = this.expenseService.expenses$;
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
  }

  editExpense(expense: Expense) {
    this.expenseService.startEditing(expense);
  }
}

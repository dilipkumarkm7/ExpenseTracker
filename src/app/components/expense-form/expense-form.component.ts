import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense/expense.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css',
})
export class ExpenseFormComponent implements OnInit, OnDestroy {
  title = '';
  amount!: number;
  category = '';
  customCategory = '';
  editingExpense: Expense | null = null;

  private subscription!: Subscription;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.subscription = this.expenseService.editExpense$.subscribe((expense) => {
      if (expense) {
        this.editingExpense = expense;
        this.title = expense.title;
        this.amount = expense.amount;
        this.category = expense.category;
      }
    });
  }

  addOrUpdateExpense() {
    if (!this.title.trim() || !this.amount || this.amount <= 0 || !this.category) {
      return;
    }

    const selectedCategory = this.category === 'Others' ? this.customCategory.trim() : this.category;

    if (this.editingExpense) {
      this.expenseService.updateExpense({
        ...this.editingExpense,
        title: this.title,
        amount: this.amount,
        category: selectedCategory,
      });
    } else {
      this.expenseService.addExpense({
        id: Math.random().toString(36).substr(2, 9),
        title: this.title,
        amount: this.amount,
        category: selectedCategory,
        date: new Date().toISOString().split('T')[0],
      });
    }

    this.clearForm();
  }

  clearForm() {
    this.title = '';
    this.amount = 0;
    this.category = '';
    this.customCategory = '';
    this.editingExpense = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

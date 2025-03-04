import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Expense } from '../models/expense/expense.module';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expensesSubject = new BehaviorSubject<Expense[]>(this.loadExpenses());
  expenses$ = this.expensesSubject.asObservable();

  private editExpenseSubject = new Subject<Expense>();
  editExpense$ = this.editExpenseSubject.asObservable();

  constructor() {}

  private loadExpenses(): Expense[] {
    const data = localStorage.getItem('expenses');
    return data ? JSON.parse(data) : [];
  }

  private saveExpenses(expenses: Expense[]) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  addExpense(expense: Expense) {
    const updatedExpenses = [...this.expensesSubject.value, expense];
    this.expensesSubject.next(updatedExpenses);
    this.saveExpenses(updatedExpenses);
  }

  deleteExpense(id: string) {
    const updatedExpenses = this.expensesSubject.value.filter(exp => exp.id !== id);
    this.expensesSubject.next(updatedExpenses);
    this.saveExpenses(updatedExpenses);
  }

  updateExpense(updatedExpense: Expense) {
    const updatedExpenses = this.expensesSubject.value.map(exp =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    );
    this.expensesSubject.next(updatedExpenses);
    this.saveExpenses(updatedExpenses);
  }

  startEditing(expense: Expense) {
    this.editExpenseSubject.next(expense);
  }
}

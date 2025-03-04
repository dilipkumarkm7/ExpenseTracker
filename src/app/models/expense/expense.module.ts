import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ExpenseModule { }

import { Component, Input } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Todo } from '../../models/Todo.type';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgStyle],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class FormComponent {
  @Input() todo!: Todo;

  constructor(public todoService: TodoService) {}

  completedTask(todo: Todo) {
    this.todoService.completedTodo(todo);
  }

  editTask(event: Event, todo: Todo) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.todoService.editTodo(inputValue, todo);
  }

  deleteTask(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }
}

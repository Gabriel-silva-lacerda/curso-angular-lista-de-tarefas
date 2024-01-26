import { Component, OnInit, WritableSignal } from '@angular/core';
import { HomeTodolistComponent } from '../home-todolist/home-todolist.component';
import { TodoService } from '../../service/todo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { Todo } from '../../models/Todo.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeTodolistComponent, FormsModule, ReactiveFormsModule, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  activeButton!: boolean;
  todoValue!: string;
  todos!: WritableSignal<Todo[]>;
  error!: string;

  constructor(public todoService: TodoService) {}
  ngOnInit(): void {
    this.todos = this.todoService.todoList;  
  }

  onSubmit() {
    this.todoService.addTodo(this.todoValue);
    this.error = this.todoService.duplicateTodo;
    this.todoValue = '';
  }

  deleteAll() {
    this.todoService.cleanTodo();
  }
}

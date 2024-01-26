import { Component, OnInit, WritableSignal } from '@angular/core';
import { Todo } from '../../models/Todo.type';
import { TodoService } from '../../service/todo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { FormComponent } from '../../components/input/input.component';

@Component({
  selector: 'app-home-todolist',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgStyle, FormComponent],
  templateUrl: './home-todolist.component.html',
  styleUrl: './home-todolist.component.scss',
})
export class HomeTodolistComponent implements OnInit {
  todos!: WritableSignal<Todo[]>;

  constructor(public todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.todoList;
  }

  dataFilter(param: boolean) {
    const filter = this.todos().filter(
      (todo: Todo) => todo.isCompleted === param
    );
    return filter.length;
  }
}

import { Injectable, WritableSignal, signal } from '@angular/core';
import { Todo } from '../models/Todo.type';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'todoList';
  todoList: WritableSignal<Todo[]> = signal(
    JSON.parse(localStorage.getItem(this.storageKey) || '[]')
  );

  duplicateTodo!: string;

  addTodo(task: string) {
    const lowerCaseTask = task.toLowerCase();

    if (
      this.todoList().some((item) => item.task.toLowerCase() === lowerCaseTask)
    ) {
      this.duplicateTodo = 'Tarefa duplicada. Não adicionada.';

      return;
    } else this.duplicateTodo = '';

    let id = this.todoList().length + 2;

    const item: Todo = {
      id,
      isCompleted: false,
      task,
    };

    const currentItems = [...this.todoList(), item];
    localStorage.setItem(this.storageKey, JSON.stringify(currentItems));

    this.todoList.set(currentItems);
  }

  deleteTodo(id: number) {
    const index = this.todoList().findIndex((item) => item.id === id);

    if (index !== -1) {
      const updatedList = [...this.todoList()];
      updatedList.splice(index, 1);

      localStorage.setItem(this.storageKey, JSON.stringify(updatedList));
      this.todoList.set(updatedList);
    }
  }

  completedTodo(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;

    const updatedList = [...this.todoList()];
    localStorage.setItem(this.storageKey, JSON.stringify(updatedList));
  }

  editTodo(todoValue: string, todoTask: Todo) {
    const todoIndex = this.todoList().findIndex(
      (todo: Todo) => todo.id === todoTask.id
    );

    if (todoIndex !== -1) {
      const updatedList = [...this.todoList()];
      updatedList[todoIndex].task = todoValue;
      localStorage.setItem(this.storageKey, JSON.stringify(updatedList));
      this.todoList.set(updatedList);
    }
  }

  cleanTodo() {
    localStorage.removeItem(this.storageKey);
    this.todoList.set([]);
  }
}

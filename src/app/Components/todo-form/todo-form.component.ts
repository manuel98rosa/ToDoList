import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService} from '../../services/todo.service'

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todo = {completed :false} as Todo;

  constructor( public todoService: TodoService) { }

  ngOnInit(): void {
  }

  addTodo(){
    if(this.todo.name !== '' &&  this.todo.description != '') 
    this.todoService.addTodo(this.todo);
    this.todo = {};
  }

}

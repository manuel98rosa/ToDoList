import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService} from '../../services/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: any = [];
  editingTodo: Todo;
  editing: boolean = false ;
  
  

  constructor(public  todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos =>{
      this.todos = todos;
    });
  }

  deleteTodo( todo: Todo ){
    this.todoService.deleteTodo(todo);
  }

  editTodo(todo: Todo){
    this.editingTodo = todo;
    this.editing = !this.editing;
  }

  updateTodo(){
   this.todoService.updateTodo(this.editingTodo);
   this.editingTodo = {} as Todo ;
   this.editing = false;
  }

  toggleDone(todo: Todo){
   this.todoService.completedTodo(todo);
   
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosCollection: AngularFirestoreCollection ;
  todos: Observable <any []>;
  todoDoc: AngularFirestoreDocument<Todo >;
  

  constructor(public db:AngularFirestore) {
    //this.todos = this.db.collection('todos').valueChanges();
    this.todosCollection = this.db.collection('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(map((actions: any[]) =>{
      return actions.map ( a =>{
        const data = a.payload.doc.data() as Todo;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

   }

   getTodos(){
     return this.todos;
   }

   addTodo(todo: Todo){
     todo.completed= false;
      this.todosCollection.add(todo);
      
   }


   deleteTodo(todo: Todo){
    this.todoDoc = this.db.doc(`todos/${todo.id}`);
    this.todoDoc.delete();
   }

   updateTodo(todo: Todo){
    this.todoDoc = this.db.doc(`todos/${todo.id}`);
    this.todoDoc.update(todo);
   }

   completedTodo(todo: Todo){
    this.todoDoc = this.db.doc(`todos/${todo.id}`);
    this.todoDoc.update({completed : true})
   }


}

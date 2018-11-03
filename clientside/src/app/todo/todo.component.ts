import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FamilyService } from '../services/family.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  family: Array<object>;
  todos: Array<object>;
  todo: object;
  todofamilyname: string;
  onefamily: any;
  description: string;
  datetodo: string;
  addtodoform: Boolean;
  edittodoform: Boolean;
  familyidvalue: string;
  todoUrl: string;


  constructor(private _todoservice: TodoService, private _familyService: FamilyService) {
    this.addtodoform = false;
    this.edittodoform = false;
  }


  getAllfamily(): void {
    this._familyService.getallfamily()
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe((data) => {
        this.family = data['families'];
        console.log(this.family);
      });
  }

// get all
  getalltodo(): void {
    this._todoservice.getalltodo()
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe((data) => {
        this.todos = data['todos'];
        console.log(this.todos);
      });
  }

  // add todo
  addtodo(familyid, description): void {
    console.log(familyid);
    console.log(description);
    this._todoservice.addfamily({ familyid: familyid, description: description })
    .subscribe(todo => {
      this.todos.push(todo);
      this.getalltodo();
    });

  }

  // delete todo
  deletetodo(todo): void {
    console.log(todo['request']['url']);
    this.todoUrl = todo['request']['url'];
    this.todos = this.todos.filter(d => d !== todo);
    this._todoservice.deletetodo(this.todoUrl).subscribe(() => {
        this.getalltodo();
      });
}

// show one

showeditform(todo) {
  console.log(todo);
  this.todoUrl = todo['request']['url'];
  this.edittodoform = true;
  this.addtodoform = false;
  this._todoservice.getoneotodo(this.todoUrl)
  // tslint:disable-next-line:no-shadowed-variable
  .subscribe((todo) => {
    console.log(todo);
    this.todofamilyname = todo['todo']['familymember']['name'];
    this.description = todo['todo']['description'];
    this.datetodo = todo['todo']['createdat'];
    console.log( this.datetodo);
    console.log( this.description);
    console.log( this.todofamilyname);
    this.getalltodo();
  });

}


  ngOnInit() {
    this.getAllfamily();
    this.getalltodo();
  }

  showaddform(): void {
    this.addtodoform = true;
    this.edittodoform = false;
  }

  hideaddform(): void {
    this.addtodoform = false;

  }

  // passthetodoid(familyid): void {
  //   console.log(familyid);
  //   this.familyidvalue = familyid;
  // }

  hideeditform(): void {
    this.edittodoform = false;
  }


}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  newtask ='';
  
  tasks:Task[] =[];
   addTask(){
    if(this.newtask.trim() === ''){
      return;
   }

   this.tasks.push({title:this.newtask, completed:false});
   this.newtask = '';
}
completeTask(task: Task){
  task.completed = !task.completed;
}
deleteTask(index: number){
  this.tasks.splice(index, 1);
}
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './models/task';
import { HttpClient } from '@angular/common/http';
import { StringConsts } from './models/stringConsts';
import { DialogService } from './dialog/dialog.service';
import { CreateTaskParam } from './models/createTaskParam';
import { TaskProcessResult } from './models/taskProcessesResult';

const API_LIST_PENDING_URL = `${environment.apiUrl}/listPendingTasks`;
const API_LIST_OVERDUE_URL = `${environment.apiUrl}/listOverdueTasks`;
const API_POST_CREATE_TASK_URL = `${environment.apiUrl}/createTodoTask`;
const API_POST_EDIT_TASK_URL = `${environment.apiUrl}/editTodoTask`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TodoList';
  pendingTasks: Task[];
  overdueTasks: Task[];
  currentPendingPage = 1;
  currentOverduePage = 1;
  pendingTasksLength: number;
  totalPage = 6;
  overdueTasksLength: number;
  noPendingTask: string;
  noOverdueTask: string;
  taskforEdit: Task;
  taskforCreate: Task;
  createTaskparam: CreateTaskParam;
  ischecked: boolean = false;

  constructor(private http: HttpClient, public dialogService: DialogService) {
    this.initCreateTask();
    this.initEditTask();
    this.createTaskparam = new CreateTaskParam();
  }

  ngOnInit(): void {
    this.noPendingTask = StringConsts.noPendingTasks;
    this.noOverdueTask = StringConsts.noOverdueTasks;
    this.getPendingTasks().subscribe((data) => {
      this.pendingTasks = data;
      this.pendingTasksLength = data.length;
    });
    this.getOverdueTasks().subscribe((data) => {
      this.overdueTasks = data;
      this.overdueTasksLength = data.length;
    });
  }

  getPendingTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_LIST_PENDING_URL);
  }

  getOverdueTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_LIST_OVERDUE_URL);
  }

  pageChanged(id: string, event: number) {
    if (id == 'pendingtasks') this.currentPendingPage = event;
    else this.currentOverduePage = event;
  }

  pendingClicked() {
    this.ischecked = false;
    this.getPendingTasks().subscribe((data) => {
      this.pendingTasks = data;
      this.pendingTasksLength = data.length;
    });
  }

  overdueClicked() {
    this.ischecked = false;
    this.getOverdueTasks().subscribe((data) => {
      this.overdueTasks = data;
      this.overdueTasksLength = data.length;
    });
  }

  createTask() {
    if (!(this.taskforCreate.title > '')) {
      this.dialogService.openModal(
        'Missing Field',
        'Please type task title',
        false
      );
      return;
    } else {
      this.createTaskparam.title = this.taskforCreate.title;
      this.createTaskparam.dueDate = this.taskforCreate.dueDate;
      this.createTaskProcesses().subscribe((data) => {
        this.dialogService.openModal(
          data.isSuccessful ? 'Success' : 'Error',
          data.isSuccessful ? 'New task created' : data.errorMessage,
          data.isSuccessful
        );
        if (data.isSuccessful) this.initCreateTask();
      });
    }
  }

  createTaskProcesses(): Observable<TaskProcessResult> {
    return this.http.post<TaskProcessResult>(
      API_POST_CREATE_TASK_URL,
      this.createTaskparam
    );
  }

  editTask() {
    if (!(this.taskforEdit.title > '')) {
      this.dialogService.openModal(
        'Missing Field',
        'Please type task title',
        false
      );
      return;
    } else {
      this.editTaskProcesses().subscribe((data) => {
        this.dialogService.openModal(
          data.isSuccessful ? 'Success' : 'Error',
          data.isSuccessful ? 'Task edited' : data.errorMessage,
          data.isSuccessful
        );
        if (data.isSuccessful) this.initEditTask();
      });
    }
  }

  editTaskProcesses(): Observable<TaskProcessResult> {
    return this.http.post<TaskProcessResult>(
      API_POST_EDIT_TASK_URL,
      this.taskforEdit
    );
  }

  fillTaskforEdit(fillTask: Task) {
    this.taskforEdit = fillTask;
    this.ischecked = true;
  }

  initCreateTask() {
    this.taskforCreate = new Task();
    this.taskforCreate.dueDate = new Date();
  }

  initEditTask() {
    this.taskforEdit = new Task();
  }
}

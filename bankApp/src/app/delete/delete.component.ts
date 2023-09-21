import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() item:string|undefined

  // @Input() to hold the data  from the parent (dashboard)
  //Item- property binding-dashboard.html [Item]="acno"

  constructor() { }
@Output() onCancel=new EventEmitter();//onCancel-user defind event
@Output() onDelete=new EventEmitter();
  ngOnInit(): void {
  }

cancel(){
this.onCancel.emit();
}

delete(){
this.onDelete.emit(this.item);
}
}

import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "dialog-template",
  templateUrl: "./dialog-template.component.html",
  styleUrls: ["./dialog-template.component.scss"],
})
export class DialogTemplateComponent {
  modalTitle: string;
  modalMessage: string;
  modalType: ModalType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modalMessage = data.message;
    this.modalType = data.type == true ? ModalType.INFO : ModalType.WARN;
  }
}
export enum ModalType {
  INFO = "info",
  WARN = "warn",
}

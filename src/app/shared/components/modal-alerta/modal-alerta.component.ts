import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.scss']
})
export class ModalAlertaComponent {
  @Input() success: boolean = false;
  @Input() showModal: boolean | null = false;
  @Input() text: string = '';
  constructor(private modalService: ModalService) {

  }

  closeModal() {
    this.modalService.closeModal();
  }
}

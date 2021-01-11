import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { Modal } from 'src/app/shared/models/modal.interface';
import { IDrink } from '../../models/drink.interface';

@Component({
  selector: 'app-modal-shared',
  templateUrl: './modal-shared.component.html',
  styleUrls: ['./modal-shared.component.scss'],
})
export class ModalSharedComponent implements OnInit {

  @Input() drink: IDrink;
  @Output() closeEventEmitter = new EventEmitter();
  linkShared = 'teste'

  constructor(private toast: ToastrService) {}

  ngOnInit(): void {}

  get modalSettings(): Modal {
    return {
      title: 'Compartilhar',
      subtitle: 'Enviar um link',
      btnText: 'Copiar link',
    };
  }

  get link() {
    return window.location.href; ;
  }

  copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.link));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.toast.success('Link copiado com sucesso!')
  }

  close() {
    this.closeEventEmitter.emit();
  }
}

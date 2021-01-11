import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActionType } from 'src/app/shared/enums/action-types';
import { IButton } from 'src/app/shared/models/button.interface';
import { IHeaderOptions } from 'src/app/shared/models/header.interface';
import { HeaderService } from 'src/app/shared/services/header.service';
import { ModalEvaluateComponent } from '../../components/modal-evaluate/modal-evaluate.component';
import { ModalSharedComponent } from '../../components/modal-shared/modal-shared.component';
import { DetailingFacadeService } from '../../facades/detailing-facade.service';

@Component({
  selector: 'app-detailing',
  templateUrl: './detailing.page.html',
  styleUrls: ['./detailing.page.scss'],
})
export class DetailingPage implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(
    public detailingFacade: DetailingFacadeService,
    private headerService: HeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
  ) {
    this.subscriptions.push(
      this.headerService.buttonTrigger.subscribe((button: IButton) => {
        if (button.action === ActionType.SEND) {
          this.openModalSend();
        }

        if (button.action === ActionType.UPDATE) {
          this.openModalUpdate();
        }
      })
    )
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  get headerOptions(): IHeaderOptions {
    return {
      title: `Drink - ${this.detailingFacade.drink.strDrink}`,
      titleColor: 'black',
      hideBackButton: false,
      buttons: this.getButtons()
    };
  }

  private getButtons(): IButton[] {
    const buttons = [];

    buttons.push({
      label: 'Compartilhar',
      action: ActionType.SEND,
    });

    buttons.push({
      label: 'Avaliar',
      action: ActionType.UPDATE,
    });

    return buttons;
  }

  openModalSend() {
    this.vcr.clear();

    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ModalSharedComponent,
    );

    const ref = this.vcr.createComponent(factory);

    ref.instance.drink = this.detailingFacade.drink;

    ref.changeDetectorRef.detectChanges();

    ref.instance.closeEventEmitter.subscribe(() => ref.destroy());
  }

  openModalUpdate() {
    this.vcr.clear();

    const factory = this.componentFactoryResolver.resolveComponentFactory(
      ModalEvaluateComponent,
    );

    const ref = this.vcr.createComponent(factory);
    
    ref.instance.drink = this.detailingFacade.drink;

    ref.changeDetectorRef.detectChanges();

    ref.instance.closeEventEmitter.subscribe(() => ref.destroy());
  }

}

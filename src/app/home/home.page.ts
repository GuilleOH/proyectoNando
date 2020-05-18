import { Component, ViewChild } from '@angular/core';
import { IonTabBar, IonList, AlertController } from '@ionic/angular';
import { ListService } from '../list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild('myTabs', {static: false}) tabRef: IonTabBar;
  @ViewChild('myList', {static: false}) listRef: IonList;
  tabs: any;
  tabIndex: number;
  reorder: boolean;
  darkMode: boolean;

  constructor(private listService: ListService,
              private alertController: AlertController){
    this.tabs = [
      {label: 'Today', icon: 'today-outline', list: []},
      {label: 'Soon', icon: 'calendar-outline', list: []},
      {label: 'Done', icon: 'checkmark', list: []}
    ];
    this.loadLists();
    this.tabIndex = 0;
    this.reorder = false;
  }

  loadLists(){
    this.tabs.forEach((tab, index) => {
      tab.list = this.listService.getList(index);
    });
  }

  darklight () {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark');
  }


  setTab(tabIndex) {
    this.tabIndex = tabIndex;
    this.tabRef.selectedTab = this.tabs[this.tabIndex].label;
  }

  async deleteItem(item?) {
    const alert = await this.alertController.create({
      header: item === undefined ? 'Delete all' : 'Delete item',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.listRef.closeSlidingItems();
            if (item === undefined) {
              this.listService.deleteList(this.tabIndex);
            }
            else {
              this.listService.deleteItem(this.tabIndex, item);
            }
          }
        },
        {
          text: 'CANCEL',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async doneItem(indexItem : number) {

    const alert = await this.alertController.create({
      header: indexItem === undefined ? 'Cancel' : 'Done task',
      message: 'Move to done tasks?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.listRef.closeSlidingItems();
            if (indexItem === undefined) {
              this.listService.deleteList(this.tabIndex);
            }
            else {
              // this.listService.deleteItem(this.tabIndex, item);
              this.listService.moveItemToOtherList(indexItem, this.tabIndex, 2);
            }
          }
        },
        {
          text: 'CANCEL',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
    alert.onDidDismiss().then(()=>{
      //Vuelvo a recargar las listas aunque tendría que haber alguna manera mas limpia de hacer esto
      this.loadLists();
    })


  }

  async soonItem(indexItem) {
    const alert = await this.alertController.create({
      header: indexItem === undefined ? 'Cancel' : '',
      message: 'Move to soon tasks?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.listRef.closeSlidingItems();
            if (indexItem === undefined) {
              this.listService.deleteList(this.tabIndex);
            }
            else {
              // this.listService.deleteItem(this.tabIndex, item);
              this.listService.moveItemToOtherList(indexItem, this.tabIndex, 1);
            }
          }
        },
        {
          text: 'CANCEL',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
    alert.onDidDismiss().then(()=>{
      //Vuelvo a recargar las listas aunque tendría que haber alguna manera mas limpia de hacer esto
      this.loadLists();
    })
  }

  moveItem(indexes) {
    this.listService.moveItem(this.tabIndex, indexes.from, indexes.to);
    indexes.complete();
  }


}

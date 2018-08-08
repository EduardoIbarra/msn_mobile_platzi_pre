import { NgModule } from '@angular/core';
import { FriendComponent } from './friend/friend';
import {CommonModule} from "@angular/common";
@NgModule({
	declarations: [FriendComponent],
	imports: [CommonModule],
	exports: [FriendComponent]
})
export class ComponentsModule {}

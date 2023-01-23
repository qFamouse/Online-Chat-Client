import { Component, OnInit } from "@angular/core";
import { DirectMessageService } from "../../../../shared/modules/api/services/direct-message.service";
import { Interlocutor } from "../../../../shared/models/dto/interlocutor.dto";
import { Message } from "../../../../shared/models/dto/message.dto";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { chatPages } from "../../../../shared/constants/pages";
import { UserService } from "../../../../shared/modules/api/services/user.service";

@Component({
	selector: "app-direct",
	templateUrl: "./direct.component.html",
	styleUrls: ["./direct.component.scss"]
})
export class DirectComponent implements OnInit {
	activateRouteSubscription!: Subscription;
	openedInterlocutorId!: number;
	openedInterlocutorName!: string;
	openedInterlocutorChat!: Message[];
	interlocutors: Interlocutor[] = [];
	messageCache = new Map<number, Message[]>();

	constructor(
		private directMessageService: DirectMessageService,
		private userService: UserService,
		private activateRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activateRouteSubscription = this.activateRoute.params.subscribe(
			params => {
				let paramsId = Number.parseInt(params["id"]);
				let subscribe = this.userService
					.getUserById(paramsId)
					.subscribe(user => {
						this.openedInterlocutorId = user.id;
						this.openedInterlocutorName = user.userName;
						this.loadMessagesByInterlocutorId(user.id);
						subscribe.unsubscribe();
					});
			}
		);

		this.directMessageService.getInterlocutors().subscribe(interlocutors => {
			this.interlocutors = interlocutors;
		});
	}

	async openConversation(id: number) {
		let url = `${chatPages.direct.absolutePath}/${id}`;
		await this.router.navigateByUrl(url);
	}

	loadMessagesByInterlocutorId(id: number) {
		let messages = this.messageCache.get(id);
		if (messages) {
			this.openedInterlocutorChat = messages;
		} else {
			let subscribe = this.directMessageService
				.getChat(id)
				.subscribe(messages => {
					this.openedInterlocutorChat = messages;
					this.messageCache.set(id, messages);
					subscribe.unsubscribe();
				});
		}
	}
}

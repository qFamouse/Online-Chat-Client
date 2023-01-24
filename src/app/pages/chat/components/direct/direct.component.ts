import { Component, OnDestroy, OnInit } from "@angular/core";
import { DirectMessageService } from "../../../../shared/modules/api/services/direct-message.service";
import { Interlocutor } from "../../../../shared/models/dto/interlocutor.dto";
import { Message } from "../../../../shared/models/dto/message.dto";
import { ActivatedRoute, Router } from "@angular/router";
import { first, Subject, takeUntil } from "rxjs";
import { chatPages } from "../../../../shared/constants/pages";
import { UserService } from "../../../../shared/modules/api/services/user.service";
import { User } from "../../../../shared/models/entities/user.entity";

@Component({
	selector: "app-direct",
	templateUrl: "./direct.component.html",
	styleUrls: ["./direct.component.scss"]
})
export class DirectComponent implements OnInit, OnDestroy {
	unsubscribe$ = new Subject<void>();

	openedInterlocutorId!: number;
	openedInterlocutorName!: string;
	openedInterlocutorChat!: Message[];

	currentUser!: User;

	interlocutors: Interlocutor[] = [];
	messageCache = new Map<number, Message[]>();

	constructor(
		private directMessageService: DirectMessageService,
		private userService: UserService,
		private activateRoute: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activateRoute.params
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(params => {
				let paramsId = Number.parseInt(params["id"]);
				let subscribe = this.userService
					.getUserById(paramsId)
					.subscribe(user => {
						this.openedInterlocutorId = user.id;
						this.openedInterlocutorName = user.userName;
						this.loadMessagesByInterlocutorId(user.id);
						subscribe.unsubscribe();
					});
			});

		this.directMessageService
			.getInterlocutors()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(interlocutors => {
				this.interlocutors = interlocutors;
			});

		this.userService
			.currentUser()
			.pipe(first())
			.subscribe(user => {
				this.currentUser = user;
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
				.pipe(first())
				.subscribe(messages => {
					this.openedInterlocutorChat = messages;
					this.messageCache.set(id, messages);
					subscribe.unsubscribe();
				});
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}

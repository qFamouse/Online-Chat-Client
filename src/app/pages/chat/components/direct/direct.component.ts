import { Component, OnDestroy, OnInit } from "@angular/core";
import { DirectMessageService } from "../../../../shared/modules/api/services/direct-message.service";
import { Interlocutor } from "../../../../shared/models/dto/interlocutor.dto";
import { Message } from "../../../../shared/models/dto/message.dto";
import { ActivatedRoute, Router } from "@angular/router";
import { first, Subject, Subscription, takeUntil } from "rxjs";
import { chatPages } from "../../../../shared/constants/pages";
import { UserService } from "../../../../shared/modules/api/services/user.service";
import { User } from "../../../../shared/models/entities/user.entity";
import { SignalRDMServiceService } from "../../../../shared/modules/api/services/signalr/signal-r-dm.service";

@Component({
	selector: "app-direct",
	templateUrl: "./direct.component.html",
	styleUrls: ["./direct.component.scss"]
})
export class DirectComponent implements OnInit, OnDestroy {
	unsubscribe$ = new Subject<void>();
	subscription: Subscription;

	openedInterlocutorId!: number;
	openedInterlocutorName!: string;
	openedInterlocutorChat!: Message[];

	currentUser: User;

	interlocutors: Interlocutor[];
	messageCache = new Map<number, Message[]>();

	constructor(
		private directMessageService: DirectMessageService,
		private userService: UserService,
		private activateRoute: ActivatedRoute,
		private router: Router,
		private signalRService: SignalRDMServiceService
	) {
		this.subscription = new Subscription();
		this.interlocutors = new Array<Interlocutor>();
		this.currentUser = {} as User;

		// SignalR
		this.signalRService.openConnection();

		this.subscription.add(
			this.signalRService.messenger$.subscribe((message: Message) => {
				let messagesFromSender = this.messageCache.get(message.senderId);
				if (messagesFromSender) {
					messagesFromSender.push(message);
				} else {
					this.updateInterlocutors();
				}
			})
		);

		// Reactive load opened direct message
		this.activateRoute.params
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(params => {
				let id = Number.parseInt(params["id"]);
				if (id) {
					this.subscription.add(
						this.userService
							.getUserById(id)
							.pipe(first())
							.subscribe(user => {
								this.openedInterlocutorId = user.id;
								this.openedInterlocutorName = user.userName;
								this.loadMessagesByInterlocutorId(user.id);
							})
					);
				}
			});
	}

	ngOnInit(): void {
		this.updateInterlocutors();
		this.activateRoute.data.subscribe((response: any) => {
			this.currentUser = response.currentUser;
		});
	}

	updateInterlocutors() {
		this.directMessageService
			.getInterlocutors()
			.pipe(first())
			.subscribe(interlocutors => {
				this.interlocutors = interlocutors;
			});
	}

	async openConversation(id: number) {
		let url = `${chatPages.direct.absolutePath}/${id}`;
		await this.router.navigateByUrl(url);
	}

	async onSend(message: string) {
		let savedMessage = await this.signalRService.sendMessage({
			receiverId: this.openedInterlocutorId,
			message: message
		});

		let cacheChat = this.messageCache.get(savedMessage.receiverId);
		if (cacheChat) {
			cacheChat.push(savedMessage);
		} else {
			this.updateInterlocutors();
		}
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
		this.subscription.unsubscribe();
	}
}

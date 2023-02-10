import { Component, OnDestroy, OnInit } from "@angular/core";
import { DirectMessageService } from "../../../../shared/modules/api/services/direct-message.service";
import { Interlocutor } from "../../../../shared/models/dto/interlocutor.dto";
import { MessageDto } from "../../../../shared/models/dto/message.dto";
import { ActivatedRoute, Router } from "@angular/router";
import { first, lastValueFrom, Subject, Subscription, takeUntil } from "rxjs";
import { chatPages } from "../../../../shared/constants/pages";
import { UserService } from "../../../../shared/modules/api/services/user.service";
import { User } from "../../../../shared/models/entities/user.entity";
import { SignalRDMServiceService } from "../../../../shared/modules/api/services/signalr/signal-r-dm.service";
import { AttachmentService } from "../../../../shared/modules/api/services/attachment.service";
import { SendMessageEvent } from "../../models/send-message.event";

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
	openedInterlocutorChat!: MessageDto[];

	currentUser!: User;

	interlocutors: Interlocutor[];
	messageCache = new Map<number, MessageDto[]>();

	constructor(
		private directMessageService: DirectMessageService,
		private userService: UserService,
		private activateRoute: ActivatedRoute,
		private router: Router,
		private signalRService: SignalRDMServiceService,
		private attachmentService: AttachmentService
	) {
		this.subscription = new Subscription();
		this.interlocutors = new Array<Interlocutor>();

		// Information about current user
		this.activateRoute.data.subscribe((response: any) => {
			this.currentUser = response.currentUser;
		});

		// Get current user's interlocutors'
		this.updateInterlocutors();

		// SignalR
		this.signalRService.openConnection();

		this.subscription.add(
			this.signalRService.messenger$.subscribe((message: MessageDto) => {
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

	ngOnInit(): void {}

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

	async onSend(sendMessageEvent: SendMessageEvent) {
		let savedMessage = await this.signalRService.sendMessage({
			receiverId: this.openedInterlocutorId,
			message: sendMessageEvent.text,
			timeToLive: sendMessageEvent.timeToLive
		});

		if (sendMessageEvent.attachments.length > 0) {
			let savedAttachments = await lastValueFrom(
				this.attachmentService.uploadToDirectMessageByMessageId(
					savedMessage.id,
					Array.from(sendMessageEvent.attachments)
				)
			);
			savedMessage.attachments = savedAttachments ?? [];
		}
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
			this.subscription.add(
				this.directMessageService
					.getChat(id)
					.pipe(first())
					.subscribe(messages => {
						this.openedInterlocutorChat = messages;
						this.messageCache.set(id, messages);
					})
			);
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.subscription.unsubscribe();
	}
}

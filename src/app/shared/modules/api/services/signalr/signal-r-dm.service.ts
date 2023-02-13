import { Injectable } from "@angular/core";
import * as SignalR from "@microsoft/signalr";
import { Subject } from "rxjs";
import { MessageDto } from "../../../../models/dto/message.dto";
import { JwtAuthService } from "../../../../services/jwt-auth.service";
import { apiSignalrRoutes } from "../../../../constants/api-routes";
import { SendMessageDto } from "../../../../models/dto/send-message.dto";
import { DeleteMessageDto } from "../../../../models/dto/delete-message.dto";
@Injectable({
	providedIn: "root"
})
export class SignalRDMServiceService {
	connection!: SignalR.HubConnection;
	messenger$ = new Subject<MessageDto>();
	deleter$ = new Subject<DeleteMessageDto>();

	constructor(private jwtAuthService: JwtAuthService) {}

	sendMessage(message: SendMessageDto): Promise<MessageDto> {
		return this.connection.invoke("SendMessage", message);
	}

	async openConnection() {
		this.connection = new SignalR.HubConnectionBuilder()
			.withUrl(apiSignalrRoutes.direct, {
				skipNegotiation: true,
				transport: SignalR.HttpTransportType.WebSockets,
				accessTokenFactory: () => this.jwtAuthService.token
			})
			.withAutomaticReconnect()
			.build();

		await this.connection.start();
		this.receiveMessageHandler();
		this.deleteMessageHandler();
	}

	private receiveMessageHandler() {
		this.connection.on("ReceiveMessage", (message: MessageDto) => {
			this.messenger$.next(message);
		});
	}

	private deleteMessageHandler() {
		this.connection.on("DeleteMessage", (message: DeleteMessageDto) => {
			this.deleter$.next(message);
		});
	}
}

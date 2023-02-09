import { Injectable } from "@angular/core";
import * as SignalR from "@microsoft/signalr";
import { Subject } from "rxjs";
import { Message } from "../../../../models/dto/message.dto";
import { JwtAuthService } from "../../../../services/jwt-auth.service";
import { apiSignalrRoutes } from "../../../../constants/api-routes";
import { SendMessageDto } from "../../../../models/dto/send-message.dto";
@Injectable({
	providedIn: "root"
})
export class SignalRDMServiceService {
	connection!: SignalR.HubConnection;
	messenger$ = new Subject<Message>();

	constructor(private jwtAuthService: JwtAuthService) {}

	sendMessage(message: SendMessageDto): Promise<Message> {
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
	}

	private receiveMessageHandler() {
		this.connection.on("ReceiveMessage", (message: Message) => {
			console.log("receive", message);
			this.messenger$.next(message);
		});
	}
}

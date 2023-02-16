import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";

@Pipe({
	name: "secure"
})
export class SecurePipe implements PipeTransform {
	constructor(private apiService: ApiService) {}
	transform(url: string) {
		return new Observable(observer => {
			// This is a tiny blank image
			observer.next(
				"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
			);

			// The next and error callbacks from the observer
			const { next, error } = observer;

			this.apiService.getBlob(url).subscribe(response => {
				const reader = new FileReader();
				reader.readAsDataURL(response);
				reader.onloadend = function () {
					observer.next(reader.result);
				};
			});

			return { unsubscribe() {} };
		});
	}
}

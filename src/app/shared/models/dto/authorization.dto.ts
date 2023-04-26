export interface AuthorizationDto {
	isAuthSuccessful: boolean;
	isTfaEnabled: boolean;
	token: string;
}

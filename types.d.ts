import { User } from "firebase/auth";

export interface LoggedInUser extends User {
	gender?: string;
	name?: string;
	faculty?: {
		key: number;
		value: string;
	}
}
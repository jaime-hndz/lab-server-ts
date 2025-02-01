import { User } from "../models/User";

export class UserFactory {
    static createUser(username: string, password: string) {
        return new User({ username, password });
    }
}

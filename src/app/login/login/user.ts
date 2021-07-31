export class User {
    id: number;
    username: string;
    password: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.username = obj && obj.username || null;
        this.password = obj && obj.password || null;
    }
}
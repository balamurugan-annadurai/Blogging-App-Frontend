import ApiService from "../api";

class AuthService extends ApiService {
    constructor() {
        super();
        this.resource = "/auth";
    }

    signup(body) {
        return this.post(`${this.resource}/signup`, body);
    }

    login(body) {
        return this.post(`${this.resource}/login`, body);
    }

    verify() {
        return this.get(`${this.resource}/verify`);
    }
}

const authService = new AuthService();
export default authService;

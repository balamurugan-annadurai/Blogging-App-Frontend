import axios from "./api.config";

class ApiService {
    constructor() {
        this.BASE_URL = "";
    }

    makeUrl(resource, queryParams = "") {
        if (!resource) {
            throw new Error("Resource path cannot be undefined or empty.");
        }
        return `${this.BASE_URL}${resource}${queryParams}`;
    }

    post(resource, payload, queryParams) {
        return axios.post(this.makeUrl(resource, queryParams), payload);
    }

    get(resource) {
        return axios.get(this.makeUrl(resource));
    }

    delete(resource) {
        return axios.delete(this.makeUrl(resource));
    }

    put(resource, payload, queryParams) {
        return axios.put(this.makeUrl(resource, queryParams), payload);
    }
}

export default ApiService;

import ApiService from "../api";

class BlogService extends ApiService {
    constructor() {
        super();
        this.resource = "/blogs";
    }

    fetchBlogs(filters = {}) {
        const query = new URLSearchParams(filters).toString();
        const url = query ? `${this.resource}?${query}` : this.resource;
        return this.get(url);
    }
    deleteBlog(id) {
        return this.delete(`${this.resource}/${id}`);
    }
    getBlogById(id) {
        return this.get(`${this.resource}/${id}`);
    }
    updateBlog(id, data) {
        return this.put(`${this.resource}/${id}`, data);
    }
    createBlog(data) {
        return this.post(this.resource, data);
    }

}

const blogService = new BlogService();
export default blogService;

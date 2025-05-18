import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BlogCard } from './../../../components/blogCard';
import { FilterSelect } from '../../../components/filterSelect';
import blogService from '../../../lib/services/blogs/blogService';

const defaultCategories = [
    { value: 'Career', label: 'Career' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Health', label: 'Health' },
    { value: 'Education', label: 'Education' },
    { value: 'Agriculture', label: 'Agriculture' },
];

const Blogs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category') || '';
    const initialAuthor = queryParams.get('author') || '';

    const [filters, setFilters] = useState({
        category: initialCategory,
        author: initialAuthor,
    });

    const [allBlogs, setAllBlogs] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(allBlogs);

    const fetchAllBlogs = async () => {
        try {
            const res = await blogService.fetchBlogs({});
            if (res.data.status) {
                const blogsData = res.data.blogs;
                setAllBlogs(blogsData);

                const uniqueAuthors = [
                    ...new Set(blogsData.map(blog => blog.author))
                ]
                    .filter(Boolean)
                    .map(author => ({
                        value: author,
                        label: author,
                    }));

                setAuthors(uniqueAuthors);
            } else {
                toast.error(res.data.message || 'Failed to load blogs');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching blogs');
        }
    };

    const fetchFilteredBlogs = async (filterParams) => {
        setLoading(true);
        try {
            const res = await blogService.fetchBlogs(filterParams);
            if (res.data.status) {
                setBlogs(res.data.blogs);
            } else {
                toast.error(res.data.message || 'Failed to load blogs');
                setBlogs([]);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching blogs');
            setBlogs([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    useEffect(() => {
        fetchFilteredBlogs(filters);
    }, [filters]);

    const handleFilterChange = (filter, value) => {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set(filter, value);
        } else {
            params.delete(filter);
        }

        navigate(`/blogs?${params.toString()}`);

        setFilters(prev => ({
            ...prev,
            [filter]: value,
        }));
    };

    return (
        <section>
            <div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4 bg-white rounded">
                    <FilterSelect
                        name="category"
                        label="Select Category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        options={defaultCategories}
                    />

                    <FilterSelect
                        name="author"
                        label="Select Author"
                        value={filters.author}
                        onChange={handleFilterChange}
                        options={authors}
                    />
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                    {loading ? (
                        <p>Loading blogs...</p>
                    ) : blogs.length > 0 ? (
                        blogs.map(blog => (
                            <BlogCard
                                key={blog._id || blog.id}
                                blog={blog}
                                currentUser={user}
                                setBlogs={setBlogs}
                            />
                        ))
                    ) : (
                        <p>No blogs found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Blogs;

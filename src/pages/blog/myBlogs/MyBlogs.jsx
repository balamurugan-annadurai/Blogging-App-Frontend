import React, { useEffect, useState } from 'react';
import blogService from '../../../lib/services/blogs/blogService';
import { BlogCard } from '../../../components/blogCard';
import toast from 'react-hot-toast';

const MyBlogs = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMyBlogs = async () => {
        if (!user?.name) return;

        setLoading(true);
        try {
            const res = await blogService.fetchBlogs({ author: user.name });
            if (res.data.status) {
                setBlogs(res.data.blogs);
            } else {
                toast.error(res.data.message || "Failed to fetch your blogs.");
            }
        } catch {
            toast.error("Error fetching your blogs.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    return (
        <section>
            <h2 className="text-2xl font-semibold p-4">My Blogs</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                {loading ? (
                    <p>Loading...</p>
                ) : blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            currentUser={user}
                            setBlogs={setBlogs}
                        />
                    ))
                ) : (
                    <p>You haven't written any blogs yet.</p>
                )}
            </div>
        </section>
    );
};

export default MyBlogs;

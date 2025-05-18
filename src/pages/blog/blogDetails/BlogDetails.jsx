import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../../../lib/services/blogs/blogService';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await blogService.getBlogById(id);
                if (res.data.status) {
                    setBlog(res.data.blog);
                } else {
                    setError("Blog not found");
                }
            } catch (err) {
                setError("Failed to fetch blog");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <div>Loading blog...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!blog) return <div>No blog to display</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <div className="flex items-center mb-4">
                <div>
                    <p className="text-sm font-bold">By: {blog.author}</p>
                    <p className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleString()}</p>
                </div>
            </div>

            <h1 className="text-3xl font-extrabold mb-4">{blog.title}</h1>

            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-auto rounded mb-6"
                />
            )}

            <p className="text-gray-700 leading-relaxed">{blog.content}</p>
        </div>
    );
};

export default BlogDetails;

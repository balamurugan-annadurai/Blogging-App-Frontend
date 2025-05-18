import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import blogService from '../../lib/services/blogs/blogService';

const BlogCard = ({ blog, currentUser, setBlogs }) => {
    const navigate = useNavigate();

    const isOwner = currentUser?._id === blog?.userId;

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/myblogs/edit/${blog._id}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();

        try {
            const res = await blogService.deleteBlog(blog._id);
            if (res.data.status) {
                toast.success("Blog deleted successfully");
                setBlogs(prev => prev.filter(b => b._id !== blog._id));

            } else {
                toast.error(res.data.message || "Failed to delete blog");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div
            onClick={() => navigate(`/blogs/${blog._id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
        >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 truncate">{blog.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{blog.content}</p>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm font-medium">By: {blog.author}</p>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {blog.category}
                    </span>
                </div>

                {isOwner && (
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleEdit}
                            className="text-sm px-3 py-1 text-[#08436B] border-2 cursor-pointer border-[#08436B] rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-sm px-3 py-1 bg-[#08436B] text-white rounded cursor-pointer hover:bg-[#063652]"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogCard;

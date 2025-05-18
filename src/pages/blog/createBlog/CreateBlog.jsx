import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import toast, { Toaster } from "react-hot-toast";
import blogService from "../../../lib/services/blogs/blogService";
import { FilterSelect } from "../../../components/filterSelect";
import { categoryOptions } from "../../../utils/categoryOptions";

const CreateBlog = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        image: null,     // Base64 string
        imageUrl: "",    // For preview
    });

    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Convert file to base64 string on upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({
                    ...prev,
                    image: reader.result,      // Base64 string to send to backend
                    imageUrl: reader.result,   // For preview in UI
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreate = async () => {
        if (!form.title || !form.content || !form.category) {
            toast.error("Please fill in all required fields");
            return;
        }

        setCreating(true);
        setError("");

        try {
            const newBlogData = {
                title: form.title,
                content: form.content,
                category: form.category,
                image: form.image,  // Base64 string sent here
            };

            await blogService.createBlog(newBlogData);
            toast.success("Blog created successfully!");
            navigate("/blogs");
        } catch {
            setError("Failed to create blog. Please try again.");
            toast.error("Failed to create blog.");
        } finally {
            setCreating(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="max-w-xl gap-5 flex flex-col mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
                {form.imageUrl && (
                    <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-full h-50 object-cover rounded border border-gray-200"
                    />
                )}

                <Input
                    name="title"
                    placeholder="Blog Title"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />

                <textarea
                    name="content"
                    rows={5}
                    value={form.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    className="p-3 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-[#08436B] transition-all duration-200"
                    placeholder="Enter your content"
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    <FilterSelect
                        name="category"
                        label="Select Category"
                        value={form.category}
                        onChange={handleChange}
                        options={categoryOptions}
                    />

                    <label className="w-full sm:w-1/2 relative border border-gray-300 rounded px-4 py-2 cursor-pointer bg-gray-50 text-sm text-gray-700 hover:bg-gray-100">
                        <span>{form.image ? "Image Selected" : "Upload Image"}</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </label>
                </div>

                <Button onClick={handleCreate} disabled={creating} className="mt-4">
                    {creating ? "Creating..." : "Create Blog"}
                </Button>

                {error && (
                    <p className="text-center text-red-500 text-sm mt-2">{error}</p>
                )}
            </div>
        </>
    );
};

export default CreateBlog;

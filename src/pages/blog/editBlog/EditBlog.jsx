import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import blogService from "../../../lib/services/blogs/blogService";
import toast, { Toaster } from "react-hot-toast";
import { FilterSelect } from "../../../components/filterSelect";

const categoryOptions = [
    { value: "Career", label: "Career" },
    { value: "Finance", label: "Finance" },
    { value: "Travel", label: "Travel" },
    { value: "Health", label: "Health" },
    { value: "Education", label: "Education" },
    { value: "Agriculture", label: "Agriculture" },
];

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [originalBlog, setOriginalBlog] = useState(null);
    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        image: null,
        imageUrl: "",
    });
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            setError("Blog ID not provided");
            setLoading(false);
            return;
        }

        blogService
            .getBlogById(id)
            .then((res) => {
                if (res.status === 200 && res.data.blog) {
                    const blog = res.data.blog;
                    setOriginalBlog(blog);
                    setForm({
                        title: blog.title,
                        content: blog.content,
                        category: blog.category,
                        image: null,
                        imageUrl: blog.image || "",
                    });
                } else {
                    setError("Blog not found");
                }
            })
            .catch(() => setError("Failed to load blog"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (name, value) => {
        setForm((prev) => {
            const updated = { ...prev, [name]: value };
            setIsChanged(
                updated.title !== originalBlog?.title ||
                updated.content !== originalBlog?.content ||
                updated.category !== originalBlog?.category ||
                updated.image !== null
            );
            return updated;
        });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                image: file,
                imageUrl: URL.createObjectURL(file),
            }));
            setIsChanged(true);
        }
    };

    const handleSave = async () => {
        if (!isChanged) return;
        setSaving(true);
        setError("");

        try {
            const updatedData = {
                title: form.title,
                content: form.content,
                category: form.category,
                image: form.imageUrl,
            };

            await blogService.updateBlog(id, updatedData);
            toast.success("Blog updated successfully!");
            navigate("/blogs");
        } catch {
            setError("Failed to update blog. Please try again.");
            toast.error("Failed to update blog. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
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
                        <span>{form.image ? "Image Selected" : "Change Image"}</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </label>
                </div>

                <Button
                    onClick={handleSave}
                    className={`mt-4 ${!isChanged ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!isChanged || saving}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </>
    );
};

export default EditBlog;

import { useState } from "react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import toast, { Toaster } from "react-hot-toast";
import authService from "../../../lib/services/auth/auth";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = form;

        if (!name || !email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const res = await authService.signup({ name, email, password });

            if (res.data.status) {
                toast.success(res.data.message || "Signup successful!");
                setForm({ name: "", email: "", password: "" });
                navigate("/login");
            } else {
                toast.error(res.data.message || "Signup failed");
            }
        } catch (err) {
            const message =
                err.response?.data?.message || "Something went wrong. Try again.";

            toast.error(message);
        }
    };

    return (
        <section>
            <Toaster position="top-center" />
            <div className="min-h-[80vh] w-full flex justify-center items-center px-[10px]">
                <form
                    onSubmit={handleSubmit}
                    className="w-[380px] flex flex-col gap-4 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.3)] p-6 rounded-lg"
                >
                    <div>
                        <h2 className="font-bold text-[35px] text-[#08436B]">Let's start</h2>
                        <p className="font-semibold">Welcome to Blog App</p>
                    </div>
                    <Input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Button type="submit">Sign up</Button>
                </form>
            </div>
        </section>
    );
};

export default Signup;

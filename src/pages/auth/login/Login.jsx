import { useState } from "react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import toast, { Toaster } from "react-hot-toast";
import authService from "../../../lib/services/auth/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = form;

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const res = await authService.login({ email, password });

            if (res.data.status) {
                toast.success("Login successful!");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/blogs");
            } else {
                toast.error(res.data.message || "Login failed");
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
            <div className='min-h-[80vh] w-full flex justify-center items-center px-[10px]'>
                <form onSubmit={handleSubmit} className='w-[380px] flex flex-col gap-4 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.3)] p-6 rounded-lg'>
                    <div>
                        <h2 className='font-bold text-[35px] text-[#08436B]'>Login</h2>
                        <p className='font-semibold'>Please Login to continue</p>
                    </div>
                    <Input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        placeholder='Password'
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </section>
    );
};

export default Login;

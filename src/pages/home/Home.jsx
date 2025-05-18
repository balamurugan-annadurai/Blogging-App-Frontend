import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-xl w-full md:text-left">
                <h1 className="text-3xl md:text-5xl text-center font-bold text-[#08436B] mb-4">
                    Welcome to Blog App
                </h1>
                <p className="text-base text-center md:text-lg font-semibold mb-6">
                    Discover amazing content and start sharing your thoughts today!
                </p>

                <div className="w-full flex justify-center">
                    <Button className="w-1/2" onClick={() => navigate("/signup")}>
                        Join Now
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Home;

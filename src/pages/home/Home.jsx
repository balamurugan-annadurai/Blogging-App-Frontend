import { useNavigate } from "react-router-dom";
import img from "../../assets/homeImg.jpg";
import { Button } from "../../components/button";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <section>
                {/* On mobile: flex-col-reverse (image first), on md: flex-row (normal order) */}
                <div className="flex flex-col-reverse md:flex-row items-center md:justify-between min-h-[80vh] px-[30px] md:px-0 justify-end md:gap-0 gap-[40px]">
                    {/* Left side - Welcome message and CTA */}
                    <div className="max-w-xl w-full md:w-1/2 flex flex-col gap-2 md:gap-4 gap-[20px] mb-6 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#08436B]">
                            Welcome to Blog App
                        </h1>
                        <p className="text-base md:text-lg font-semibold">
                            Discover amazing content and start sharing your thoughts today!
                        </p>
                        <Button className="w-[100px]" onClick={() => navigate("/signup")}>Join Now</Button>

                    </div>

                    {/* Right side - Image */}
                    <div className="max-w-xl w-full md:w-1/2">
                        <img
                            src={img}
                            alt="Welcome Illustration"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;

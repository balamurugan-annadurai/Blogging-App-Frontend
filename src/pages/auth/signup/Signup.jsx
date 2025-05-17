import { Button } from '../../../components/button'
import { Input } from '../../../components/input'

const Signup = () => {
    return (
        <section>
            <div className='min-h-[80vh] w-full flex justify-center items-center'>
                <div className='w-[380px] flex flex-col gap-4 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.3)] p-6 rounded-lg'>
                    <div>
                        <h2 className='font-bold text-[35px] text-[#08436B] '>Let's start</h2>
                        <p className='font-semibold'>Welcome to Blog App</p>
                    </div>
                    <Input type="text" placeholder='Name' />
                    <Input type="text" placeholder="Email" />
                    <Input type="password" placeholder='Password' />
                    <Button>Sign up</Button>
                </div>
            </div>
        </section>
    )
}

export default Signup
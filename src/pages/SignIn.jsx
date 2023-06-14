import { useState } from "react";

function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;
    function updateEmail(event) {
        const temp = event.target.value;
        // let mail = formData.email;
        // setFormData((mail = temp));
        // console.log(formData.email);
        let mail = { ...formData };
        mail.email = temp;
        setFormData(mail);
        console.log(formData.email);
    }
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-[30px]">Sign In </h1>
            <div className="flex flex-wrap items-center justify-center max-w-6xl m-auto py-14 ">
                <div className="md:w-[67%] lg:w-[47%] mb-[80px] sm:mb-[80px]">
                    <img src="https://img.freepik.com/premium-vector/computer-account-login-password_165488-5473.jpg" className="w-full rounded-2xl" alt="Image of Sign in" />
                </div>
                <div className="md:w-[67%] lg:w-[40%]  w-full lg:ml-[75px]">
                    <form name="">
                        <input type="email" placeholder="Email address" className="w-full pl-4 mb-4" value={email} onChange={updateEmail} /> <br />
                        <input type="password" placeholder="Password" className="w-full pl-4 " />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;

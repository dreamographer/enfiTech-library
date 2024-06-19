import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Input } from "./ui/Input";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type Props = {
  setLogin: ()=>void;
};

const Signup = ({setLogin}:Props) => {

  const navigate=useNavigate()
  //state for storing the formData
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //state for storing the errors
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const showError=useRef(false) // ref for checking when to start cheking validation 

  //Username Validation
  const validateUsername = (username: string): string => {
    if (username.length < 5) {
      return "Username must be at least 5 characters long";
    }
    return "";
  };

  // Email Validation
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  // Password Validation
  const validatePassword = (password: string): string => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //regex for Password validation
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special character, one number";
    }
    return "";
  };

  // validation for confirmPassword
  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): string => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  // Adding data to the state
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  // Form validation check
  const validateForm = (): boolean => {
    const newErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === ""); //return true if there no validation errors
  };

  // form handler
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    showError.current=true
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/register`,
          formData
        );
        console.log("Registration successful", response.status);
        toast.success("Registration successful");
        if(response.status==201){
          setLogin()
          navigate('/')
        }
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        showError.current=false
      } catch (error:any) {
        console.error("Registration failed", error.response?.data);
        toast.error(error.response?.data.message)
      }
    }
  };

    useEffect(() => {
      if(showError.current){
        validateForm()

      }
    }, [formData]);

  return (
    <section className="md:pt-10 p-10 justify-center overflow-y-auto  text-white sm:fixed  bg-indigo-900 h-screen items-center w-full">
      <div className=" text-center items-center w-full">
        <div className="">
          <h1 className="text-2xl">EnfiTech</h1>
        <h2 className="md:text-5xl  mb-5 text-3xl font-bold ">
          Library-Registration
        </h2>

        </div>
        <div className="md:flex  ">
          <div className="md:w-full md:items-end md:flex justify-center flex-col items-center">
            <div className="flex flex-col justify-center items-center">
              {Object.values(errors).every(error => error == "") ? (
                <img
                  src="/checklist-clipboard-pencil-icon-sign-symbol-reminder-checkbox-document-report-concept-pink-background-3d-rendering.png"
                  alt="With no Error"
                  width={500}
                  className="transition-all delay-100"
                />
              ) : (
                <>
                  <img
                    src="denied-checklist-3d-clipboard-with-cross-marks.png"
                    alt="With error"
                    width={400}
                    className="animate-pulse transition-all "
                  />
                  <h3 className="text-lg text-center font-medium">
                    Please fix the following errors:
                  </h3>
                </>
              )}
            </div>
            <div className="flex flex-col justify-center items-center">
            {Object.values(errors).map((ele,i) => (
              <div key={i} >
                {ele != "" && (
                  <li  className="w-80 text-left text-red-400">{ele}</li>
                )}
              </div>
            ))}

            </div>
          </div>
          <div className="p-14  flex flex-col w-full  lg:items-start items-center justify-center md:w-full ">
            <form onSubmit={onSubmit} className="space-y-3  md:justify-center ">
              <div className="text-left px-4 ">
                <label htmlFor="username">Username</label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter Your Username"
                  aria-invalid={!!errors.username}
                  aria-describedby="username-error"
                  className={
                    errors.username
                      ? `focus-visible:ring-red-500  outline outline-red-500`
                      : ""
                  }
                  type="text"
                />
              </div>

              <div className="text-left px-4 ">
                <label htmlFor="email">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter Your Email"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  className={
                    errors.email
                      ? `focus-visible:ring-red-500 outline outline-red-500`
                      : ""
                  }
                />
              </div>

              <div className="text-left px-4 ">
                <label htmlFor="password">Password</label>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  className={
                    errors.password
                      ? `focus-visible:ring-red-500 outline outline-red-500`
                      : ""
                  }
                />
              </div>

              <div className="text-left px-4 ">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Confirm Password"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby="confirmPassword-error"
                  className={
                    errors.confirmPassword
                      ? `focus-visible:ring-red-500 outline outline-red-500`
                      : ""
                  }
                />
              </div>

              <button
                type="submit"
                className="md:w-96 w-72 md:h-14 h-10 bg-indigo-500 backdrop-blur-sm text-white hover:bg-indigo-300 rounded-xl"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

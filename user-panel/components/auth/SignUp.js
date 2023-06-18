import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/actions/userAction";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    recaptch: "",
    agree: true,
  });

  const dispatch = useDispatch();
  const navigate = useRouter();

  const btnReducer = useSelector((store) => store.btnReducer);

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeCaptcha = (value) => {
    setState({
      ...state,
      recaptch: value,
    });
  };

  const onChangeAgree = () => {
    setState({
      ...state,
      agree: !state.agree,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, recaptch, agree } = state;
    dispatch(
      userRegister(
        {
          name,
          email,
          password,
          recaptch,
          agree,
        },
        navigate
      )
    );
  };

  return (
    <div className="my-32 max-w-sm m-auto bg-white shadow rounded">
      <div className="flex justify-center mb-5">
        <Link href="/signup">
          <button className="py-2 mt-5 text-2xl font-bold">SignUp</button>
        </Link>
        <p className="py-2 mt-5 text-2xl mx-2">|</p>
        <Link href="/login">
          <button className="py-2 mt-5 text-2xl font-bold">Login</button>
        </Link>
      </div>
      <form onSubmit={onSubmit}>
        <div className="shadow-md rounded-md text-left p-10">
          <label className="block">
            <span className="text-gray-700">NAME</span>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="p-2 my-1 placeholder-gray-400 text-gray-600 w-full bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"
              name="name"
              onChange={onChange}
              value={state.name}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">EMAIL</span>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-2 my-1 placeholder-gray-400 text-gray-600 w-full bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"
              name="email"
              onChange={onChange}
              value={state.email}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">PASSWORD</span>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="p-2 my-1 placeholder-gray-400 text-gray-600 w-full bg-white rounded text-sm border border-gray-400 outline-none focus:outline-none focus:ring"
              name="password"
              onChange={onChange}
              value={state.password}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">RECAPTCHA</span>
            <div className="my-1">
              <ReCAPTCHA
                value={state.recaptch}
                sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
                onChange={onChangeCaptcha}
              />
            </div>
          </label>
          <div className="flex mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={state.agree}
                className="form-checkbox cursor-pointer"
                onChange={onChangeAgree}
              />
              <span className="ml-2">
                I agree to the
                <span className="underline cursor-pointer">
                  {" "}
                  privacy policy
                </span>
              </span>
            </label>
          </div>
          {state.agree ? (
            btnReducer ? (
              <button className="bg-indigo-900 text-white py-2 mt-5 w-full hover:bg-indigo-800">
                REGISTER
              </button>
            ) : (
              <button
                className="bg-gray-600 cursor-not-allowed opacity-50 text-white py-2 mt-5 w-full"
                type="button"
              >
                REGISTER
              </button>
            )
          ) : (
            <button
              className="bg-gray-600 cursor-not-allowed opacity-50 text-white py-2 mt-5 w-full"
              type="button"
            >
              REGISTER
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;

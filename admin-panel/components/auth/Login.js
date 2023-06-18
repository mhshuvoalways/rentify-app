import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../store/actions/userAction";

const Login = () => {
  const [state, setState] = useState({
    email:
      (typeof window !== "undefined" && localStorage.getItem("email")) || "",
    password:
      (typeof window !== "undefined" && localStorage.getItem("password")) || "",
    checked: false,
  });

  const btnReducer = useSelector((store) => store.btnReducer);

  const dispatch = useDispatch();
  const navigate = useRouter();

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeRemember = (event) => {
    if (event.target.checked) {
      typeof window !== "undefined" &&
        localStorage.setItem("email", state.email);
      typeof window !== "undefined" &&
        localStorage.setItem("password", state.password);
      setState({ ...state, checked: event.target.checked });
    } else {
      typeof window !== "undefined" && localStorage.removeItem("email");
      typeof window !== "undefined" && localStorage.removeItem("password");
      setState({ ...state, checked: event.target.checked });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = state;
    dispatch(adminLogin({ email, password }, navigate));
    if (!state.checked) {
      typeof window !== "undefined" && localStorage.removeItem("email");
      typeof window !== "undefined" && localStorage.removeItem("password");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="max-w-sm m-auto bg-white shadow rounded">
        <form className="shadow-md rounded-md text-left p-10">
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
          <div className="flex mt-6 justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox cursor-pointer"
                onChange={onChangeRemember}
                checked={state.checked}
              />
              <span className="ml-2 cursor-pointer">Remember me</span>
            </label>
          </div>
          {btnReducer ? (
            <button
              className="bg-indigo-900 text-white py-2 mt-5 w-full hover:bg-indigo-800"
              onClick={onSubmit}
            >
              LOGIN
            </button>
          ) : (
            <button
              className="bg-gray-600 cursor-not-allowed opacity-50 text-white py-2 mt-5 w-full"
              type="button"
            >
              LOGIN
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

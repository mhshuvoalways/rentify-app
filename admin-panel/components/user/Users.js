import { useSelector, useDispatch } from "react-redux";
import { getAllUser, deleteUser } from "@/store/actions/userAction";
import { useEffect } from "react";
import moment from "moment";

const Users = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="text-left px-3 py-6">Name</th>
            <th className="text-left px-3 py-6">Email</th>
            <th className="text-left px-3 py-6">Date</th>
            <th className="text-left px-3 py-6">Action</th>
          </tr>
        </thead>
        <tbody>
          {userReducer.allUser?.map((user) => (
            <tr className="border" key={user._id}>
              <td className="text-left px-3 py-6">{user.name}</td>
              <td className="text-left px-3 py-6">{user.email}</td>
              <td className="text-left px-3 py-6">
                {moment(user.createdAt).format("LL")}
              </td>
              <td className="text-left px-3 py-6">
                <i
                  className="fa-regular fa-trash-can  cursor-pointer p-2"
                  onClick={() => dispatch(deleteUser(user._id))}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

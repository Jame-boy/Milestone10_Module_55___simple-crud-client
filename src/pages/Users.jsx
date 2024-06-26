import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDeleteUser = (id) => {
        console.log("delete", id);

        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert("Successfully deleted one document.");
                    //! to remove the user immediately
                    const remaining = users.filter((user) => user._id !== id);
                    setUsers(remaining);
                }
            });
    };

    return (
        <div>
            <h2 className="text-5xl">Total users: {users.length}</h2>
            <div>
                {users.map((user) => (
                    <p key={user._id} className="mt-5">
                        {user.name} : {user.email} ---- {user._id}{" "}
                        {/* //! update button */}
                        <Link to={`/update/${user._id}`}>
                            <button className="btn btn-outline btn-accent btn-sm mx-4">Update</button>
                        </Link>
                        {/* //! delete button */}
                        <button onClick={() => handleDeleteUser(user._id)} className="btn btn-sm btn-outline btn-secondary">
                            X
                        </button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Users;

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosPublic = useAxiosPublic();

    // Fetch users from the backend
    useEffect(() => {
        axiosPublic.get('/api/users')
            .then(response => {
                setUsers(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [axiosPublic]);
    console.log(users);

    // Function to make a user an admin
    const handleMakeAdmin = (id) => {
        axiosPublic.patch(`/api/users/make-admin/${id}`, { role: 'admin' })
            .then(response => {
                if (response.data.success) {
                    // Fix: Corrected userId to id
                    setUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.id === id ? { ...user, role: "admin" } : user
                        )
                    );

                    Swal.fire({
                        title: 'Success!',
                        text: 'User has been made an admin.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            })
            .catch(error => {
                console.error('Error making user admin:', error);

                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update user role.',
                    icon: 'error',
                });
            });
    };


    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-center">Role</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100 transition-all">
                                <td className="py-3 px-6">{user.name}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm ${user.role === 'admin' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {user.role !== 'admin' ? (
                                        <button
                                            onClick={() => handleMakeAdmin(user.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded-lg transition-all"
                                        >
                                            Make Admin
                                        </button>
                                    ) : (
                                        <span className="text-green-500 font-semibold">Admin</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;

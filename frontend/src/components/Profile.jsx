import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center mt-20">You are not logged in.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-red-600 dark:text-gray-200">
        Profile
      </h1>

      <div className="flex items-center gap-6 mb-6">
        <img
          src={
            user.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || "U"
            )}`
          }
          alt="avatar"
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {user.name}
          </p>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          <p className="text-gray-600 dark:text-gray-400">Role: {user.role}</p>
        </div>
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;

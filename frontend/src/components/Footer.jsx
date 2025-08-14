import { FaApple, FaGooglePlay, FaStore } from "react-icons/fa";


export const Footer = () => (
  <footer className="bg-white-100 text-gray-800 pt-16 pb-16"> {/* ✅ Height increase */}
    {/* Subscribe Section */}
    <div className="bg-gray-50 w-full h-70 mx-auto p-6 rounded-lg shadow-sm text-center mb-10">
      <h3 className="text-xl font-semibold mb-2">Subscribe on our newsletter</h3>
      <p className="text-sm mb-4">
        Get daily news on upcoming offers from many suppliers all over the world
      </p>
      <div className="flex justify-center">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded-l-md w-64"
        />
        <button className="bg-blue-500 text-white px-4 rounded-r-md">
          SUBSCRIBE
        </button>
      </div>
    </div>

    {/* Footer Links Section */}
    <div className="max-w-6xl mx-auto px-6 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-sm text-center md:text-left">
        
        {/* Brand with Store Icon */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2 text-blue-600 text-lg font-bold">
            <FaStore className="text-3xl" /> {/* ✅ Bigger & new icon */}
            <span>Brand</span>
          </div>
          <p className="text-xs mt-2 text-gray-700">
            Best information about the company goes here but now lorem ipsum is
          </p>
        </div>

        {/* About */}
<div>
  <h4 className="font-bold mb-3">About</h4> {/* ✅ Spacing increased */}
  <ul className="space-y-2">
    <li className="hover:text-blue-600 cursor-pointer">About Us</li>
    <li className="hover:text-blue-600 cursor-pointer">Find store</li>
    <li className="hover:text-blue-600 cursor-pointer">Categories</li>
    <li className="hover:text-blue-600 cursor-pointer">Blogs</li>
  </ul>
</div>

{/* Partnership */}
<div>
  <h4 className="font-bold mb-3">Partnership</h4>
  <ul className="space-y-2">
    <li className="hover:text-blue-600 cursor-pointer">About Us</li>
    <li className="hover:text-blue-600 cursor-pointer">Find store</li>
    <li className="hover:text-blue-600 cursor-pointer">Categories</li>
    <li className="hover:text-blue-600 cursor-pointer">Blogs</li>
  </ul>
</div>

{/* Information */}
<div>
  <h4 className="font-bold mb-3">Information</h4>
  <ul className="space-y-2">
    <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
    <li className="hover:text-blue-600 cursor-pointer">Money Refund</li>
    <li className="hover:text-blue-600 cursor-pointer">Shipping</li>
    <li className="hover:text-blue-600 cursor-pointer">Contact us</li>
  </ul>
</div>

{/* For users */}
<div>
  <h4 className="font-bold mb-3">For users</h4>
  <ul className="space-y-2 ">
    <li className="hover:text-blue-600 cursor-pointer">Login</li>
    <li className="hover:text-blue-600 cursor-pointer">Register</li>
    <li className="hover:text-blue-600 cursor-pointer">Settings</li>
    <li className="hover:text-blue-600 cursor-pointer">My Orders</li>
  </ul>
</div>

        {/* Get App */}
<div>
  <h4 className="font-bold mb-4 ">Get app</h4>
  <button className="flex items-center justify-center bg-black text-white py-1 mb-3 px-3 rounded my-1 text-xs w-full">
    <FaApple className="mr-2 text-lg" />
    DOWNLOAD ON APP STORE
  </button>
  <button className="flex items-center justify-center bg-black text-white py-1 px-3 rounded text-xs w-full">
    <FaGooglePlay className="mr-2 text-lg" />
    GET ON GOOGLE PLAY
  </button>
</div>

      </div>
    </div>
  </footer>
);

export default Footer;

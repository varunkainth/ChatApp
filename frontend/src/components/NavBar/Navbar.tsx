
const NavBar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen bg-gray-800 w-15 flex flex-col justify-between items-center py-4 px-2">
      {/* Logo or Branding */}
      <div className="mb-4">
        <img
          src="https://avatar.iran.liara.run/public/boy?username=pain"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
      </div>
      
      {/* Navigation Icons */}
      <div className="flex flex-col items-center space-y-6">
        <button className="text-white text-xl">
          <i className="fas fa-home"></i>
        </button>
        <button className="text-white text-xl">
          <i className="fas fa-comments"></i>
        </button>
        <button className="text-white text-xl">
          <i className="fas fa-users"></i>
        </button>
        <button className="text-white text-xl">
          <i className="fas fa-newspaper"></i>
        </button>
        <button className="text-white text-xl">
          <i className="fas fa-user"></i>
        </button>
        <button className="text-white text-xl">
          <i className="fas fa-cog"></i>
        </button>
      </div>

      {/* Logout Button */}
      <button className="text-white text-xl mt-auto">
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  );
};

export default NavBar;

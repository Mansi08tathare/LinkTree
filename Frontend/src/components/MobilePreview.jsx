import React from "react";

const MobilePreview = ({ links, profile }) => {
  return (
    <div className="w-64 h-[500px] bg-gray-100 rounded-2xl shadow-lg p-4 flex flex-col items-center">
      {/* Profile Section */}
      <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
        {profile.image ? (
          <img
            src={profile.image}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-600">No Image</span>
        )}
      </div>
      <h3 className="text-lg font-semibold">{profile.name || "Your Name"}</h3>
      <p className="text-sm text-gray-500">{profile.bio || "Your bio goes here"}</p>
      
      {/* Links Section */}
      <div className="mt-4 w-full flex flex-col items-center gap-2">
        {links && links.length > 0 ? (
          links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {link.label}
            </a>
          ))
        ) : (
          <p className="text-gray-400">No links added</p>
        )}
      </div>
    </div>
  );
};

export default MobilePreview;
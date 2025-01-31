import React from "react";
import WebsiteImage from "../public/images/websiteImage.jpg";
import Image from "next/image";

function ProfileImage() {
  return (
    <div>
      <Image className="object-cover" src={WebsiteImage} alt="profile-image" />
    </div>
  );
}

export default ProfileImage;

import React from "react";
import ClassProvider from "../../contexts/ClassProvider";
import UserProvider from "../../contexts/UserProvider";
import MenuAppBar from "../utils/MenuAppBar";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  return (
    <React.Fragment>
      <ClassProvider>
        <UserProvider>
          <MenuAppBar name="Profile" />
          <ProfileForm />
        </UserProvider>
      </ClassProvider>
    </React.Fragment>
  );
};

export default Profile;

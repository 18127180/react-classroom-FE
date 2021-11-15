import React, { createContext, useState } from "react";
const context = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return <context.Provider value={[user, setUser]}>{children}</context.Provider>;
};

UserProvider.context = context;

export default UserProvider;

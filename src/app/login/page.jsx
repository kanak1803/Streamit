import React from "react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "../component/LoginForm";

const Login = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <div className="h-screen">
      <LoginForm />
    </div>
  );
};

export default Login;

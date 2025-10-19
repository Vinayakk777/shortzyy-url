import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Auth() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-white text-center">
        {longLink ? "Hold up! Let's login first.." : "Login / Signup"}
      </h1>
      <Tabs
        defaultValue="login"
        className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-700 p-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;

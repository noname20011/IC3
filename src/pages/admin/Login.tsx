import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useLogin } from "@workspace/api-client-react";
import { Button } from "../../components/core/buttons/MainButton";
import { Input } from "../../components/core/Input";
import { Label } from "../../components/core/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/core/Card";
import { useToast } from "../../hooks/use-toast";
import { BookOpen, KeyRound, Loader2 } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function useLogin () {

  }

  const loginMutation = true;


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    // loginMutation.mutate(
    //   { data: { username, password } },
    //   {
    //     onSuccess: (data) => {
    //       if (data.success) {
    //         toast({ title: "Welcome back", description: `Logged in as ${data.user.username}` });
    //         navigate("/admin/create-password");
    //       } else {
    //         toast({ variant: "destructive", title: "Login failed", description: "Invalid credentials" });
    //       }
    //     },
    //     onError: (err) => {
    //       toast({ variant: "destructive", title: "Login failed", description: err.error?.error || "Unknown error" });
    //     }
    //   }
    // );
  };

  return (
    <div className="min-h-50 bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="mb-8 text-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center p-3 bg-card border border-border/50 rounded-2xl mb-4 shadow-xl">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Code Analysis Platform</h1>
        <p className="text-muted-foreground mt-2">Admin Portal</p>
      </div>

      <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border-border/50 shadow-2xl shadow-black/50 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl text-center font-bold tracking-tight">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your admin credentials to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/50 border-border focus-visible:ring-primary h-11"
                // disabled={loginMutation.isPending}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-border focus-visible:ring-primary h-11 pr-10"
                //   disabled={loginMutation.isPending}
                  required
                />
                <KeyRound className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 pb-6">
            <Button 
              type="submit" 
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 text-md font-medium transition-all"
            //   disabled={loginMutation.isPending || !username || !password}
            >
              {!loginMutation ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...</>
              ) : (
                "Sign In"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-8 text-sm text-muted-foreground z-10">
        &copy; {new Date().getFullYear()} Code Analysis Platform
      </div>
    </div>
  );
}

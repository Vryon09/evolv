import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAddUser } from "@/services/apiAuth";
import { Eye, EyeOff } from "lucide-react";

const initialState = { name: "", email: "", password: "" };

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [form, setForm] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { mutate: handleAddUser } = useAddUser();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddUser(form);
    setForm(initialState);
  }

  useEffect(() => {
    const token = localStorage.getItem("evolv_token");
    if (token) {
      try {
        const user = jwtDecode(token);

        if (
          user &&
          typeof user.exp === "number" &&
          user.exp * 1000 > Date.now()
        ) {
          navigate("/app/dashboard");
        } else {
          localStorage.removeItem("evolv_token");
        }
      } catch (error) {
        throw error;
        localStorage.removeItem("evolv_token");
      }
    }
  }, [navigate]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up via your email and password to continue</CardTitle>
          <CardDescription>
            Enter your email and password to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((credentials) => {
                      return { ...credentials, name: e.target.value };
                    })
                  }
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) =>
                    setForm((credentials) => {
                      return { ...credentials, email: e.target.value };
                    })
                  }
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    value={form.password}
                    onChange={(e) =>
                      setForm((credentials) => {
                        return { ...credentials, password: e.target.value };
                      })
                    }
                    id="password"
                    type={isShowPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  Create Account
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

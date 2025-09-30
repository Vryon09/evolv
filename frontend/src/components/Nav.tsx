import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";

function Nav() {
  const location = useLocation();

  return (
    <div className="py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-4xl font-semibold">
          eVolV
        </Link>
        <div>
          {location.pathname === "/" && (
            <Button
              variant="secondary"
              asChild
              className="cursor-pointer font-semibold"
            >
              <Link to="/login">Log in</Link>
            </Button>
          )}
          {location.pathname === "/" && (
            <Button asChild className="cursor-pointer font-semibold">
              <Link to="/signup">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;

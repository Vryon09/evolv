import { Link } from "react-router";
import { Button } from "./ui/button";

function Nav() {
  return (
    <div className="py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-4xl font-semibold">
          eVolV
        </Link>
        <div>
          <Button className="cursor-pointer font-semibold">
            <Link to="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Nav;

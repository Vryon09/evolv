import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Hero() {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="mb-2 text-4xl font-bold sm:text-6xl">Your Personal OS</h1>
      <p className="mx-6 mb-6 max-w-lg text-center text-neutral-600 sm:text-xl">
        eVolV is all-in-one app for your self-improvement. Focus, Task, Mood
        tracking, journaling, notes, and more.
      </p>
      <Button
        asChild
        className="cursor-pointer px-8 py-6 text-xl font-semibold"
      >
        {/* <Link to="/signup">Get Started</Link> */}
        <Link to="/app/dashboard">Get Started</Link>
      </Button>
    </div>
  );
}

export default Hero;

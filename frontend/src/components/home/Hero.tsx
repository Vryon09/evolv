import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Hero() {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="mb-2 text-6xl font-bold">Your Personal OS</h1>
      <p className="mb-6 max-w-lg text-center text-xl text-neutral-600">
        eVolV is all-in-one app for your self-improvement. Focus, Task, Mood
        tracking, journaling, notes, and more.
      </p>
      <Button
        asChild
        className="cursor-pointer px-8 py-6 text-xl font-semibold"
      >
        {/* <Link to="/signup">Get Started</Link> */}
        <Link to="/app">Get Started</Link>
      </Button>
    </div>
  );
}

export default Hero;

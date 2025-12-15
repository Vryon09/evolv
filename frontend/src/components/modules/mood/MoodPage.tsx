import JournalCreate from "./JournalCreate";
import MoodForm from "./MoodForm";
import SleepForm from "./SleepForm";
import StressForm from "./StressForm";

function MoodPage() {
  return (
    <div className="bg-background overflow-scroll overflow-x-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <JournalCreate />
        <MoodForm />
        <SleepForm />
        <StressForm />
      </div>
    </div>
  );
}

export default MoodPage;

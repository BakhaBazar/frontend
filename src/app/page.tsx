export default function LandingPage() {
  return (
    <div className="h-screen w-full bg-primary-background text-secondary-text flex flex-col justify-center items-center">

      <h1 className="text-4xl font-bold mb-3 font-bebas-neue">Bakhabazar</h1>
      <p className="text-primary-text mb-6 text-center">
        AI powered podcast experience
      </p>

      <a
        href="/home"
        className="bg-secondary-button-background cursor-pointer text-secondary-button-foreground px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition">

        Go to Home
      </a>


    </div>
  );
}

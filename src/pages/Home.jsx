import CardWrapper from "@/components/CardWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function Home() {

    return (
    <main className="flex flex-col w-full max-w-[701px] ">

        <CardWrapper className='gap-6'>
            {/* Hero Section */}
            <section className=''>
                <h1 className='text-2xl mb-3 text-white'>
                    <span className="text-primary">Security focused</span> websites that you <span className="text-primary">own forever</span>
                </h1>
                <p className="text-lg mt-2 text-white">
                    Due to the nature of our <span className="text-primary">custom websites</span>, we have the freedom of implementing your imagination
                </p>
            </section>
            <section className="" aria-labelledby="team-heading">
                <h2 id="team-heading" className='text-2xl mb-4 text-white'><span className="text-primary">My Team:</span></h2>
                <ul className="space-y-2 text-white list-none">
                    <li><span className="text-primary">(Me) Daniel Phillips</span> - Lead Developer & Owner</li>
                    <li><span className="text-primary">Dani Timtschenko</span> - Security Advisor & Hosting</li>
                    <li><span className="text-primary">Sam Halpin</span> - Graphic Design & Photographer</li>
                    <li><span className="text-primary">Justin Fu</span> - Marketing Advisor</li>
                </ul>
            </section>
        </CardWrapper>
        
        <nav className="" aria-label="Call to action">
            <Link to={'/personal'} className="w-full flex items-center justify-center">
                <Button className="bg-amber-50 w-full text-black">
                    Get a Quote
                </Button>
            </Link>
        </nav>
    </main>
  );
}


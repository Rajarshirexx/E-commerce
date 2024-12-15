
import BestSeller from "../Components/BestSeller";
import Hero from "../Components/Hero";
import LatestCollection from "../Components/LatestCollections";
import NewsletterBox from "../Components/NewsletterBox";
import OurPolicy from "../Components/OurPolicy";

export default function Home() {
    return(
        <div>
            <Hero />
            <LatestCollection />
            <BestSeller/>
            <OurPolicy/>
            <NewsletterBox/>
        </div>
    )
}
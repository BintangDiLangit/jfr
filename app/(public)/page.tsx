import {
  getHero, getSettings, getServices, getPortfolios, getBeforeAfter,
  getGallery, getSocialPosts, getFaqs, getTestimonials,
} from "@/lib/data";
import { localBusinessJsonLd } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { Trusted } from "@/components/sections/trusted";
import { Layanan } from "@/components/sections/layanan";
import { WhyJfr } from "@/components/sections/why-jfr";
import { FeaturedPortfolio } from "@/components/sections/featured-portfolio";
import { VehicleFinder } from "@/components/sections/vehicle-finder";
import { BeforeAfterSection } from "@/components/sections/before-after";
import { GallerySection } from "@/components/sections/gallery";
import { TikTokFeed, InstagramFeed } from "@/components/sections/social-feed";
import { Testimoni } from "@/components/sections/testimoni";
import { Booking } from "@/components/sections/booking";
import { FaqSection } from "@/components/sections/faq";
import { Maps } from "@/components/sections/maps";

export default async function HomePage() {
  const [settings, hero, services, featured, allPortfolio, beforeAfter, gallery, ig, tt, faqs, testimonials] =
    await Promise.all([
      getSettings(),
      getHero(),
      getServices(),
      getPortfolios({ featured: true, limit: 9 }),
      getPortfolios({ limit: 100 }),
      getBeforeAfter(),
      getGallery(),
      getSocialPosts("instagram"),
      getSocialPosts("tiktok"),
      getFaqs(),
      getTestimonials(),
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(settings)) }}
      />
      <Hero data={hero} whatsappNumber={settings.whatsappNumber} />
      <Trusted stats={settings.stats} />
      <Layanan services={services} />
      <WhyJfr data={settings.whyJfr} />
      <FeaturedPortfolio items={featured} />
      <VehicleFinder items={allPortfolio} />
      <BeforeAfterSection items={beforeAfter} />
      <GallerySection items={gallery} />
      <TikTokFeed posts={tt} />
      <InstagramFeed posts={ig} />
      <Testimoni items={testimonials} />
      <Booking whatsappNumber={settings.whatsappNumber} />
      <FaqSection faqs={faqs} />
      <Maps settings={settings} />
    </>
  );
}

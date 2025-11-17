import AboutPage from "../../components/About/About"

export const metadata = {
  title: "About Movwise – Smart Conveyancing Comparison Platform",
  description:
    "Learn about Movwise, the UK’s smart conveyancing comparison platform. Discover how our technology simplifies property transactions with multilingual support and trusted conveyancing services.",

  keywords: [
    "about Movwise",
    "conveyancing comparison platform",
    "UK conveyancing service",
    "conveyancing technology",
    "multilingual support"
  ],

  other: {
    search_intent: "Informational / Brand",
  },

};

export default function About() {
  return (
   <AboutPage/>
  );
}

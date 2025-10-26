import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Aman",
    username: "Aman, RCA Selected 2024",
    body: "Selected! Thank you so much to @Tanweer Ahmad Sir for all your help. Also thanks to all my friends who shared their transcripts ",
    img: "https://avatar.vercel.sh/jack",
    rating: 5,
  },
  {
    name: "Akansha Biswas",
    username: "Akansha Biswas, RCA Selected 2024 ",
    body: "Selected! Thank you to all for sharing your interview transcripts and @Wetoo Media for sharing previous transcripts because I did get questions from those! Very grateful!",
    img: "https://avatar.vercel.sh/jill",
    rating: 4,
  },
  {
    name: "Rozy Parveen",
    username: "Rozy Parveen, RCA Selected 2024",
    body: "Selected! 🤩... Thanks @Tanweer Ahmad sir.",
    img: "https://avatar.vercel.sh/john",
    rating: 5,
  },
  {
    name: "Naved",
    username: "Naved, RCA Selected 2024 ",
    body: "Selected!! Thank you sir, for interview guidance.",
    img: "https://avatar.vercel.sh/jane",
    rating: 4,
  },
  {
    name: "ANA Musharraf",
    username: "ANA Musharraf, RCA selected 2024 ",
    body: "WeToo’s RCA interview guidance program was really helpful in giving the direction in which the interview prep should be done, specially the transcript were really useful. Thank you Tanweer sir for the initiative.",
    img: "https://avatar.vercel.sh/james",
    rating: 4,
  },
  {
    name: "Ruksar",
    username: "Ruksar, RCA Selected 2024",
    body: "Selected! Thank You Sir, your guidance and fellow candidate’s transcripts ere of great help. Thank you🌸",
    img: "https://avatar.vercel.sh/james",
    rating: 4,
  },
  {
    name: "Kritika",
    username: "Kritika, RCA Selected 2024",
    body: "Thank you so much @Tanweer Ahmad @Wetoo Media. It's all because of your help.",
    img: "https://avatar.vercel.sh/jenny",
    rating: 4,
  },
  {
    name: "Saquib",
    username: "Saquib, RCA Selected 2024 ",
    body: "Thank You very much, Tanweer sir and Wetoo Media, for the 'RCA Interview Guidance Program'. It helped me a lot and gave me a roadmap for the practice, which aided me get on the list.",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  {
    name: "Dawood",
    username: "Dawood, RCA Selected 2024",
    body: "Alhamdulillah selected! Thanks for sharing insightful informations @Tanweer Ahmad sir",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  {
    name: "Dr. A. R. Rajah",
    username: "Dr. A. R. Rajah, RCA",
    body: "First time while checking I used find and couldn’t see my number, now it is there 😂 Thanks to @Tanweer Ahmad for the guidance and also ppl who put up transcripts😇 Got through both HSC and Jamia😇",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  //   {
  //     name: "Annu",
  //     username: "Annu, RCA Selected 2024",
  //     body: `I was a part of WeToo Media JMI-RCA interview group. I express my heartfelt gratitude towards Tanweer Sir and his whole team. They played a great role in my selection.

  // The discussions on Google Meet were beneficial for understanding interview procedure.

  // A WhatsApp group was made for us to go through previous and this year’s interview transcripts.

  // Having somebody to guide and help us in this journey added confidence.

  // Useful and insightful videos about JMI RCA helped me to get motivated for the entrance exam.

  // Sending best wishes from my side for building a community of caring and helpful mentors.`,
  //     img: "https://avatar.vercel.sh/jenny",
  //     rating: 5,
  //   },
  {
    name: "MD Tauseef",
    username: "MD Tauseef",
    body: "My name is MD Tausif. I am preparing for UPSC CSE. Previously I used to be confused regarding admission RCAs. But now, I would like to thanks TANWEER SIR and his platform WE TOO MEDIA IAS for continuously guiding me. The interview guidance program of Sir helped me to secure a seat in JAMIA RCA (2024-25). ",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  {
    name: "Unknown",
    username: "Unknown",
    body: "Thanks a ton @Tanweer Ahmad Sir for this platform and guidance at every stage. Immense gratitude towards @Ghulam Jilani @Dr A R Rajah RCA Written Qualified 2023 Imran sir for interview related guidance.",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  {
    name: "Unknown",
    username: "Unknown",
    body: "Thank you so much sir for your all efforts 😊😊 A big thank you for Tanweer sir 😊.",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
  {
    name: "Unknown",
    username: "Unknown",
    body: "Thank you @Tanweer Ahmad, @Dr A R Rajah Rca Written Qualified 2023 bhai and everyone who have been through this journey.. Got through! Congratulations to everyone who have been selected and to those who couldn't don't give up. Life doesn't stop here. Keep hustling. ",
    img: "https://avatar.vercel.sh/jenny",
    rating: 5,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body, rating }) => {
  return (
    <figure
      className={cn(
        "relative h-min w-96 bg-[#2a4f6f0d] cursor-pointer overflow-hidden rounded-xl border p-5",
        // light styles
        "border-secondary/30 bg-[#2a4f6f0d] hover:bg-[#2a4f6f0d]",
        // dark styles
        "dark:border-secondary/30 dark:bg-[#2a4f6f0d] dark:hover:bg-[#2a4f6f0d]"
      )}
    >
      <div className="absolute top-3 right-3 text-accent">
        <Quote size={18} className="opacity-40" />
      </div>
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full" width="40" height="40" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <div className="flex mt-3 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              "mr-0.5",
              i < rating
                ? "fill-accent text-accent"
                : "fill-background text-secondary/30"
            )}
          />
        ))}
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Testimonial() {
  return (
    <section className="px-5 md:px-8 py-10 md:py-16 relative overflow-hidden">
      <div className="relative flex w-full max-w-7xl mx-auto flex-col items-center justify-center overflow-hidden">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
            What Our Students Say
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-4"></div>
          <p className="text-text/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people are saying about
            our products and services.
          </p>
        </div> */}
        <Marquee pauseOnHover className="[--duration:20s] [--gap:2rem]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s] [--gap:2rem]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}

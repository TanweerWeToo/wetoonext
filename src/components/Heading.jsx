import { memo } from "react";
import WordPullUp from "@/components/ui/word-pull-up2";
import WordFadeIn from "@/components/ui/word-fade-in";

const Heading = memo(
  ({
    title,
    subtitle,
    className = "",
    titleClassName = "",
    subtitleClassName = "",
  }) => {
    return (
      <div
        className={`pb-8 sm:pb-16 md:pb-20 space-y-4 sm:space-y-8 ${className}`}
      >
        {title && (
          <WordPullUp
            className={`text-center text-3xl font-semibold sm:font-bold md:font-bold sm:text-5xl md:text-5xl lg:text-6xl ${titleClassName}`}
            words={title}
          />
        )}

        {subtitle && (
          <WordFadeIn
            className={`mx-auto max-w-screen-md xs:text-base text-sm text-center sm:text-lg md:text-lg font-normal sm:font-semibold ${subtitleClassName}`}
            words={subtitle}
            delay={0.05}
          />
        )}
      </div>
    );
  }
);
Heading.displayName = "Heading";
export default memo(Heading);

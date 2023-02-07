import { useEffect, useState } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
           in place of 'smooth' */
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className={`rounded-full  fixed bg-third hover:bg-orange-600 duration-300 right-[20px] md:right-[70px] bottom-[50px] p-4 w-[50px] h-[50px] z-10 ${
        visible ? "flex" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <svg
        viewBox="0 0 16 16"
        width="2em"
        role="presentation"
        focusable="false"
        aria-hidden="true"
      >
        <path
          d="M13.18 10.97L8 5.615l-5.18 5.399-.962-.875 5.346-5.565a1.164 1.164 0 011.671 0l5.25 5.495-.945.901z"
          fill="#fff"
        ></path>
      </svg>
    </button>
  );
};

export default ScrollButton;

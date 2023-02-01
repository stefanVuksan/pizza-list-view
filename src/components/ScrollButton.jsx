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
      className={`rounded-full  fixed bg-third hover:bg-orange-600 duration-300 right-[70px] bottom-[50px] p-4 w-[50px] h-[50px] ${
        visible ? "flex" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 312.36"
      >
        <path
          fillRule="nonzero"
          fill="#fff"
          d="M0 276.77 253.12 0 512 282.48l-32.65 29.88-226.2-246.83L32.66 306.64z"
        />
      </svg>
    </button>
  );
};

export default ScrollButton;

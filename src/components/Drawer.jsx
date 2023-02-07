import React from "react";

export default function CustomDrawer({ children, isOpen, setIsOpen, dir }) {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={`w-[80%] absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ${
          dir === "left"
            ? "left-0" + (isOpen ? " translate-x-0 " : " translate-x-[-100%] ")
            : "right-0" + (isOpen ? " translate-x-0 " : " translate-x-full ")
        }`}
      >
        <article className="relative w-full p-6 pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}

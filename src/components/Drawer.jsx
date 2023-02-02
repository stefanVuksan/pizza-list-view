import React from "react";

export default function CustomDrawer({ children, isOpen, setIsOpen }) {
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
        className={
          " w-[80%] right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-full p-6 max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <h1 className="text-3xl font-bold text-center">Warenkorb</h1>
          <div className="flex justify-center mt-10">
            <svg
              viewBox="0 0 16 16"
              className="w-12 h-12"
              width="1em"
              height="1em"
              role="presentation"
              focusable="false"
              aria-hidden="true"
            >
              <path
                d="M12.996 4.719h-2.371V2.53L9.313 1.22H6.688L5.375 2.53V4.72H3.004l-.429 8.452a1.523 1.523 0 001.531 1.61h7.788a1.522 1.522 0 001.531-1.61l-.429-8.452zM6.688 2.53h2.625V4.72H6.688V2.53zM12.05 13.4a.219.219 0 01-.157.07H4.106a.228.228 0 01-.218-.219l.358-7.21h7.508l.359 7.21a.22.22 0 01-.062.149z"
                fill="#000"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-center mt-2">
            Fülle deinen Warenkorb
          </h1>
          <p className="text-md text-center mt-1">
            Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle
            dein Essen.
          </p>
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

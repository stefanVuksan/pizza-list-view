// modules
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel } from "swiper";
import mockData from "./restaurants-with-reviews.json";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-scroll";

//components
import ScrollButton from "./components/ScrollButton";
import CustomDrawer from "./components/Drawer";
//styles
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/navigation";

//import "./styles.css";

//external files
import background from "./images/271_italian_pizza_106.avif";

function App() {
  const [navStick, setNavStick] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState(mockData.restaurants.numberone);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [carts, setCarts] = useState([]);
  const [cartopen, setCartOpen] = useState(false);
  const [infoContent, setInfoContent] = useState();
  const [deliverArea, setDeliverArea] = useState("");

  const toggleStick = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 350) {
      setNavStick(true);
    } else if (scrolled <= 350) {
      setNavStick(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleStick);
    return () => {
      window.removeEventListener("scroll", toggleStick);
    };
  }, [toggleStick]);

  const searchByKey = (e) => {
    setKeyword(e.target.value);
    const temp = mockData.restaurants.numberone;
    const newMeals = {};
    let findStr = (str, key) => {
      return str.toLowerCase().search(key.toLowerCase()) !== -1;
    };
    for (const key in temp.meals) {
      if (Object.hasOwnProperty.call(temp.meals, key)) {
        const element = temp.meals[key];

        let newItems = element.items.map((item) =>
          findStr(item.name, e.target.value) ||
          findStr(item.description, e.target.value)
            ? item
            : undefined
        );
        newItems = newItems.filter(function (element) {
          return element !== undefined;
        });
        newMeals[key] = {
          categoryName: element.categoryName,
          categoryDescription: element.categoryDescription,
          items: newItems,
        };
      }
    }
    setData({ ...data, meals: newMeals });
  };

  const clearKeyWord = () => {
    setKeyword("");
    setData(mockData.restaurants.numberone);
  };

  const CartList = () => {
    return (
      <>
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
        <div className="h-[55%] overflow-y-scroll mt-6 cart-scroll">
          {carts.map((cart, key) => (
            <div
              className=" mt-3 border-[1px] rounded-md p-3 border-primary relative"
              key={key}
            >
              <h1 className="text-md font-semibold pr-5">{cart.name}</h1>
              <h2 className="text-sm font-semibold pr-5">{cart.price}</h2>
              <svg
                version="1.1"
                className="cursor-pointer absolute right-2 top-1/2 translate-y-[-50%] w-6"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 122.88 119.72"
                style={{ enableBackground: "new 0 0 122.88 119.72" }}
                xmlSpace="preserve"
                onClick={() =>
                  setCarts([...carts.filter((ca) => ca.name !== cart.name)])
                }
              >
                <g>
                  <path
                    d="M22.72,0h77.45c6.25,0,11.93,2.56,16.05,6.67c4.11,4.11,6.67,9.79,6.67,16.05v74.29c0,6.25-2.56,11.93-6.67,16.05 l-0.32,0.29c-4.09,3.94-9.64,6.38-15.73,6.38H22.72c-6.25,0-11.93-2.56-16.05-6.67l-0.3-0.32C2.43,108.64,0,103.09,0,97.01V22.71 c0-6.25,2.55-11.93,6.67-16.05C10.78,2.55,16.46,0,22.72,0L22.72,0z M39.92,65.83c-3.3,0-5.97-2.67-5.97-5.97 c0-3.3,2.67-5.97,5.97-5.97h43.05c3.3,0,5.97,2.67,5.97,5.97c0,3.3-2.67,5.97-5.97,5.97H39.92L39.92,65.83z M100.16,10.24H22.72 c-3.43,0-6.55,1.41-8.81,3.67c-2.26,2.26-3.67,5.38-3.67,8.81v74.29c0,3.33,1.31,6.35,3.43,8.59l0.24,0.22 c2.26,2.26,5.38,3.67,8.81,3.67h77.45c3.32,0,6.35-1.31,8.59-3.44l0.21-0.23c2.26-2.26,3.67-5.38,3.67-8.81V22.71 c0-3.42-1.41-6.54-3.67-8.81C106.71,11.65,103.59,10.24,100.16,10.24L100.16,10.24z"
                    fill="#d01b1b"
                  />
                </g>
              </svg>
            </div>
          ))}
        </div>
      </>
    );
  };

  const MealInfo = () => {
    return (
      <div className=" bg-white p-2 z-20">
        <h1 className="text-3xl font-bold opacity-80">
          Weitere Produktinformationen
        </h1>
        <h2 className="text-2xl font-bold my-5 opacity-80">
          Substanzen oder Produkte, die Allergien oder Intoleranzen hervorrufen
          können.
        </h2>
        <ul className="list-disc ml-5 text-[#555] my-5">
          <li>Mit Nitritpökelsalz und Nitrat</li>
          <li>Mit Nitrat</li>
        </ul>
        <h2 className="text-2xl font-bold my-5 opacity-80">Allergene</h2>
        <ul className="list-disc ml-5 text-[#555] my-5">
          <li>Enthält glutenhaltige/s Getreide/-Erzeugnisse</li>
          <li>Enthält Ei/-Erzeugnisse</li>
          <li>Enthält Milch/-Erzeugnisse (laktosehaltig)</li>
        </ul>
        <p className="text-md">
          Wir stellen dir stets relevante Informationen zur Verfügung, die wir
          von unseren Partnern über deren Produkte erhalten. In einigen Fällen
          können die angezeigten Informationen jedoch unvollständig, automatisch
          generiert und/oder noch nicht von Number One validiert worden sein.
          Bitte wende dich über dieses Formular an unseren Kundenservice, wenn
          du Allergien, Unverträglichkeiten oder Fragen zu bestimmten Artikeln
          hast.
        </p>
      </div>
    );
  };

  const CloseIcon = () => {
    return (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="20px"
        viewBox="0 0 122.881 122.88"
        enableBackground="new 0 0 122.881 122.88"
        xmlSpace="preserve"
      >
        <g>
          <path d="M61.44,0c16.966,0,32.326,6.877,43.445,17.996c11.119,11.118,17.996,26.479,17.996,43.444 c0,16.967-6.877,32.326-17.996,43.444C93.766,116.003,78.406,122.88,61.44,122.88c-16.966,0-32.326-6.877-43.444-17.996 C6.877,93.766,0,78.406,0,61.439c0-16.965,6.877-32.326,17.996-43.444C29.114,6.877,44.474,0,61.44,0L61.44,0z M80.16,37.369 c1.301-1.302,3.412-1.302,4.713,0c1.301,1.301,1.301,3.411,0,4.713L65.512,61.444l19.361,19.362c1.301,1.301,1.301,3.411,0,4.713 c-1.301,1.301-3.412,1.301-4.713,0L60.798,66.157L41.436,85.52c-1.301,1.301-3.412,1.301-4.713,0c-1.301-1.302-1.301-3.412,0-4.713 l19.363-19.362L36.723,42.082c-1.301-1.302-1.301-3.412,0-4.713c1.301-1.302,3.412-1.302,4.713,0l19.363,19.362L80.16,37.369 L80.16,37.369z M100.172,22.708C90.26,12.796,76.566,6.666,61.44,6.666c-15.126,0-28.819,6.13-38.731,16.042 C12.797,32.62,6.666,46.314,6.666,61.439c0,15.126,6.131,28.82,16.042,38.732c9.912,9.911,23.605,16.042,38.731,16.042 c15.126,0,28.82-6.131,38.732-16.042c9.912-9.912,16.043-23.606,16.043-38.732C116.215,46.314,110.084,32.62,100.172,22.708 L100.172,22.708z" />
        </g>
      </svg>
    );
  };

  const MealCart = ({ value, areaChange }) => {
    return (
      <>
        <div className="flex items-center rounded-xl border-[1px] border-[#ccc] py-2 my-1">
          <div className="ml-3">
            <svg
              viewBox="0 0 16 16"
              width="1em"
              height="1em"
              role="presentation"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M11.938 3.135a5.574 5.574 0 00-7.875 7.875L8 15l3.938-3.938a5.575 5.575 0 000-7.927zm-.928 7L8 13.101l-3.01-3.01a4.27 4.27 0 010-6.029 4.27 4.27 0 016.02 0 4.27 4.27 0 010 6.03v.043zM8 4.719A2.406 2.406 0 108 9.53 2.406 2.406 0 008 4.72zm0 3.5A1.094 1.094 0 118 6.03 1.094 1.094 0 018 8.22z"></path>
            </svg>
          </div>
          <input
            defaultValue={value}
            onChange={(e) => {
              areaChange(e.target.value);
            }}
            className="w-[80%] ml-3 outline-none"
          />
          <button className="float-right ml-auto mr-4">
            <CloseIcon />
          </button>
        </div>
      </>
    );
  };

  const SearchIcon = () => {
    return (
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="20px"
        viewBox="0 0 122.879 119.799"
        enableBackground="new 0 0 122.879 119.799"
        xmlSpace="preserve"
      >
        <g>
          <path d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z" />
        </g>
      </svg>
    );
  };

  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-full md:w-[80%] border-r-[3px] border-[#ddd] relative"
          id=""
        >
          <div className="shadow-xl pb-1 w-full">
            <div className="relative">
              <img
                src={background}
                className="h-[220px] object-cover w-full"
                alt="background"
              />
              <img
                src={data.logo}
                className="w-20 p-2 shadow-md rounded-md absolute bg-white shadow-primary bottom-[-10px] left-4"
                alt="logo"
              />
            </div>
            <div className="px-4 md:px-20 py-5">
              <h1 className="text-3xl font-bold">{data.name}</h1>
              <div className="float-right">
                <button className="bg-gray-100 text-white rounded-full p-4 hover:bg-secondary hover:text-white duration-300 mr-3">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-5 h-5"
                    width="1em"
                    height="1em"
                    role="presentation"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path d="M8 1.219A6.781 6.781 0 1014.781 8 6.79 6.79 0 008 1.219zm0 12.25A5.469 5.469 0 118 2.53a5.469 5.469 0 010 10.938zM7.344 7.29h1.312v3.334H7.344V7.291zm1.531-1.916a.875.875 0 11-1.75 0 .875.875 0 011.75 0z"></path>
                  </svg>
                </button>

                <button className="bg-gray-100 text-white rounded-full p-4 hover:bg-secondary hover:text-white duration-300">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-5 h-5"
                    width="1em"
                    height="1em"
                    role="presentation"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path d="M8 14.195L2.234 8.263a3.745 3.745 0 010-5.128 3.413 3.413 0 014.9 0l.875.875.875-.875a3.421 3.421 0 014.909 0 3.754 3.754 0 010 5.128L8 14.195zM4.675 3.406a2.082 2.082 0 00-1.514.648 2.432 2.432 0 000 3.29l4.84 4.961 4.838-4.97a2.432 2.432 0 000-3.281 2.135 2.135 0 00-3.045 0L8.735 5.086a1.103 1.103 0 01-1.531 0L6.189 4.054a2.1 2.1 0 00-1.514-.648z"></path>
                  </svg>
                </button>
              </div>

              <div className="md:flex text-red mt-3 items-center">
                <div className="pointer-events-none">
                  <ReactStars
                    count={5}
                    //onChange={ratingChanged}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    edit={false}
                    value={5}
                  />
                </div>
                <a href="#d" className="underline text-sm mx-2">
                  817 Bewertungen
                </a>
              </div>
              <div className="flex mt-3 text-zinc-700 text-sm">
                <img
                  src="/images/icons/clock-rotate-right-icon.svg"
                  className="w-4 h-4 mr-2"
                  alt="right-icon"
                />
                {data.info[3]}
              </div>
              <p className="text-md mt-2 text-gray-700">
                Bei diesem Restaurant kannst du Stempel sammeln. Stelle beim
                Bestellabschluss bitte sicher, dass du dich für unseren
                Newsletter angemeldet hast, um deine Stempel per E-Mail zu
                erhalten.
              </p>
            </div>

            <div
              className={` ${
                navStick
                  ? "fixed top-0 w-full md:w-[80%]  border-[#ddd] border-r-[3px] bg-white  z-100 shadow-xl"
                  : "w-full"
              }`}
            >
              {!searchBox ? (
                <div className="py-2 flex items-center px-4 md:px-20">
                  <button
                    className="bg-gray-100 text-white rounded-full p-2 hover:bg-secondary hover:text-white duration-300"
                    onClick={() => setSearchBox(true)}
                  >
                    <SearchIcon />
                  </button>
                  <div className="relative px-10 pr-16 w-[95%]">
                    <div className="swiper-button image-swiper-button-next">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                        imageRendering="optimizeQuality"
                        fillRule="evenodd"
                        width="25px"
                        clipRule="evenodd"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fillRule="nonzero"
                          d="M0 256c0 70.68 28.66 134.7 74.98 181.02C121.3 483.34 185.32 512 256 512c70.69 0 134.7-28.66 181.02-74.98C483.34 390.7 512 326.69 512 256c0-70.69-28.66-134.7-74.98-181.02C390.7 28.66 326.69 0 256 0 185.32 0 121.3 28.66 74.98 74.98 28.66 121.3 0 185.31 0 256zm231.67-109.04L340.7 256 231.67 365.04l-40.52-40.51 68.51-68.52-68.52-68.52 40.53-40.53zM101.01 410.99c-39.66-39.66-64.2-94.47-64.2-154.99 0-60.53 24.54-115.33 64.2-154.99 39.66-39.66 94.47-64.2 154.99-64.2 60.53 0 115.33 24.54 154.99 64.2 39.66 39.66 64.2 94.46 64.2 154.99 0 60.53-24.54 115.33-64.2 154.99-39.66 39.66-94.46 64.2-154.99 64.2-60.52 0-115.33-24.54-154.99-64.2z"
                          fill="#3c0101"
                        />
                      </svg>
                    </div>
                    <div className="swiper-button image-swiper-button-prev">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        shapeRendering="geometricPrecision"
                        textRendering="geometricPrecision"
                        imageRendering="optimizeQuality"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        width="25px"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fillRule="nonzero"
                          d="M512 256c0 70.68-28.66 134.7-74.98 181.02C390.7 483.34 326.68 512 256 512c-70.69 0-134.7-28.66-181.02-74.98C28.66 390.7 0 326.69 0 256c0-70.69 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 256 0c70.68 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.31 512 256zM280.33 146.96 171.3 256l109.03 109.04 40.52-40.51-68.51-68.52 68.52-68.52-40.53-40.53zm130.66 264.03c39.66-39.66 64.2-94.47 64.2-154.99 0-60.53-24.54-115.33-64.2-154.99-39.66-39.66-94.47-64.2-154.99-64.2-60.53 0-115.33 24.54-154.99 64.2-39.66 39.66-64.2 94.46-64.2 154.99 0 60.53 24.54 115.33 64.2 154.99 39.66 39.66 94.46 64.2 154.99 64.2 60.52 0 115.33-24.54 154.99-64.2z"
                          fill="#3c0101"
                        />
                      </svg>
                    </div>
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={10}
                      slidesPerGroup={1}
                      loop={false}
                      //slideToClickedSlide={true}
                      mousewheel={true}
                      navigation={{
                        nextEl: `.image-swiper-button-next`,
                        prevEl: `.image-swiper-button-prev`,
                        disabledClass: `swiper-button-disabled`,
                      }}
                      breakpoints={{
                        // when window width is >= 640px
                        640: {
                          slidesPerView: 2,
                        },
                        // when window width is >= 768px
                        768: {
                          slidesPerView: 5,
                        },
                      }}
                      modules={[Pagination, Navigation, Mousewheel]}
                      className="mySwiper"
                    >
                      {(() => {
                        let slider = [];
                        for (const key in data.meals) {
                          if (Object.hasOwnProperty.call(data.meals, key)) {
                            slider.push(
                              <SwiperSlide
                                key={key}
                                className="cursor-poiner"
                                //isactive={currentTab === key ? true : false}
                              >
                                <Link
                                  activeClass="active"
                                  className={`cursor-pointer text-md font-semibold px-4 md:px-20 py-1 rounded-full duration-300`}
                                  smooth
                                  spy
                                  to={key}
                                >
                                  <p className="">{key}</p>
                                </Link>
                              </SwiperSlide>
                            );
                          }
                        }
                        return slider;
                      })()}
                    </Swiper>
                  </div>
                </div>
              ) : (
                <div className="flex items-center rounded-xl border-[1px] border-[#ccc] md:mx-20 mx-3 py-2 my-1">
                  <div className="ml-3" onClick={() => setSearchBox(false)}>
                    <SearchIcon />
                  </div>
                  <input
                    value={keyword}
                    onChange={searchByKey}
                    className="w-[80%] ml-3 outline-none"
                  />
                  <button
                    className="float-right ml-auto mr-4"
                    //onClick={() => setSearchBox(false)}
                    onClick={() => clearKeyWord()}
                  >
                    <CloseIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
          {(() => {
            let rows = [];
            for (const key in data.meals) {
              if (Object.hasOwnProperty.call(data.meals, key)) {
                const element = data.meals[key];
                if (element.items.length > 0) {
                  rows.push(
                    <div className="mt-3 px-4 md:px-20" id={key}>
                      <h2 className="text-2xl py-3 text-primary font-bold">
                        {key}
                      </h2>
                      {element.items.map((item, k) => (
                        <div
                          className="rounded-md border-[1px] border-third hover:bg-[#eee] p-3 my-3 cursor-pointer"
                          key={k}
                          onClick={(e) => {
                            if (e.target.id !== "info") {
                              setInfoContent(
                                <MealCart
                                  value={deliverArea}
                                  areaChange={setDeliverArea}
                                />
                              );
                            } else {
                            }
                            setInfoOpen(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <h3 className="text-xl font-semibold mr-2">
                                {item.name}
                              </h3>
                              <svg
                                viewBox="0 0 16 16"
                                className="w-5 h-5 cursor-pointer"
                                width="1em"
                                height="1em"
                                id="info"
                                role="presentation"
                                focusable="false"
                                aria-hidden="true"
                                onClick={(e) => {
                                  setInfoOpen(true);
                                  if (e.target.id === "info") {
                                    setInfoContent(<MealInfo />);
                                  }
                                }}
                              >
                                <path
                                  id="info"
                                  d="M8 1.219A6.781 6.781 0 1014.781 8 6.79 6.79 0 008 1.219zm0 12.25A5.469 5.469 0 118 2.53a5.469 5.469 0 010 10.938zM7.344 7.29h1.312v3.334H7.344V7.291zm1.531-1.916a.875.875 0 11-1.75 0 .875.875 0 011.75 0z"
                                ></path>
                              </svg>
                            </div>
                            <button
                              className="bg-gray-100 text-white rounded-full p-2 hover:bg-secondary hover:text-white duration-300 mr-3"
                              onClick={() => setCarts([...carts, item])}
                            >
                              <svg
                                viewBox="0 0 16 16"
                                width="1em"
                                height="1em"
                                role="presentation"
                                focusable="false"
                                aria-hidden="true"
                              >
                                <path d="M14.125 7.344H8.656V1.875H7.344v5.469H1.875v1.312h5.469v5.469h1.312V8.656h5.469V7.344z"></path>
                              </svg>
                            </button>
                          </div>

                          <p className="text-gray-700 text-sm py-1">
                            {item.description.split("\r\n").map((de, ke) => (
                              <>
                                <span>{de}</span> <br />
                              </>
                            ))}
                          </p>
                          <h3 className="text-xl font-bold ">{item.price}</h3>
                        </div>
                      ))}
                    </div>
                  );
                }
              }
            }
            return rows;
          })()}
          <ScrollButton />
          <button
            className="border-[3px] border-primary p-3 rounded-full fixed left-[20px] bottom-[100px] md:hidden bg-primary"
            onClick={() => setCartOpen(true)}
          >
            <svg
              viewBox="0 0 16 16"
              className="w-8 h-8"
              width="1em"
              height="1em"
              role="presentation"
              focusable="false"
              aria-hidden="true"
            >
              <path
                d="M12.996 4.719h-2.371V2.53L9.313 1.22H6.688L5.375 2.53V4.72H3.004l-.429 8.452a1.523 1.523 0 001.531 1.61h7.788a1.522 1.522 0 001.531-1.61l-.429-8.452zM6.688 2.53h2.625V4.72H6.688V2.53zM12.05 13.4a.219.219 0 01-.157.07H4.106a.228.228 0 01-.218-.219l.358-7.21h7.508l.359 7.21a.22.22 0 01-.062.149z"
                fill="#fff"
              ></path>
            </svg>
          </button>
        </div>

        <div className="w-full hidden md:block  md:w-[20%] px-4 py-10 bg-[#f1f1f1] fixed h-full right-0">
          <CartList />
        </div>
      </div>
      {window.innerWidth < 768 ? (
        <>
          <CustomDrawer isOpen={cartopen} setIsOpen={setCartOpen} dir={"right"}>
            <CartList />
          </CustomDrawer>
          <CustomDrawer
            isOpen={isInfoOpen}
            setIsOpen={setInfoOpen}
            dir={"left"}
          >
            {infoContent}
          </CustomDrawer>
        </>
      ) : isInfoOpen ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#08080870]">
          <div className="relative w-auto my-6 mx-auto w-1/2">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-end p-5 border-b border-solid border-gray-300 rounded-t ">
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setInfoOpen(false)}
                >
                  <svg
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    role="presentation"
                    focusable="false"
                    aria-hidden="false"
                  >
                    <path d="M11.868 3.205L8 7.072 4.133 3.205l-.928.927L7.073 8l-3.868 3.867.928.928L8 8.927l3.868 3.868.927-.928L8.928 8l3.867-3.868-.927-.927z"></path>
                  </svg>
                </button>
              </div>
              <div className="p-3">{infoContent}</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;

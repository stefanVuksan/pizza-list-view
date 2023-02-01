// modules
import "./App.css";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Mousewheel } from "swiper";
import mockData from "./restaurants-with-reviews.json";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-scroll";

//components
import ScrollButton from "./components/ScrollButton";

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
  const [currentTab, setCurrentTab] = useState();
  const [navStick, setNavStick] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState(mockData.restaurants.numberone);

  const toggleStick = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 350) {
      setNavStick(true);
    } else if (scrolled <= 350) {
      setNavStick(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleStick);
  }, []);

  const searchByKey = (e) => {
    console.log(e.target.value);
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
          findStr(item.name, e.target.value) ? item : undefined
        );
        console.log(newItems, "-=-=-");
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
    console.log(newMeals);
    setData({ ...data, meals: newMeals });
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
          className="w-100 md:w-[70%] border-r-[3px] border-[#ddd] relative"
          id=""
        >
          <div className="shadow-xl pb-1">
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
            <div className="px-3 py-5">
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

              <div className="flex text-red mt-3 items-center">
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
                    value={3.5}
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
                  ? "fixed top-0 w-[70%] border-[#ddd] border-r-[3px] bg-white  z-100 shadow-xl"
                  : ""
              }`}
            >
              {!searchBox ? (
                <div className="py-2 flex items-center px-3">
                  <button
                    className="bg-gray-100 text-white rounded-full p-2 hover:bg-secondary hover:text-white duration-300 mr-2"
                    onClick={() => setSearchBox(true)}
                  >
                    <SearchIcon />
                  </button>
                  <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    slidesPerGroup={1}
                    loop={false}
                    //slideToClickedSlide={true}
                    mousewheel={true}
                    navigation={true}
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
                              isActive={currentTab === key ? true : false}
                            >
                              <Link
                                activeClass="active"
                                className={`cursor-pointer text-md font-semibold  px-3 py-1 rounded-full duration-300`}
                                smooth
                                spy
                                to={key}
                                onClick={() => {
                                  setCurrentTab(key);
                                }}
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
              ) : (
                <div className="flex items-center rounded-xl border-[1px] border-[#ccc] mx-3 py-2 my-1">
                  <div className="ml-3">
                    <SearchIcon />
                  </div>
                  <input
                    value={keyword}
                    onChange={searchByKey}
                    className="w-[80%] ml-3 outline-none"
                  />
                  <button
                    className="float-right ml-auto mr-4"
                    onClick={() => setSearchBox(false)}
                  >
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
                    <div className="mt-3 p-4" id={key}>
                      <h2 className="text-2xl py-3 text-primary font-bold">
                        {key}
                      </h2>
                      {element.items.map((item, k) => (
                        <div className="rounded-md border-[1px] bg-gray-50 border-third p-4 cursor-pointer my-3">
                          <div className="flex items-center gap-2 justify-between">
                            <div className="flex items-center">
                              <h3 className="text-xl font-semibold ">
                                {item.name}
                              </h3>
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
                            </div>
                            <button className="bg-gray-100 text-white rounded-full p-2 hover:bg-secondary hover:text-white duration-300 mr-3">
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

                          <p className="text-gray-700 text-sm py-2">
                            {item.description}
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
        </div>
        <div className="w-100 md:w-[30%] px-4 py-10 bg-primary text-white">
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
                fill="#fff"
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
        </div>
      </div>
    </>
  );
}

export default App;

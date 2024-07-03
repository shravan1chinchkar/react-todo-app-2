// import './App.css'
import { useState } from "react";

function App() {
  const [check, setcheck] = useState("");
  const [image, setimage] = useState("hidden");
  const [cross, setcross] = useState("hidden");

  let lighttheme = {
    topbackground: "/assets/images/bg-desktop-light.jpg",
    themebutton: "/assets/images/icon-moon.svg",
    mainbgcolor: "#ffffff",
    todocardbgcolor: "#ffffff",
    todocardtextcolor: "#000000",
    todocardlifooter: "#BDBDBD",
    todocardlifooterhover: "#484b6a",
    themeborder: "#000000",
  };
  let darktheme = {
    topbackground: "/assets/images/bg-desktop-dark.jpg",
    themebutton: "/assets/images/icon-sun.svg",
    mainbgcolor: "#161722",
    todocardbgcolor: "#25273c",
    todocardtextcolor: "#cacde8",
    todocardlifooter: "#777a92",
    todocardlifooterhover: "#e4e5f1",
    themeborder: "#777a92",
  };

  const [theme, settheme] = useState(lighttheme);

  const handlecheck = () => {
    if (check === "" && image === "hidden") {
      setcheck("gradient-to-r from-[#57DEFF] to-[#C058F3]");
      setimage("block");
    } else {
      setcheck("");
      setimage("hidden");
    }
  };

  const handleCross = () => {
    console.log("hello");
    if (cross === "hidden") {
      setcross("block");
    } else {
      setcross("hidden");
    }
  };

  const handleTheme = () => {
    if(theme===lighttheme){
      settheme(darktheme);
    }
    else{
      settheme(lighttheme);
    }
  };

  return (
    <>
      {/* The top most image resides here */}

      {/* For dark theme bg is bg-[#161722] */}
      <div className={`bg-[${theme.mainbgcolor}] relative w-[100vw] h-[100vh]`}>
        <div className="w-[100vw] h-[300px]">
          <img
            className="w-[100%] h-[100%] object-fill"
            // "/assets/images/bg-desktop-light.jpg"
            src={theme.topbackground}
            alt="bg-light-image"
          />
        </div>

        {/* The Todo card start from here */}
        <div className="absolute top-[75px] left-[480px]  min-w-[37%] z-[1]">
          {/* Following is the header which contain Title and darka and light mode */}
          <div className="flex justify-between items-center my-3">
            {/* Title */}
            <div>
              <p className="text-3xl tracking-[10px] text-white font-semibold font-custom-font">
                TODO
              </p>
            </div>

            {/* Dark and light mode toogle button */}
            <div
              className="w-[30pxpx] h-[30px] cursor-pointer"
              onClick={handleTheme}
            >
              <img
                className="w-[100%] h-[100%]"
                src={theme.themebutton}
                alt="moon"
              />
            </div>
          </div>

          {/* Following div consist of input tag for todos */}
          {/* for dark theme bg is bg-[#25273c] */}
          <div
            className={`flex items-center gap-[1rem] bg-[${theme.todocardbgcolor}] p-4 my-[30px] rounded-md`}
          >
            <div>
              {/* for dark theme border is border-[#777a92] */}
              <div
                className={`w-[30px] h-[30px] rounded-[50%] border-2 border-[${theme.themeborder}]`}
              ></div>
            </div>
            {/* for dark theme bg is bg-[#25273c] */}
            <input
              className={`bg-[${theme.todocardbgcolor}] w-[100%] outline-none font-custom-font-2 text-[#cacde8]`}
              type="text"
              placeholder="ENTER THE TASK TO DO HERE!"
            />
          </div>

          {/* Following div consist of list of todos */}

          {/* for dark theme bg is bg-[#25273c] */}
          <ul
            className={`bg-[${theme.todocardbgcolor}] rounded-md relative gradient-box-shadow`}
          >
            <li
              className={`flex gap-[1rem] p-[1rem] border-b-[1px] border-[${theme.themeborder}] cursor-pointer`}
            >
              <div>
                {/* for dark theme border color is border-[#777a92] */}
                <div
                  className={`flex justify-center items-center bg-${check} w-[30px] h-[30px] rounded-[50%] border-[2px] border-[${theme.themeborder}] cursor-pointer hover:border-custom-b`}
                  onClick={handlecheck}
                >
                  <img
                    className={`w-[50%] h-[50%] ${image}`}
                    src="/assets/images/icon-check.svg"
                    alt="check"
                  />
                </div>
              </div>

              <div
                className={`flex justify-between items-center w-[100%]`}
                onClick={handleCross}
              >
                {/* for dark text color is text-[#cacde8] */}
                <div
                  className={`font-custom-font-2 text-[${theme.todocardtextcolor}]`}
                >
                  Complete the online javascript course
                </div>

                <div className="flex justify-center items-center ">
                  <img
                    className={`${cross}`}
                    src="/assets/images/icon-cross.svg"
                    alt="cross1"
                  />
                </div>
              </div>
            </li>

            {/* Footer li */}

            {/* for dark theme text color is text-[#777a92] */}
            <li
              className={`flex justify-between p-[1rem] text-[${theme.todocardlifooter}] font-semibold text-sm font-custom-font-2`}
            >
              <div className="ml-[10px]">5 items left</div>
              <div className="ml-[20px] w-[150px] flex justify-between">
                {/* Ligth theme hover :custom-h custom-h custom-h */}

                {/* for dark theme hover is text-[#e4e5f1] */}
                <button
                  className={`hover:text-[${theme.todocardlifooterhover}]`}
                >
                  All
                </button>
                <button
                  className={`hover:text-[${theme.todocardlifooterhover}]`}
                >
                  Active
                </button>
                <button
                  className={`hover:text-[${theme.todocardlifooterhover}]`}
                >
                  Completed
                </button>
              </div>
              <div className="mr-[10px]">
                <button>Clear Completed</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

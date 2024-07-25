import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
uuidv4();

function App() {
  // Following Object is for light theme
  let lighttheme = {
    topbackground: "/assets/images/bg-desktop-light.jpg",
    topbackgroundmobile: "/assets/images/bg-mobile-light.jpg",
    themebutton: "/assets/images/icon-moon.svg",
    mainbgcolor: `#ffffff`,
    todocardbgcolor: `#ffffff`,
    todocardtextcolor: `#000000`,
    todocardlifooter: `gray`,
    todocardlifooterhover: `#484b6a`,
    finishtodo: `#d2d3db`,
  };

  // Following object is for bark theme
  let darktheme = {
    topbackground: "/assets/images/bg-desktop-dark.jpg",
    topbackgroundmobile: "/assets/images/bg-mobile-dark.jpg",
    themebutton: "/assets/images/icon-sun.svg",
    mainbgcolor: `#161722`,
    todocardbgcolor: `#25273c`,
    todocardtextcolor: `#cacde8`,
    todocardlifooter: `#777a92`,
    todocardlifooterhover: `#e4e5f1`,
    themeborder: `#777a92`,
    finishtodo: `#4d5066`,
  };

  // Following are all the states used in this project
  // state which is used for theme change
  const [theme, settheme] = useState(lighttheme);
  const [isDark, setisDark] = useState(false);
  // state which are used for todo and todos

  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  // state which is used to handle hover in dark mode
  const [isAll, setisAll] = useState(false);
  const [isActive, setisActive] = useState(false);
  const [complete, setcomplete] = useState(false);

  // state which is used to handle the nunber of todos left
  const [todosLeft, settodosLeft] = useState(0);

  // state which is used to store the copy of the original todo
  const [copytodos, setcopytodos] = useState([]);

  const [clearcompleted, setclearcompleted] = useState(false);

  // Following are all the useEffect used in the code
  useEffect(() => {
    setisAll(true);
  }, []);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    let todosleft = localStorage.getItem("todosLeft");
    if (todostring && todosleft) {
      let todos = JSON.parse(todostring);
      let todosLeft = todosleft;
      settodos(todos);
      settodosLeft(todosLeft);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("todosLeft", todosLeft);
    if (todos.length === 0) {
      setcopytodos([
        {
          id: uuidv4(),
          todo: "Currently No todos to display",
        },
      ]);
    } else {
      setcopytodos([]);
    }

    // Following logic is for clear Completed button
    let completedtodos = todos.filter((item) => {
      return item.isCompleted === true;
    });
    if (completedtodos.length > 0) {
      setclearcompleted(true);
    } else {
      setclearcompleted(false);
    }
  }, [todos]);

  // HANDLER 1:-
  // Following Handler handles the dark and light theme
  const handleTheme = () => {
    if (!isDark) {
      settheme(darktheme);
      setisDark(true);
    } else {
      settheme(lighttheme);
      setisDark(false);
    }
  };

  // HANDLER 2:-
  // Following Handler handles the input of the input tag
  let handlechange = (e) => {
    settodo(e.target.value);
    setisAll(true);
    setisActive(false);
    setcomplete(false);
  };

  // HANDLER 3:-
  // Following Handler handles the "Enter" key evnet of the keyboard
  let addTodo = (e) => {
    if (e.key === "Enter" && todo.length == 0) {
      alert("Please enter the task to perform");
    } else {
      if (e.key === "Enter") {
        const newtodos = [
          ...todos,
          { id: uuidv4(), todo, isCompleted: false, isDelete: false },
        ];
        settodos(newtodos);
        settodo("");
        settodosLeft(newtodos.length);
      }
    }
  };

  // HANDLER 4:-
  // Following Handler handles the check which is present in front of each todo
  const handlecheck = (e) => {
    let id = e.target.closest("div[id]").id;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);

    // Following code is use to display the count of todos left
    let completetodos = newtodos.filter((item) => {
      return item.isCompleted === true;
    });
    settodosLeft(newtodos.length - completetodos.length);
  };

  // Handler 5:-
  // Following handler delets the specific todo
  let deletetodo = (e) => {
    e.stopPropagation(); //Because of this line event bubbling gets stoped
    let id = e.target.closest("div[id]").id;
    console.log("Handle deletetodos", e.target.closest("div[id]"));
    let undeletedtodo = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(undeletedtodo);

    // Following code is use to display the count of todos left
    let completetodos = undeletedtodo.filter((item) => {
      return item.isCompleted === true;
    });

    if (completetodos.length > 0) {
      settodosLeft(undeletedtodo.length - completetodos.length);
    } else {
      settodosLeft(undeletedtodo.length);
    }
  };

  // HANDLER 6:-
  // Following Handler Handles the cross image display at the end of each todo
  const handleCross = (e) => {
    // let id = e.target.id;
    let id = e.target.closest("div[id]").id;
    console.log("handleCross:", e.target.closest("div[id]").id);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isDelete = !newtodos[index].isDelete;
    settodos(newtodos);
  };

  //Handler 7:-
  //Following Handler Handles All the todos
  let handleAllTodos = () => {
    if (todos.length === 0) {
      setcopytodos([
        {
          id: uuidv4(),
          todo: "Currently No todos to display",
        },
      ]);
    } else {
      settodos(todos);
      setcopytodos([]);
    }
    setisAll(true);
    setisActive(false);
    setcomplete(false);
  };

  // Handler 8:-
  // Following Handler Handles the Active Todo
  let handelActiveTodo = () => {
    let activeTodos = todos.filter((item) => {
      return item.isCompleted === false;
    });
    if (activeTodos.length === 0) {
      setcopytodos([
        {
          id: uuidv4(),
          todo: "Currently No Active todos",
        },
      ]);
    } else {
      setcopytodos(activeTodos);
    }
    setisAll(false);
    setisActive(true);
    setcomplete(false);
  };

  // Handler 9:-
  // Following Handler Handles the Compeleted Todo;
  let handleCompleteTodo = () => {
    let completetodos = todos.filter((item) => {
      return item.isCompleted === true;
    });
    if (completetodos.length === 0) {
      setcopytodos([
        {
          id: uuidv4(),
          todo: "Currently No Completed  todos",
        },
      ]);
    } else {
      setcopytodos(completetodos);
    }
    setisAll(false);
    setisActive(false);
    setcomplete(true);
  };

  // Handler 10:-
  // Following Handler delets the todos who has isCompleted:true
  let deleteCompletedTodos = () => {
    let deleteCompletedTodos = todos.filter((item) => {
      return item.isCompleted === false;
    });
    settodos(deleteCompletedTodos);
  };

  return (
    <>
      {/* The top most image resides here */}
      <div
        className={`relative w-[100vw] h-[100vh]`}
        style={{ backgroundColor: theme.mainbgcolor }}
      >
        {/* Followin div consist of the background images */}
        <div className="w-[100vw] c-lg:h-[300px] c-md:h-[250px] ">
          <img
            className="w-[100%] h-[100%] object-fill"
            src={
              window.innerWidth >= "300" && window.innerWidth < "800"
                ? theme.topbackgroundmobile
                : theme.topbackground
            }
            alt="bg-light-image"
          />
        </div>

        {/* The Todo card start from here */}
        <div
          className="m-auto absolute 
          c3-xl:left-[480px] c3-xl:min-w-[37%]  z-[1]
          c1-xl:w-[37%] c2-xl:min-w-[50%] c2-xl:left-[350px] 
          c1-lg:left-[300px] c1-lg:min-w-[50%] c-lg:top-[75px] c-lg:left-[130px]  c-lg:min-w-[30%] c1-md:min-w-[60%] c1-md:left-[155px]  c2-md:top-[20px] c2-md:left-[135px] c2-md:min-w-[40%]  c1-sm:top-[180px] c1-sm:left-[100px] c1-sm:min-w-[75%] c2-sm:top-[120px] c2-sm:left-[70px] c2-sm:min-w-[80%] c3-sm:top-[120px] c3-sm:left-[55px] c3-sm:min-w-[50%] c4-sm:left-[45px] c4-sm:top-[90px] c4-sm:min-w-[80%] c5-sm:left-[20px] c5-sm:top-[60px] 
          c5-sm:min-w-[90%] c6-sm:left-[20px] c6-sm:top-[30px] c6-sm:min-w-[90%] c7-sm:left-[20px] c7-sm:top-[20px] c7-sm:min-w-[90%]"
        >
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
          <div
            className={`flex items-center gap-[1rem] p-4 my-[30px] rounded-md `}
            style={{ backgroundColor: theme.todocardbgcolor }}
          >
            <div>
              <div
                className={`w-[30px] h-[30px] rounded-[50%] border-2 `}
                style={{ borderColor: theme.themeborder }}
              ></div>
            </div>

            <input
              className={`w-[100%]  break-words overflow-wrap break-word whitespace-pre-wrap outline-none font-custom-font-2 c5-sm:text-[18px] c6-sm:text-[15px] c7-sm:text-[10px]`}
              style={{
                backgroundColor: theme.todocardbgcolor,
                color: theme.todocardtextcolor,
              }}
              type="text"
              placeholder="Create a new todo..."
              onChange={handlechange}
              value={todo}
              onKeyDown={addTodo}
            />
          </div>

          {/* Following div consist of list of todos */}
          <ul
            className={`rounded-md relative gradient-box-shadow `}
            style={{ backgroundColor: theme.todocardbgcolor }}
          >
            {copytodos.length > 0
              ? copytodos.map((item) => {
                  if (
                    item.todo === "Currently No Active todos" ||
                    item.todo === "Currently No Completed  todos" ||
                    item.todo === "Currently No todos to display"
                  ) {
                    return (
                      <li
                        className={`flex gap-[1rem] p-[1rem] border-b-[1px]  cursor-pointer`}
                        style={{ borderColor: theme.themeborder }}
                        id={item.id}
                        key={item.id}
                      >
                        <div
                          className={`flex justify-between items-center w-[100%]`}
                          id={item.id}
                        >
                          <div
                            style={
                              item.isCompleted
                                ? { color: theme.finishtodo }
                                : { color: theme.todocardtextcolor }
                            }
                            className={
                              "font-custom-font-2 break-words overflow-wrap break-word whitespace-pre-wrap"
                            }
                          >
                            {item.todo}
                          </div>
                        </div>
                      </li>
                    );
                  }
                  return (
                    <li
                      className={`flex gap-[1rem] c2-sm:p-[1rem] c7-sm:p-[20px] border-b-[1px]  cursor-pointer`}
                      style={{ borderColor: theme.themeborder }}
                      id={item.id}
                      key={item.id}
                    >
                      <div>
                        {/* Following is the circle which is present at the starting of todos  */}
                        <div
                          className={
                            // Apply style if isComplete and dark mode is true
                            item.isCompleted === true && isDark === true
                              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer border-[#777a92]  hover:border-custom-b bg-gradient-to-r from-[#57ddff] to-[#c058f3]"
                              : // Apply style if isComplete is true and dark mode is false
                              item.isCompleted === true && isDark == false
                              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer hover:border-custom-b bg-gradient-to-r from-[#57ddff] to-[#c058f3]"
                              : // Apply style if dark mode is true
                              isDark === true
                              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer border-[#777a92] hover:border-custom-b"
                              : // Apply style if above all conditions are false
                                "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer hover:border-custom-b"
                          }
                          id={item.id}
                          onClick={handlecheck}
                        >
                          <img
                            className={
                              item.isCompleted
                                ? `w-[50%] block h-[50%]`
                                : `w-[50%] hidden h-[50%]`
                            }
                            src="/assets/images/icon-check.svg"
                            alt="check"
                          />
                        </div>
                      </div>

                      <div
                        className={`flex justify-between items-center c3-sm:gap-[1rem] c4-sm:gap-[3rem] c5-sm:gap-[1rem] c6-sm:gap-[1rem] `}
                        onClick={handleCross}
                        id={item.id}
                      >
                        <div
                          style={
                            item.isCompleted
                              ? { color: theme.finishtodo }
                              : { color: theme.todocardtextcolor }
                          }
                          className={
                            item.isCompleted
                              ? "font-custom-font-2 line-through break-words overflow-wrap break-word whitespace-pre-wrap text-justify  c1-xl:w-[430px] c2-xl:w-[480px] c1-lg:w-[450px] c1-md:w-[430px] c2-md:w-[412px] c1-sm:w-[420px] c2-sm:w-[350px] c4-sm:w-[330px] c5-sm:w-[210px] c6-sm:w-[190px] c7-sm:w-[180px]"
                              : "font-custom-font-2 break-words overflow-wrap break-word whitespace-pre-wrap text-justify c1-xl:w-[430px] c2-xl:w-[480px]   c1-lg:w-[450px] c-lg:w-[350px]  c1-md:w-[430px] c2-md:w-[412px] c1-sm:w-[420px] c2-sm:w-[350px] c3-sm:w-[300px] c4-sm:w-[200px] c5-sm:w-[210px] c6-sm:w-[190px] c7-sm:w-[150px]"
                          }
                        >
                          {item.todo}
                        </div>

                        <div className="flex justify-center items-center ">
                          <img
                            className={item.isDelete ? "block" : "hidden"}
                            src="/assets/images/icon-cross.svg"
                            alt="cross1"
                          />
                        </div>
                      </div>
                    </li>
                  );
                })
              : todos.map((item) => {
                  return (
                    <li
                      className={`flex gap-[1rem] c2-sm:p-[1rem] c7-sm:p-[20px] border-b-[1px]  cursor-pointer`}
                      style={{ borderColor: theme.themeborder }}
                      id={item.id}
                      key={item.id}
                    >
                      <div>
                        {/* Following is the circle which is present at the starting of todos  */}
                        <div
                          className={
                            // Apply style if isComplete and dark mode is true
                            item.isCompleted === true && isDark === true
                              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer border-[#777a92]  hover:border-custom-b bg-gradient-to-r from-[#57ddff] to-[#c058f3]"
                              : // Apply style if isComplete is true and dark mode is false
                              item.isCompleted === true && isDark == false
                              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer hover:border-custom-b bg-gradient-to-r from-[#57ddff] to-[#c058f3]"
                              : // Apply style if dark mode is true
                              isDark === true
                              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer border-[#777a92] hover:border-custom-b"
                              : // Apply style if above all conditions are false
                                "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer hover:border-custom-b"
                          }
                          id={item.id}
                          onClick={handlecheck}
                        >
                          <img
                            className={
                              item.isCompleted
                                ? `w-[50%] block h-[50%]`
                                : `w-[50%] hidden h-[50%]`
                            }
                            src="/assets/images/icon-check.svg"
                            alt="check"
                          />
                        </div>
                      </div>

                      {/* Following div consit of the main todo */}
                      <div
                        className={`flex justify-between items-center c3-sm:gap-[1rem] c4-sm:gap-[3rem] c5-sm:gap-[1rem] c6-sm:gap-[1rem]`}
                        id={item.id}
                        onClick={handleCross}
                      >
                        {/* Following div contain the todo  */}
                        <div
                          style={
                            item.isCompleted
                              ? { color: theme.finishtodo}
                              : {
                                  color: theme.todocardtextcolor
                                }
                          }
                          className={
                            item.isCompleted
                              ? "font-custom-font-2 line-through break-words overflow-wrap break-word whitespace-pre-wrap text-justify  c1-xl:w-[430px] c2-xl:w-[480px] c1-lg:w-[450px] c1-md:w-[430px] c2-md:w-[412px] c1-sm:w-[420px] c2-sm:w-[350px] c4-sm:w-[330px] c5-sm:w-[210px] c6-sm:w-[190px] c7-sm:w-[180px]"

                              : "font-custom-font-2 break-words overflow-wrap break-word whitespace-pre-wrap text-justify c1-xl:w-[430px] c2-xl:w-[480px]   c1-lg:w-[450px] c-lg:w-[350px]  c1-md:w-[430px] c2-md:w-[412px] c1-sm:w-[420px] c2-sm:w-[350px] c3-sm:w-[300px] c4-sm:w-[200px] c5-sm:w-[210px] c6-sm:w-[190px] c7-sm:w-[150px]"
                          }
                        >
                          {item.todo}
                        </div>

                        {/* Following div has the cross symbol */}
                        <div
                          className={
                            item.isDelete
                              ? "flex justify-center items-center"
                              : "hidden justify-center items-center"
                          }
                          id={item.id}
                          onClick={deletetodo}
                        >
                          <img
                            src="/assets/images/icon-cross.svg"
                            alt="cross1"
                            id={item.id}
                          />
                        </div>
                      </div>

                    </li>
                  );
                })}

            {/* Footer li */}
            <li
              className={`justify-between p-[1rem]  font-semibold text-sm font-custom-font-2 
              c2-sm:flex c7-sm:hidden`}
              style={{ color: theme.todocardlifooter }}
            >
              <div className="ml-[10px]">{`${todosLeft} items left`}</div>


              {/* Followin div has the ALL ACTIVE COMPLETE BUTTON */}
              <div className="ml-[20px] w-[150px] flex justify-between">
                <button
                  className={
                    isAll === true
                      ? "text-[#3a7bfd]"
                      : isDark
                      ? "hover:text-[#e4e5f1]"
                      : "hover:text-[#484b6a]"
                  }
                  onClick={handleAllTodos}
                >
                  All
                </button>

                <button
                  className={
                    isActive === true
                      ? "text-[#3a7bfd]"
                      : isDark
                      ? "hover:text-[#e4e5f1]"
                      : "hover:text-[#484b6a]"
                  }
                  onClick={handelActiveTodo}
                >
                  Active
                </button>

                <button
                  className={
                    complete === true
                      ? "text-[#3a7bfd]"
                      : isDark
                      ? "hover:text-[#e4e5f1]"
                      : "hover:text-[#484b6a]"
                  }
                  onClick={handleCompleteTodo}
                >
                  Completed
                </button>
              </div>

              {/* Following is the clear complete button */}
              <div className="mr-[10px]">
                <button
                  className={
                    isDark === true && clearcompleted === true
                      ? "cursor-pointer hover:text-[#e4e5f1]"
                      : clearcompleted
                      ? "cursor-pointer hover:text-[#484b6a]"
                      : "cursor-not-allowed"
                  }
                  onClick={deleteCompletedTodos}
                >
                  Clear Completed
                </button>
              </div>
            </li>

            {/*Footer li for mobile */}
            <li
              className="c7-sm:flex justify-between p-[1rem]  font-semibold text-sm font-custom-font-2 c2-sm:hidden "
              // style={{ color: theme.todocardlifooter }}
            >
              <div className="ml-[10px]"
              style={{color:theme.todocardlifooter}}>{`${todosLeft} items left`}</div>
              <div className="mr-[10px]"
               style={{ color: theme.todocardlifooter }}>
                <button
                  className={
                    isDark === true && clearcompleted === true
                      ? "cursor-pointer hover:text-[#e4e5f1]"
                      : clearcompleted
                      ? "cursor-pointer hover:text-[#484b6a]"
                      : "cursor-not-allowed"
                  }
                  // style={{color: theme.todocardlifooterhover}}
                  onClick={deleteCompletedTodos}
                >
                  Clear Completed
                </button>
              </div>
            </li>
          </ul>

          <div className="mt-[1rem] mb-[1rem] w-[100%] h-[50px] c7-sm:flex justify-evenly rounded-md c2-sm:hidden  font-semibold text-sm font-custom-font-2 relative  gradient-box-shadow"
          style={{ backgroundColor: theme.todocardbgcolor,color:theme.todocardlifooter}}
          >
            <button
              className={
                isAll === true
                  ? "text-[#3a7bfd]"
                  : isDark
                  ? "hover:text-[#e4e5f1]"
                  : "hover:text-[#484b6a]"
              }
              onClick={handleAllTodos}
            >
              All
            </button>

            <button
              className={
                isActive === true
                  ? "text-[#3a7bfd]"
                  : isDark
                  ? "hover:text-[#e4e5f1]"
                  : "hover:text-[#484b6a]"
              }
              onClick={handelActiveTodo}
            >
              Active
            </button>

            <button
              className={
                complete === true
                  ? "text-[#3a7bfd]"
                  : isDark
                  ? "hover:text-[#e4e5f1]"
                  : "hover:text-[#484b6a]"
              }
              onClick={handleCompleteTodo}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;

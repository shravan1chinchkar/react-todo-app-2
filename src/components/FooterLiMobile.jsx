import React, { useContext } from "react";
import { todocontext } from "../context/context";

const FooterLiMobile = () => {
  const value = useContext(todocontext);
  return (
    <li
      className="c7-sm:flex justify-between p-[1rem]  font-semibold text-sm font-custom-font-2 c2-sm:hidden "
      // style={{ color: theme.todocardlifooter }}
    >
      <div
        className="ml-[10px]"
        style={{ color: value.theme.todocardlifooter }}
      >
        {`${value.todosLeft} items left`}
      </div>
      <div
        className="mr-[10px]"
        style={{ color: value.theme.todocardlifooter }}
      >
        <button
          className={
            value.isDark === true && value.clearcompleted === true
              ? "cursor-pointer hover:text-[#e4e5f1]"
              : value.clearcompleted
              ? "cursor-pointer hover:text-[#484b6a]"
              : "cursor-not-allowed"
          }
          // style={{color: theme.todocardlifooterhover}}
          onClick={value.deleteCompletedTodos}
        >
          Clear Completed
        </button>
      </div>
    </li>
  );
};

export default FooterLiMobile;

import React, { useContext } from "react";
import { todocontext } from "../context/context";

const FooterLiMobileButtons = () => {
  const value = useContext(todocontext);
  return (
    <div
      className="mt-[1rem] mb-[1rem] w-[100%] h-[50px] c7-sm:flex justify-evenly rounded-md c2-sm:hidden  font-semibold text-sm font-custom-font-2 relative  gradient-box-shadow"
      style={{
        backgroundColor: value.theme.todocardbgcolor,
        color: value.theme.todocardlifooter,
      }}
    >
      <button
        className={
          value.isAll === true
            ? "text-[#3a7bfd]"
            : value.isDark
            ? "hover:text-[#e4e5f1]"
            : "hover:text-[#484b6a]"
        }
        onClick={value.handleAllTodos}
      >
        All
      </button>

      <button
        className={
          value.isActive === true
            ? "text-[#3a7bfd]"
            : value.isDark
            ? "hover:text-[#e4e5f1]"
            : "hover:text-[#484b6a]"
        }
        onClick={value.handelActiveTodo}
      >
        Active
      </button>

      <button
        className={
          value.complete === true
            ? "text-[#3a7bfd]"
            : value.isDark
            ? "hover:text-[#e4e5f1]"
            : "hover:text-[#484b6a]"
        }
        onClick={value.handleCompleteTodo}
      >
        Completed
      </button>
    </div>
  );
};

export default FooterLiMobileButtons;

import React, { useContext } from "react";
import { todocontext } from "../context/context";

const Footerli = () => {
  const value = useContext(todocontext);
  return (
    <li
      className={`justify-between p-[1rem]  font-semibold text-sm font-custom-font-2 
              c2-sm:flex c7-sm:hidden`}
      style={{ color: value.theme.todocardlifooter }}
    >
      <div className="ml-[10px]">{`${value.todosLeft} items left`}</div>

      {/* Followin div has the ALL ACTIVE COMPLETE BUTTON */}
      <div className="ml-[20px] w-[150px] flex justify-between">
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

      {/* Following is the clear complete button */}
      <div className="mr-[10px]">
        <button
          className={
            value.isDark === true && value.clearcompleted === true
              ? "cursor-pointer hover:text-[#e4e5f1]"
              : value.clearcompleted
              ? "cursor-pointer hover:text-[#484b6a]"
              : "cursor-not-allowed"
          }
          onClick={value.deleteCompletedTodos}
        >
          Clear Completed
        </button>
      </div>
    </li>
  );
};

export default Footerli;

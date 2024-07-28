import React,{useContext} from "react";
import { todocontext } from "../context/context";

const Todolist = ({item}) => {
    const value=useContext(todocontext);
  return (
    <li
      className={`flex gap-[1rem] c2-sm:p-[1rem] c7-sm:p-[20px] border-b-[1px]  cursor-pointer`}
      style={{ borderColor: value.theme.themeborder }}
      id={item.id}
    >
      <div>
        {/* Following is the circle which is present at the starting of todos  */}
        <div
          className={
            // Apply style if isComplete and dark mode is true
            item.isCompleted === true && value.isDark === true
              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer border-[#777a92]  hover:border-custom-b bg-gradient-to-r from-[#57ddff] to-[#c058f3]"
              : // Apply style if isComplete is true and dark mode is false
              item.isCompleted === true && value.isDark == false
              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer hover:border-custom-b bg-gradient-to-r from-[#57ddff] to-[#c058f3]"
              : // Apply style if dark mode is true
              value.isDark === true
              ? "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer border-[#777a92] hover:border-custom-b"
              : // Apply style if above all conditions are false
                "flex justify-center items-center  w-[30px] h-[30px] rounded-[50%] border-[2px]  cursor-pointer hover:border-custom-b"
          }
          id={item.id}
          onClick={value.handlecheck}
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
        onClick={value.handleCross}
      >
        {/* Following div contain the todo  */}
        <div
          style={
            item.isCompleted
              ? { color: value.theme.finishtodo }
              : {
                  color: value.theme.todocardtextcolor,
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
          onClick={value.deletetodo}
        >
          <img src="/assets/images/icon-cross.svg" alt="cross1" id={item.id} />
        </div>
      </div>
    </li>
  );
};

export default Todolist;

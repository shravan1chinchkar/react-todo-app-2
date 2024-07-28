import React,{useContext} from "react";
import { todocontext } from "../context/context";

const Notodos = ({item}) => {
    const value=useContext(todocontext);
  return (
    <li
      className={`flex gap-[1rem] p-[1rem] border-b-[1px]  cursor-pointer`}
      style={{ borderColor: value.theme.themeborder }}
      id={item.id}
    >
      <div
        className={`flex justify-between items-center w-[100%]`}
        id={item.id}
      >
        <div
          style={
            item.isCompleted
              ? { color: value.theme.finishtodo }
              : { color: value.theme.todocardtextcolor }
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
};

export default Notodos;

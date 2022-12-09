// import React, { useEffect, useRef, useState } from "react";

// const TodoForm = ({ onSubmit, error }) => {
//   const [todoTitle, setTodoTitle] = useState("");
//   const [disable, setDisable] = useState(true);
//   console.log(todoTitle);
//   const handleSubmi = (e) => {
//     e.preventDefault();
//     // console.log(input);
// onSubmit({
//   id: Date.now(),
//   text: todoTitle,
//   isCompleted: false,
//   selected: false,
// });

//     setTodoTitle("");
//   };

//   const handleChange = (e) => {
//     setTodoTitle(e.target.value);
//     setDisable(false);
//     //console.log(e);
//   };
//   const inputRef = useRef(null);
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   return (
//     <form className="" onSubmit={handleSubmi}>
//       <div className="m-4 flex w-80">
//         <input
//           className="shadow mr-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
//           value={todoTitle}
//           onChange={handleChange}
//           type="text"
//           placeholder="Add Activities"
//           // required
//           ref={inputRef}
//         />

//         <button
//           className={`${
//             disable ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-700"
//           }   text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
//           type="submit"
//           disabled={disable}
//         >
//           Add
//         </button>
//       </div>
//       <span className="text-red-400 italic text-sm">{error}</span>
//     </form>
//   );
// };

// export default TodoForm;
import React from "react";
import { useForm } from "react-hook-form";
const TodoForm = ({ onTodoSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const todoValues = {
      ...data,
      id: Date.now(),
      completed: false,
      selected: false,
    };
    onTodoSubmit(todoValues);
    reset();
  };
  //const handleClick = () => resetField("text");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="m-4 flex w-80">
        <input
          className="shadow mr-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
          {...register("text", { required: "Task title is required" })}
          type="text"
          placeholder="Add Activities"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit "
        >
          Add
        </button>
      </div>
      {errors.text && (
        <p className="text-red-500 italic">{errors.text?.message}</p>
      )}
    </form>
  );
};

export default TodoForm;

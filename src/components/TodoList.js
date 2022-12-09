import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { TiEdit } from "react-icons/ti";
import { RiCloseCircleLine } from "react-icons/ri";
import { addTodos, removeTodo, updateTodo } from "../api/todoApi";
import { useMutation } from "react-query";
import { useGetTodoList } from "../hooks/useGetTodoData";
import ClipLoader from "react-spinners/ClipLoader";

function TodoList() {
  const [editTodo, setEditTodo] = useState("");

  const { data, refetch, isLoading } = useGetTodoList();

  const { mutate: addTodoMutation, isLoading: addLoading } = useMutation(
    addTodos,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const handleSubmit = (todo) => {
    addTodoMutation(todo);
  };

  const { mutate: deleteTodoMutation, isLoading: deleteLoading } = useMutation(
    removeTodo,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center font-serif font-semibold text-2xl">
            List your Tasks
          </h2>

          <TodoForm onTodoSubmit={handleSubmit} />
          {addLoading && (
            <div className="flex justify-center">
              <ClipLoader
                color="green"
                // loading={loading}
                // cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {isLoading ? (
            <div className="flex justify-center">
              <ClipLoader
                color="green"
                // loading={loading}
                // cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <>
              {data?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex justify-between border-b-2 py-2"
                  >
                    <div className="flex">
                      <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded mt-1"
                        //onClick={() => completeTodo(item.id)}
                        type="checkbox"
                        checked={item.completed}
                        id={item.id}
                        onChange={() =>
                          updateTodoMutation({
                            ...item,
                            completed: !item.completed,
                          })
                        }
                        disabled={item.selected === true ? "disable" : ""}
                      />

                      {item.selected === true ? (
                        <input
                          className="px-2 py1 ml-3 cursor-pointer h-6 w-full "
                          type="text"
                          value={item.text}
                          placeholder="update your todo"
                          // onBlur={() => console.log(213223)}
                          onChange={() => {
                            updateTodoMutation.mutate({
                              ...item,
                              //  text: (item.text = editTodo),
                              selected: !item.selected,
                            });
                            setEditTodo("");
                          }}
                        />
                      ) : (
                        <p
                          className={`ml-3 ${
                            item.completed ? " line-through" : ""
                          }`}
                        >
                          {item.text}
                        </p>
                      )}
                    </div>

                    <div className="flex cursor-pointer">
                      <RiCloseCircleLine
                        onClick={() => {
                          deleteTodoMutation({ id: item.id });
                        }}
                        className="text-red-500 font-semibold text-2xl mr-4"
                      />
                      {item.selected ? (
                        <p
                          onClick={() => {
                            updateTodoMutation.mutate({
                              ...item,
                              text: (item.text = editTodo),
                              selected: !item.selected,
                            });
                            setEditTodo("");
                          }}
                        >
                          Upd
                        </p>
                      ) : (
                        <TiEdit
                          onClick={() =>
                            updateTodoMutation.mutate({
                              ...item,
                              selected: !item.selected,
                            })
                          }
                          className="text-green-500 font-semibold text-2xl mr-2"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-center">
                {deleteLoading && (
                  <ClipLoader
                    color="green"
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </div>
            </>
          )}

          {/* <p className="text-center text-gray-500">
            No tasks found, Please add!!
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default TodoList;

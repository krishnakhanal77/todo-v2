import axios from "axios";
import { useQuery } from "react-query";

// export default async () => {
//   const response = await axios.get("http://localhost:4000/tasks");
//   return response.data;
// };

const getTodosList = async () => {
  const response = await axios.get("http://localhost:4000/tasks");
  return response.data;
};
export const useGetTodoList = () => {
  return useQuery("todos", getTodosList, {
    select: (data) => data.sort((a, b) => b.id - a.id),
  });
};

//  const useGetTodoList = useQuery("todos", getTodosList, {
//   select: (data) => data.sort((a, b) => b.id - a.id),
// });

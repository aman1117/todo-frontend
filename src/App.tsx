import './App.css';
import { useEffect, useState } from 'react';
import { Square } from './components/square';
import Cookies from 'js-cookie';

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);
  const [doneCount, setDoneCount] = useState<number>(1);

  useEffect(() => {
    const storedTodoList = Cookies.get('todoList');
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  const handleSubmit = () => {
    if (todo.trim() !== "") {
      const updatedTodoList = [...todoList, todo];
      setTodoList([...todoList, todo]);
      setTodo("");
      Cookies.set('todoList', JSON.stringify(updatedTodoList));
    }
  }

  return (
    <div className="w-screen h-screen flex  justify-center bg-pink-50">
      <div className='min-w-96 bg-slate-50'>
        <p className='font-bold text-xl'>
          Todos
        </p>


        <p>
          Add tasks to your list
        </p>
        <div className="flex justify-center items-center flex-row">
          <input type='text' className='w-full' onChange={(e) =>
            setTodo(e.target.value)
          } onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
            onSubmit={() => {
              handleSubmit();
            }
            }
          />
          <button className='m-2 bg-green-400' onClick={handleSubmit}>Add</button>
        </div>
        <div className='flex'>
          {
            [...Array(doneCount)].map(() => <Square value={true} />)
          }
          {
            todoList.map(() => <Square value={false} />)
          }

        </div>

        <div>
          {todoList.map((todo, index) => {
            return <div key={index} className='flex justify-between items-center'>
              <p>{todo}</p>
            </div>
          })}
        </div>

      </div>
    </div>
  );
}

export default App;

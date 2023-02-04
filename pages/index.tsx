import Head from 'next/head'
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete} from 'react-icons/ai';


export default function Home() {
 const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      setTodos(
        todos.map((todo, index) => {
          if (index === editingIndex) {
            return newTodo;
          }
          return todo;
        })
      );
      setEditingIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo('');
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewTodo(todos[index]);
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  return (
    <>
 <div className="container mx-auto w-[500px] rounded-lg border-2 border-purple-400 p-6">
      <Head>
        <title>To-Do App</title>
        <link rel="stylesheet" href="/_next/static/css/styles.css" />
      </Head>
      <h1 className="  text-violet-400 text-center text-2xl font-medium mb-8">Todo App</h1>
      <form onSubmit={handleSubmit} className="mx-auto flex items-center mb-8">
        <input
          type="text"
          className="p-2 rounded-lg w-full border-2"
          placeholder="Add a to-do"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button type="submit" disabled={ newTodo === '' ? true : false}   className={`bg-purple-300 hover:accent-inherit  hover:border-purple-400 focus:border-purple-400 border-purple-400 border p-2 rounded-lg w-ful ml-2`}>
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </form>
      <ul className='overflow-auto max-h-96 snap-center' >
        {todos.map((todo, index) => (
          <>
          <li
            key={index}
            className="p-2 rounded-lg  flex justify-between items-center"
          >
            <>
           {index +1}. {todo}
            </>
            <div>

            <button
              className="bg-yellow-500 p-1 rounded-lg mr-2"
              onClick={() => handleEdit(index)}
              >
              <AiOutlineEdit/>
            </button>
            <button
              className="bg-red-500 p-1 rounded-lg"
              onClick={() => handleDelete(index)}
              >
              <AiOutlineDelete/>
            </button>
              </div>
          </li>
              <hr/>
          </>
        ))}
        </ul>
        </div>
        <h1 className="text-center">Developed by: Ishtiaq Ahmad</h1>
  </>
  )
}

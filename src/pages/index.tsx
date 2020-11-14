import React from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/client"

const GET_TODOS = gql`
  {
    items {
      id,
      item
    }
  }
`

const ADD_TODO  = gql`
  mutation AddTask($message: String!) {
    addTask(message: $message) 
  }
`

const DELETE_TODO = gql`
  mutation RemoveTask($id: String!) {
    removeTask(id: $id) 
}

`


export default function  Home (){
  const { loading, error, data } = useQuery(GET_TODOS)

  const [InputTodo, setInputTodo] = React.useState("")

  const [addTask] = useMutation(ADD_TODO)

  const [removeTask] = useMutation(DELETE_TODO)


  const handleDelete = (id) => {
      console.log(id)
    removeTask({ variables: { id: id }, refetchQueries: [{ query: GET_TODOS }],})
  }


  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    console.log(error) 
  }
  return (
    <div>
      <form  onSubmit={(e) => {
          e.preventDefault();
          addTask({ variables: { message: InputTodo }, refetchQueries: [{ query: GET_TODOS }],});
        }}>
      <input
        type="text"
        value={InputTodo}
        onChange={e => setInputTodo(e.target.value)}   
      />

      <button type="submit">
        Add TASK
      </button>

      </form>

      {data.items.map((curr, ind) => {
        return <li><span>{curr.item}</span><span><button onClick={()=> handleDelete(curr.id)}>Delete</button></span></li>
      })}
    </div>
  )
}



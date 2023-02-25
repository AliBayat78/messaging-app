import * as React from 'react'
import { v4 as uuidV4 } from 'uuid'

type LoginType = {
  onSubmitId: React.Dispatch<React.SetStateAction<string>>
}

const Login = ({ onSubmitId }: LoginType) => {
  const createNewId = () => {
    onSubmitId(uuidV4())
  }

  return (
    <div className="ml-4 w-full">
      <h1>Enter Your Id</h1>
      <div className="flex flex-col w-2/3">
        <input
          onChange={(e) => onSubmitId(e.target.value)}
          className="w-1/3 p-4 rounded-lg"
          id="userId"
          name="userId"
          placeholder="Enter Your Id"
        />
        <div className="flex flex-row justify-around mt-2 w-1/3">
          <button
            className="p-2 rounded-md bg-blue-700 text-white border-none cursor-pointer"
            type="submit"
          >
            Login
          </button>
          <button
            onClick={() => createNewId()}
            className="p-2 rounded-md bg-gray-700 text-white border-none cursor-pointer"
          >
            Create New Id
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

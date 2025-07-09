import { useState } from "react"
import { Button, Input, message } from "antd"
import Header from "../modules/Header"
import { useRoomStore } from "../store/Rooms"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const [name, setName] = useState("")
  const { createRoom } = useRoomStore()
  const navigate = useNavigate()

  const handleCreate = async () => {
    if (!name.trim()) {
      return message.warning("Please enter room name")
    }

    try {
      await createRoom({ name })
      message.success("Room added succesfull!")
      navigate("/") 
    } catch (error) {
      message.error("Room added error.")
    }
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Header />
      <div className="p-10 flex justify-center">
        <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-lg space-y-6 flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-blue-800 text-center">Create new room</h2>
          <Input autoComplete="off" placeholder="Enter room name..." size="large" value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="primary" className="w-full bg-blue-600 hover:bg-blue-700" size="large" onClick={handleCreate}> Save </Button>
        </div>
      </div>
    </div>
  )
}

export default Create

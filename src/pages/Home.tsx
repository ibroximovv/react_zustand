import { useEffect } from "react"
import { useRoomStore } from "../store/Rooms"
import Header from "../modules/Header"
import { Button, Empty } from "antd"

const Home = () => {
    const { rooms, getAllRooms, deleteRoom } = useRoomStore()

    useEffect(() => {
        getAllRooms()
    }, [getAllRooms])

    async function handleDelete(id: number) {
        await deleteRoom(id)
    }
    return (
        <div className="min-h-screen bg-[#f0f4f8]">
            <Header />
            <div className="p-6 space-y-4">
                {rooms.length === 0 ? (
                    <div className="flex justify-center items-center h-[300px]">
                        <Empty description="Rooms not found" />
                    </div>
                ) : (
                    rooms.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-white w-full p-6 rounded-xl shadow-md hover:shadow-lg border-l-4 border-blue-600 transition duration-300">
                            <div className="">
                                <h1 className="text-xl font-semibold text-blue-900 mb-1">
                                    {item.name}
                                </h1>
                                <p className="text-gray-500 text-sm"> CreatedAt: {new Date(item.createdAt).toLocaleString()} </p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <Button>Edit</Button>
                                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                            </div>
                        </div>

                    ))
                )}
            </div>
        </div>
    )
}

export default Home

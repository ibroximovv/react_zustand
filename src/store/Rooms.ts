import axios from 'axios'
import { create } from 'zustand'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0MWIxNDBhLWVlYWUtNGI1ZC1iZDg5LTliMDAwNmQ0YzcxOSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MjA1MDk0MSwiZXhwIjoxNzUyNjU1NzQxfQ.5lvyL8PO0hV5V1M6bJK0M4ICGDaihLhizGp6fHecEFA'

export interface Room {
  id: number
  numberId: number
  name: string
  createdAt: string | Date
}

interface RoomResponse {
  data: Room[]
  total: number
  page: number
  lastPage: number
}

interface RoomStoreType {
  rooms: Room[]
  getAllRooms: () => Promise<void>
  createRoom: (roomData: Partial<Room>) => Promise<void>
  updateRoom: (id: number, roomData: Partial<Room>) => Promise<void>
  deleteRoom: (id: number) => Promise<void>
}

export const useRoomStore = create<RoomStoreType>((set, _get) => ({
  rooms: [],

  getAllRooms: async () => {
    try {
      const res = await axios.get<RoomResponse>('http://54.210.160.235/rooms', {
        headers: { Authorization: `Bearer ${token}` },
      })
      set({ rooms: res.data.data }) 
    } catch (error) {
      console.error('getAllRooms error:', error)
    }
  },

  createRoom: async (roomData) => {
    try {
      const res = await axios.post<Room>('http://54.210.160.235/rooms', roomData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      set((state) => ({
        rooms: [...state.rooms, res.data],
      }))
    } catch (error) {
      console.error('createRoom error:', error)
    }
  },

  updateRoom: async (id, roomData) => {
    try {
      const res = await axios.patch<Room>(`http://54.210.160.235/rooms/${id}`, roomData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      set((state) => ({
        rooms: state.rooms.map((room) => (room.id === id ? res.data : room)),
      }))
    } catch (error) {
      console.error('updateRoom error:', error)
    }
  },

  deleteRoom: async (id) => {
    try {
      await axios.delete(`http://54.210.160.235/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      set((state) => ({
        rooms: state.rooms.filter((room) => room.id !== id),
      }))
    } catch (error) {
      console.error('deleteRoom error:', error)
    }
  },
}))

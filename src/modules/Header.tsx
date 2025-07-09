import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { NavLink, useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
  return (
    <header className="flex justify-between items-center px-10 py-6 bg-blue-900 text-white shadow-md">
      <NavLink to={'/'} className="text-2xl font-semibold">Home</NavLink>
      <Button onClick={() => navigate('/create')} type="primary" icon={<PlusOutlined />} className="bg-gradient-to-r from-blue-600 to-blue-800 border-none text-white hover:from-blue-700 hover:to-blue-900 transition-all duration-300"> Create new room</Button>
    </header>
  )
}

export default Header

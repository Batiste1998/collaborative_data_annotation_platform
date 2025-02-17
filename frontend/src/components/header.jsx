import { useNavigate } from 'react-router-dom'
import Flower from "../assets/icons/flower.svg"
import { useAuth } from '../context/AuthContext'
import { logout } from '../services/authService'

const Header = () => {
    const navigate = useNavigate()
    const { setUser, isAuthenticated } = useAuth()

    const handleLogout = () => {
        logout()
        setUser(null)
        navigate('/login')
    }
    return(
        <div className="relative z-10 flex justify-between w-full p-6 py-5 bg-bleuElectrique sm:py-5 md:py-8 lg:py-10 sm:p-8 md:p-16 lg:p-32" >
            <div className="flex items-center gap-2 sm:gap-16">
                <a href="/">
                    <img className="w-[2rem] sm:w-[3rem]" src={Flower} />
                </a>
                <p className="px-4 py-1 text-base text-white uppercase border border-white rounded-full w-fit font-Gelasio">Innovation</p>
            </div>
            <div className="flex items-center gap-4">
                {isAuthenticated() && (
                    <>
                        <button
                            onClick={() => navigate('/chat')}
                            className="px-4 py-1 text-white transition-colors duration-200 border rounded-full border-white/50 hover:bg-white/10 font-Gelasio"
                        >
                            Chat
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1 text-white transition-colors duration-200 border rounded-full border-white/50 hover:bg-white/10 font-Gelasio"
                        >
                            Déconnexion
                        </button>
                    </>
                )}
                <p className="px-4 py-1 text-base text-white border border-white rounded-full w-fit font-Gelasio h-fit">2025</p>
            </div>
        </div>
    )
}

export default Header

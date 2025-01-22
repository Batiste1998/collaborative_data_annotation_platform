import Flower from "../assets/icons/flower.svg";


const Header = () => {
    return(
        <div className="bg-bleuElectrique w-full py-10 p-32 flex justify-between z-10 relative" >
            <div className="flex gap-16 items-center">
                <img src={Flower} />
                <p className="border w-fit px-4 py-1 rounded-full border-white text-white uppercase font-Gelasio text-base">Innovation</p>
            </div>
            <p className="border w-fit px-4 py-1 rounded-full border-white text-white font-Gelasio h-fit text-base">2025</p>
        </div>
    )
}

export default Header
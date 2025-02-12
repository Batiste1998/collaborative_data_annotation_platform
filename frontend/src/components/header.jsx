import Flower from "../assets/icons/flower.svg";


const Header = () => {
    return(
        <div className="bg-bleuElectrique w-full py-5 sm:py-5 md:py-8 lg:py-10 p-6 sm:p-8 md:p-16 lg:p-32 flex justify-between z-10 relative" >
            <div className="flex gap-2 sm:gap-16 items-center">
                <a href="/">
                    <img className="w-[2rem] sm:w-[3rem]" src={Flower} />
                </a>
                <p className="border w-fit px-4 py-1 rounded-full border-white text-white uppercase font-Gelasio text-base">Innovation</p>
            </div>
            <p className="border w-fit px-4 py-1 rounded-full border-white text-white font-Gelasio h-fit text-base">2025</p>
        </div>
    )
}

export default Header
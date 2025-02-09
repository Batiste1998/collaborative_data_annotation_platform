import Flower from "../assets/icons/flower.svg";
import Bouton from "./button"

const Footer = ({isRegistration}) => {
    return(
        <div className={`bg-bleuElectrique w-full flex-wrap py-4 sm:py-10 p-4 sm:p-5 md:p-10 flex gap-4 sm:gap-7 lg:gap-10 xl:gap-28 items-center justify-evenly z-20 ${isRegistration ? "fixed bottom-0" : ""}`} >
            <a href="/">
                <img className="sm:w-[2rem] md:w-[3rem]" src={Flower} />
            </a>
            <div className="flex gap-4 sm:gap-6 lg:gap-12 flex-wrap sm:flex-nowrap">
                <p className="text-white sm:text-sm lg:text-base font-Roboto font-bold cursor-pointer">Terms of use</p>
                <p className="text-white sm:text-sm lg:text-base font-Roboto font-bold cursor-pointer">Personal data protection</p>
                <p className="text-white sm:text-sm lg:text-base font-Roboto font-bold cursor-pointer">Site map</p>
            </div>
            <div className="flex gap-2 md:gap-6">
                <Bouton variant="primary" text="Inscription" link="/registrer"/>
                <Bouton variant="secondary" text="Connexion" link="/login"/>
            </div>
        </div>
    )
}

export default Footer
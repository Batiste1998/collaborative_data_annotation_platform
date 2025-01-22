import Flower from "../assets/icons/flower.svg";
import Bouton from "./button"

const Footer = () => {
    return(
        <div className="bg-bleuElectrique w-full py-10 p-32 flex gap-28 items-center justify-evenly fixed bottom-0" >
            <img src={Flower} />
            <div className="flex gap-12">
                <p className="text-white text-base font-Roboto font-bold cursor-pointer">Terms of use</p>
                <p className="text-white text-base font-Roboto font-bold cursor-pointer">Personal data protection</p>
                <p className="text-white text-base font-Roboto font-bold cursor-pointer">Site map</p>
            </div>
            <div className="flex gap-6">
                <Bouton variant="primary" text="Inscription" link="/login"/>
                <Bouton variant="secondary" text="Connexion" link="/connexion"/>
            </div>
        </div>
    )
}

export default Footer
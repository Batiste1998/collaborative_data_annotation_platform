import Header from '../../components/header'
import Footer from '../../components/footer'
import Registration from '../../components/registration'
import Decoration from '../../components/decoration'

const LoginPage = () => {
    return(
        <div className='bg-bleuElectrique py-auto h-screen'>
            <Header/>
            <div className="w-3/4 my-32 flex justify-evenly">
                <Registration format="connexion"/>
            </div>
            <Decoration/>
            <Footer isRegistration={true}/>
        </div>
    )
}

export default LoginPage
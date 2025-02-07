import Button from '../components/button'

const Registration = ({ format }) => {
    return (
        <div className={`bg-white/40 w-full sm:w-fit py-6 md:py-5 xl:py-10 sm:pl-8 sm:px-14 md:px-10 xl:px-20 rounded-3xl flex flex-col items-center sm:items-stretch ${format === 'inscription' ? 'gap-8' : 'gap-4 sm:gap-14'}`}>
            {format === 'inscription' && (
                <div className="flex gap-2 sm:gap-10 md:gap-20 justify-between flex-col sm:flex-row">
                    <label className="text-white md:text-xl xl:text-2xl font-Roboto">Username</label>
                    <input className='inputRegistration'/>
                </div>
            )}
            <div className="flex gap-2 sm:gap-10 md:gap-20 justify-between flex-col sm:flex-row">
                <label className="text-white md:text-xl xl:text-2xl font-Roboto">Email</label>
                <input className='inputRegistration'/>
            </div>
            <div className="flex gap-2 sm:gap-10 md:gap-20 justify-between flex-col sm:flex-row">
                <label className="text-white md:text-xl xl:text-2xl font-Roboto">Password</label>
                <div>
                    <input className='inputRegistration'/>
                    {format === 'inscription' && (
                        <a href="/login">
                            <p className="mt-2 underline underline-offset-4 text-white font-semibold">
                                Already have an account ?
                            </p>
                        </a>    
                    )}
                    {format === 'connexion' && (
                        <a href="/registrer">
                            <p className="mt-2 underline underline-offset-4 text-white font-semibold">
                                Not yet registered ?
                            </p>
                        </a>    
                    )}
                    <div className="flex justify-start sm:justify-end mt-5">
                        <Button variant="primary" text={format === 'inscription' ? 'Inscription' : 'Connexion'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
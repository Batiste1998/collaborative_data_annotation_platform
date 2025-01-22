import Button from '../components/button'

const Registration = ({ format }) => {
    return (
        <div className={`bg-white/40 w-fit py-10 px-20 rounded-3xl flex flex-col ${format === 'inscription' ? 'gap-8' : 'gap-14'}`}>
            {format === 'inscription' && (
                <div className="flex gap-20 justify-between">
                    <label className="text-white text-2xl font-Roboto">Username</label>
                    <input />
                </div>
            )}
            <div className="flex gap-20 justify-between">
                <label className="text-white text-2xl font-Roboto">Email</label>
                <input />
            </div>
            <div className="flex gap-20 justify-between">
                <label className="text-white text-2xl font-Roboto">Password</label>
                <div>
                    <input />
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
                    <div className="flex justify-end mt-5">
                        <Button variant="primary" text={format === 'inscription' ? 'Inscription' : 'Connexion'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
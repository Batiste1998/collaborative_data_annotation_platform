const Bouton = ({ variant, text, link }) => {
    const getBackgroundClass = (variant) => {
        switch (variant) {
            case 'primary':
                return 'bg-roseFond border-roseBordure';
            case 'secondary':
                return 'bg-violetFond border-violetBordure';
            default:
                return 'bg-roseFond border-roseBordure';
        }
    };

    return (
        <div>
            <a href={link}>
                <button className={`${getBackgroundClass(variant)} border py-2 px-8 rounded-full text-white font-bold font-Roboto`}>
                    {text}
                </button>
            </a>
        </div>
    );
};

export default Bouton;
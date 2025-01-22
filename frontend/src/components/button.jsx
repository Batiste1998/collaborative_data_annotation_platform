const Bouton = ({ variant, text, link }) => {
    const getBackgroundClass = (variant) => {
        switch (variant) {
            case 'primary':
                return 'bg-roseFond border-roseBordure hover:bg-roseBordure hover:border-roseFond';
            case 'secondary':
                return 'bg-violetFond border-violetBordure hover:bg-violetBordure hover:border-violetFond';
            default:
                return 'bg-roseFond border-roseBordure hover:bg-roseBordure hover:border-roseFond';
        }
    };

    return (
        <div>
            <a href={link}>
                <button className={`${getBackgroundClass(variant)} border py-2 px-8 rounded-full text-white font-bold font-Roboto transition duration-200 linear`}>
                    {text}
                </button>
            </a>
        </div>
    );
};

export default Bouton;
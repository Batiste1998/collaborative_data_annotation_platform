const Name = ({name}) => {
    const colorPairs = {
        "#FF9DF2": "#FF00DD", //rose
        "#9DAEFF": "#3932FF", //bleu
        "#FFCB9D": "#FF6A00", //orange
        "#FF9D9F": "#FF0004", //rouge
        "#FFFF9D": "#F6FF00", //jaune
        "#EF9DFF" : "#AE00FF", //violet
        "#9DFFA1": "#3CFF00" //vert
    }
    const bgColors = Object.keys(colorPairs)
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)]
    const randomBorder = colorPairs[randomBg]
    return (
       <div
            className="py-1 px-5 rounded-full font-Roboto font-semibold text-black w-fit"
            style={{ backgroundColor: randomBg, border: `2px solid ${randomBorder}` }}>
            <p>{name}</p>
        </div>
    )
}

export default Name
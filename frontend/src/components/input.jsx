const Input = ({text, placeholder}) => {
    return(
        <div className="flex flex-col gap-4">
            <label className="text-black font-Roboto font-bold text-lg md:text-xl">{text}</label>
            <input className="inputCreation" placeholder={placeholder}/>
        </div>
    )
}

export default Input
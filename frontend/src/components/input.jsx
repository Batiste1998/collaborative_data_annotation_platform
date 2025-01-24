const Input = ({text}) => {
    return(
        <div className="flex flex-col gap-4">
            <label className="text-black font-Roboto font-bold text-xl">{text}</label>
            <input className="inputCreation" placeholder={text}/>
        </div>
    )
}

export default Input
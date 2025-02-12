import Name from '../components/name'

const Message = ({member}) => {
    return (
       <div className="bg-white shadow-lg w-[95%] sm:w-[85%] xl:w-[75%] mt-1 ml-1 p-4 sm:p-8 flex flex-col gap-4 rounded-3xl">
            <Name name={member}/>
            <p className="text-black font-Roboto">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page.</p>
        </div>
    )
}

export default Message
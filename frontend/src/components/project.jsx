import Name from '../components/name'
import Button from '../components/button'

const Project = ({members, img, name, description}) => {
    return (
       <div>
            <img src={img} className="w-[17rem] lg:w-[20rem] xl:w-[22rem] h-[15rem] rounded-tr-3xl rounded-tl-3xl object-cover"/>
            <div className="bg-white shadow-lg w-[17rem] lg:w-[20rem] xl:w-[22rem] rounded-br-3xl rounded-bl-3xl p-6">
            <div className="flex flex-col gap-4">
                <p className="text-black font-bold font-Roboto text-xl xl:text-2xl">{name}</p>
                <p className="text-black font-Roboto">{description}</p>
                <ul className="flex gap-1 sm:gap-2 flex-wrap">
                {members.map((member, index) => (
                    <li
                        key={index}>
                        <Name name={member}/>
                    </li>
                ))}
                </ul>
                <div className="flex gap-2 md:mt-2">
                    <Button variant="primary" text="Edit"/>
                    <Button variant="secondary" text="Delete"/>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Project;
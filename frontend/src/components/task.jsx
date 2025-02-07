import Name from '../components/name'
import Select from '../components/select'

const Task = ({image, members, finished, checked}) => {
    return(
        <div className="w-fit flex flex-col">
            <img className="mb-6 rounded-3xl min-w-[20rem] w-[25rem] h-[17rem] object-cover" src={image}/>
            <div className="flex gap-5 flex-wrap min-w-[20rem] w-[25rem]">
                <ul className="flex gap-4 flex-wrap">
                    {members.map((member, index) => (
                        <li
                            key={index}>
                            <Name name={member}/>
                        </li>
                    ))}
                </ul>
                {/* FINISHED */}
                {finished && (
                <div className="flex gap-2 items-center">
                    <img src="../../public/check_vert.svg"/>
                    <p className="font-semibold">Finished</p>
                </div>
                )}
                {/* NOT FINISHED */}
                {!finished && (
                <div className="flex gap-2 items-center">
                    <img src="../../public/croix.svg"/>
                    <p className="font-semibold">Not finished</p>
                </div>
                )}
                {/* CHECKED */}
                {checked && (
                <div className="flex gap-2 items-center">
                    <img src="../../public/check_bleu.svg"/>
                    <p className="font-semibold">Checked</p>
                </div>
                )}
                {/* BUTTON */}
                {members.length === 0 && (
                <Select placeholder="Project's members" variant={"primary"} list={["Isabelle", "Nicolas", "Clément", "Virginie", "Batiste", "Julie"]}/>
                )}

            </div>
        </div>
    )
}

export default Task
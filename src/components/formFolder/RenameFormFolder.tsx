import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {useGetFolderQuery, useRenameFolderMutation} from "../../redux/slice/folders/folderApiSlice";
import {useAppSelector} from "../../redux/store";
import close from '../../assets/img/close.png'

type Props = {
    setActiveModal: Dispatch<SetStateAction<string>>,
    id: string
}

const RenameFormFolder: FC<Props> = ({setActiveModal, id}) => {
    const [name, setName] = useState('');
    const [renameFolderMutation] = useRenameFolderMutation();
    const parentId = useAppSelector(state => state.folder.folder.id);
    const {refetch} = useGetFolderQuery(parentId);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await renameFolderMutation({name, id, parentId}).unwrap();
            setName('');
            setActiveModal('');
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const handleNameFolder = (e: any) => setName(e.target.value);

    return (
        <div
            className="flex flex-col items-center bg-gray-400/45 justify-center fixed top-0 left-0 h-screen w-screen pb-40">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 relative">
                <img src={close} alt='Закрыть' onClick={() => setActiveModal('')} className='w-3 h-auto absolute right-7 cursor-pointer'/>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <p className='mb-5 text-xl'>Изменение папки</p>
                    <input type='text'
                           className="w-full bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                           placeholder="Новое название папки"
                           onChange={handleNameFolder}
                    />
                    <button type="submit"
                            className="button-class">Изменить
                    </button>
                </form>
            </div>
        </div>
    )
};

export default RenameFormFolder;
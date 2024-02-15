import React, {Dispatch, FC, SetStateAction} from 'react';
import close from '../assets/img/close.png'
import {useAppSelector} from "../redux/store";
import {useDeleteFolderMutation, useGetFolderQuery} from "../redux/slice/folders/folderApiSlice";
import {useDeleteFileMutation} from "../redux/slice/files/filesApiSlice";

type Props = {
    setActiveModal: Dispatch<SetStateAction<string>>,
    id: string,
    type: string
}

const RenameFormFolder: FC<Props> = ({setActiveModal, id, type}) => {
    const [deleteFolderMutation] = useDeleteFolderMutation();
    const [deleteFileMutation] = useDeleteFileMutation();
    const parentId = useAppSelector(state => state.folder.folder.id);
    const {refetch} = useGetFolderQuery(parentId);

    const handleDelete = async (e: any, id: string, type: string) => {
        e.preventDefault();
        try {
            type === 'folder'
                ? await deleteFolderMutation(id)
                : await deleteFileMutation(id);
            setActiveModal('');
            refetch();
        } catch (error) {
            console.error('Произошла ошибка', error);
        }
    };

    return (
        <div
            className="flex flex-col items-center bg-gray-400/45 justify-center fixed top-0 left-0 h-screen w-screen pb-40">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 relative">
                <img src={close} alt='Закрыть' onClick={() => setActiveModal('')}
                     className='w-3 h-auto absolute right-7 cursor-pointer'/>
                <p className='mb-5 text-xl'>Удалить?</p>

                <form className="flex justify-around mb-3">
                    <button onClick={(e) => handleDelete(e, id, type)}
                            className="button-class w-[150px]">Да
                    </button>
                    <button type="submit" onClick={() => setActiveModal('')}
                            className="button-class w-[150px]">Нет
                    </button>
                </form>
            </div>
        </div>
    )
};

export default RenameFormFolder;
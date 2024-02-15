import React, {FC} from 'react';
import folderIcon from "../assets/img/folder.png";
import fileIcon from "../assets/img/file.png";
import edit from "../assets/img/edit.png";
import deleteIcon from "../assets/img/delete.png";
import {addFolderToHistory, setNewFolder} from "../redux/slice/folders/folderSlice";
import {useAppDispatch, useAppSelector} from "../redux/store";

type Props = {
    el: any,
    refetch: any,
    dragStartHandler: (folder: any) => void,
    dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void,
    dropHandler: (e: React.DragEvent<HTMLDivElement>, folder: any) => Promise<void>,
    setFolderId: React.Dispatch<React.SetStateAction<string>>,
    setTypeFile: React.Dispatch<React.SetStateAction<string>>,
    setActiveModal: React.Dispatch<React.SetStateAction<string>>,
}

const ItemChildren: FC<Props> = ({
                                     el,
                                     refetch,
                                     dragStartHandler,
                                     dragOverHandler,
                                     dropHandler,
                                     setFolderId,
                                     setTypeFile,
                                     setActiveModal
                                 }) => {
    const dispatch = useAppDispatch();

    const switchFolder = async (id: string, name: string) => {
        dispatch(setNewFolder(id));
        dispatch(addFolderToHistory({id, name}))
        await refetch();
    };

    return (
        <div
            draggable={el.type === 'folder'}
            onDragStart={() => el.type === 'folder' && dragStartHandler(el)}
            onDragOver={(e) => el.type === 'folder' && dragOverHandler(e)}
            onDrop={(e) => el.type === 'folder' && dropHandler(e, el)}

            onClick={() => el.type === 'folder'
                && switchFolder(el.id, el.name)
            }
            key={el.id}
            className='w-1/5-no-m-3 p-4 m-3 rounded hover:bg-gray-200 transition ease-in border-gray-400 border-2'
        >
            <p className='flex items-center mb-5'>
                {el.type === 'folder'
                    ? <>
                        <img className='w-8 mx-2' src={folderIcon} draggable={false} alt="Папка"/>
                        {el.name}
                    </>
                    : <>
                        <img className='w-8 mx-2' src={fileIcon} draggable={false} alt="Папка"/>
                        {el.file.name}
                    </>}
            </p>
            <div className='flex justify-end'>
                {el.type === 'folder'
                    && <img src={edit} alt='Изменить' draggable={false} onClick={(e) => {
                        e.stopPropagation();
                        setFolderId(el.id);
                        setActiveModal('renameFolder');
                    }} className='w-6 cursor-pointer'/>
                }
                <img src={deleteIcon} alt='Удалить' draggable={false} onClick={(e) => {
                    e.stopPropagation();
                    setFolderId(el.id);
                    setTypeFile(el.type);
                    setActiveModal('deleteModal');
                }} className='w-6 mx-2 cursor-pointer'/>
            </div>
        </div>
    );
};

export default ItemChildren;
import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import AddFormFolder from "./formFolder/AddFormFolder";
import {setFolder} from "../redux/slice/folders/folderSlice";
import {useGetFolderQuery, useMoveFolderMutation} from "../redux/slice/folders/folderApiSlice";
import RenameFormFolder from "./formFolder/RenameFormFolder";
import addFolder from '../assets/img/add-folder.png';
import importFile from '../assets/img/import-file.png';
import AddFormFile from "./file/AddFormFile";
import {dataType, Item} from "../types/main";
import DeleteModal from "./deleteModal";
import ItemChildren from "./ItemChildren";
import BreadCrumbs from "./BreadCrumbs";

const FolderPanel: FC = () => {
    const dispatch = useAppDispatch();

    const [activeModal, setActiveModal] = useState<string>('');
    const [folderId, setFolderId] = useState<string>('');
    const [typeFile, setTypeFile] = useState<string>('');

    const {folder} = useAppSelector((state) => state.folder);
    const [moveFolderMutation] = useMoveFolderMutation();
    const {data, error, isLoading, refetch} = useGetFolderQuery<dataType>(folder.id);

    useEffect(() => {
        if (data?.data) dispatch(setFolder(data.data));
    }, [data]);


    const dragStartHandler = (folder: Item) => {
        setFolderId(folder.id);
    }

    const dragOverHandler = (e: React.DragEvent<HTMLSpanElement | HTMLDivElement>) => {
        e.preventDefault()
    }

    const dropHandler = async (e: React.DragEvent<HTMLSpanElement | HTMLDivElement>, folder: Item) => {
        e.preventDefault();
        const folderQuery = {
            'id': folderId,
            'parentId': folder.id
        }

        try {
            if (folderQuery.id !== folderQuery.parentId) {
                await moveFolderMutation(folderQuery).unwrap();
            }
        } catch (error) {
            console.log(error);
        }
        await refetch();
    }

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error</div>;

    return (
        <div className='mt-10 mx-16'>
            <div className='flex ml-5'>
                <div onClick={() => setActiveModal('addFolder')} className='mr-10 flex cursor-pointer'>
                    <span>Создать папку</span>
                    <img src={addFolder} alt="Создать папку" className='ml-2 w-6'/>
                </div>
                <div onClick={() => setActiveModal('addFile')} className='flex cursor-pointer'>
                    <span>Загрузить файл</span>
                    <img src={importFile} alt="Загрузить файл" className='ml-2 w-6'/>
                </div>
            </div>

            {activeModal === 'addFolder' && <AddFormFolder setActiveModal={setActiveModal}/>}
            {activeModal === 'addFile' && <AddFormFile setActiveModal={setActiveModal}/>}
            {activeModal === 'renameFolder' && <RenameFormFolder setActiveModal={setActiveModal} id={folderId}/>}
            {activeModal === 'deleteModal' &&
                <DeleteModal setActiveModal={setActiveModal} id={folderId} type={typeFile}/>}

            <BreadCrumbs refetch={refetch} folder={folder} dragOverHandler={dragOverHandler} dropHandler={dropHandler}/>

            <div className='mt-5 mx-10 flex flex-wrap'>
                {folder?.children.length
                    ? folder.children.map((el: Item) => (
                        <ItemChildren key={el.id} el={el} refetch={refetch} dragStartHandler={dragStartHandler} dragOverHandler={dragOverHandler}
                                      dropHandler={dropHandler} setFolderId={setFolderId}
                                      setTypeFile={setTypeFile} setActiveModal={setActiveModal}/>
                    ))
                    : <p>Нет существующих папок или файлов</p>
                }
            </div>
        </div>
    );
};

export default FolderPanel;
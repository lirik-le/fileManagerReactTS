import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import AddFormFolder from "./formFolder/AddFormFolder";
import {addFolderToHistory, deleteFolderFromHistory, setFolder, setNewFolder} from "../redux/slice/folders/folderSlice";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {useDeleteFolderMutation, useGetFolderQuery, useMoveFolderMutation} from "../redux/slice/folders/folderApiSlice";
import {SerializedError} from "@reduxjs/toolkit";
import RenameFormFolder from "./formFolder/RenameFormFolder";
import edit from '../assets/img/edit.png';
import deleteIcon from '../assets/img/delete.png';
import folderIcon from '../assets/img/folder.png';
import fileIcon from '../assets/img/file.png';
import arrow from '../assets/img/right-arrow.png';
import addFolder from '../assets/img/add-folder.png';
import importFile from '../assets/img/import-file.png';
import AddFormFile from "./file/AddFormFile";
import {Data} from "../types/main";
import DeleteModal from "./deleteModal";

type dataType = {
    data: {
        data?: Data
    },
    error: FetchBaseQueryError | SerializedError | undefined,
    isLoading: boolean
}

const FolderPanel: FC = () => {
    const dispatch = useAppDispatch();

    const [activeModal, setActiveModal] = useState<string>('');
    const [folderId, setFolderId] = useState<string>('');
    const [typeFile, setTypeFile] = useState<string>('');

    const {folder} = useAppSelector((state) => state.folder);
    const {historyFolders} = useAppSelector((state) => state.folder);
    const [moveFolderMutation] = useMoveFolderMutation();
    const {data, error, isLoading, refetch} = useGetFolderQuery<dataType>(folder.id);

    useEffect(() => {
        if (data?.data) dispatch(setFolder(data.data));
        console.log('useEffect')
    }, [data]);


    const switchFolder = async (id: string, name: string) => {
        dispatch(setNewFolder(id));
        dispatch(addFolderToHistory({id, name}))
        await refetch();
    };

    const switchBreadCrumbs = async (id: string, name: string) => {
        dispatch(setNewFolder(id));
        dispatch(deleteFolderFromHistory({id, name}))
        await refetch();
    };

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error</div>;

    const dragStartHandler = (e: any, folder: any) => {
        setFolderId(folder.id);
    }

    const dragOverHandler = (e: any) => {
        e.preventDefault()
    }

    const dropHandler = async (e: any, folder: any) => {
        e.preventDefault();
        const folderQuery = {
            'id': folderId,
            'parentId': folder.id
        }

        try {
            if (folderQuery.id !== folderQuery.parentId) {
                await moveFolderMutation(folderQuery).unwrap();
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
    }

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
            {activeModal === 'deleteModal' && <DeleteModal setActiveModal={setActiveModal} id={folderId} type={typeFile}/>}

            <div className='mt-10 ml-10 flex items-end'>
                <p className='text-2xl font-semibold mr-24'>{folder.name === 'root' ? 'Главная' : folder.name}</p>
                <p className='flex items-end'>{historyFolders.length > 1
                    && historyFolders.map((el, key) => (
                        <div className='flex items-end '>
                            <span key={key} onClick={() => switchBreadCrumbs(el.id, el.name)}
                                  className='text-base font-light cursor-pointer'>
                                {el.name}
                            </span>
                            {key !== historyFolders.length - 1 && <img src={arrow} alt="Стрелка" className='w-6 mx-2'/>}
                        </div>
                    ))
                }</p>
            </div>

            <div className='mt-5 mx-10 flex flex-wrap'>
                {folder?.children.length
                    ? folder.children.map((el: any) => (
                        <div
                            draggable={el.type === 'folder'}
                            onDragStart={(e) => el.type === 'folder' && dragStartHandler(e, el)}
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
                    ))
                    : <p>Нет существующих папок или файлов</p>
                }
            </div>
        </div>
    );
};

export default FolderPanel;
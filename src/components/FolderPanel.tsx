import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import AddFormFolder from "./formFolder/AddFormFolder";
import {addFolderToHistory, deleteFolderFromHistory, setFolder, setNewFolder} from "../redux/slice/folders/folderSlice";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {useDeleteFolderMutation, useGetFolderQuery} from "../redux/slice/folders/folderApiSlice";
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
import {useDeleteFileMutation} from "../redux/slice/files/filesApiSlice";

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
    const [renameFolderId, setRenameFolderId] = useState<string>('');

    const {folder} = useAppSelector((state) => state.folder);
    const {historyFolders} = useAppSelector((state) => state.folder);
    const [deleteFolderMutation] = useDeleteFolderMutation();
    const [deleteFileMutation] = useDeleteFileMutation();
    const {data, error, isLoading, refetch} = useGetFolderQuery<dataType>(folder.id);

    useEffect(() => {
        if (data?.data) dispatch(setFolder(data.data));
        console.log('useEffect')
    }, [data]);

    const handleDelete = async (id: string, type: string) => {
        try {
            type === 'folder'
                ? await deleteFolderMutation(id)
                : await deleteFileMutation(id);
            refetch();
        } catch (error) {
            console.error('Произошла ошибка', error);
        }
    };

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
            {activeModal === 'renameFolder' && <RenameFormFolder setActiveModal={setActiveModal} id={renameFolderId}/>}

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
                        <div onClick={() => el.type === 'folder'
                            && switchFolder(el.id, el.name)
                        } key={el.id}
                             className='w-1/5-no-m-3 p-4 m-3 rounded hover:bg-gray-200 transition ease-in border-gray-400 border-2'>
                            <p className='flex items-center mb-5'>
                                {el.type === 'folder'
                                    ? <>
                                        <img className='w-8 mx-2' src={folderIcon} alt="Папка"/>
                                        {el.name}
                                    </>
                                    : <>
                                        <img className='w-8 mx-2' src={fileIcon} alt="Папка"/>
                                        {el.file.name}
                                    </>}
                            </p>
                            <div className='flex justify-end'>
                                {el.type === 'folder'
                                    && <img src={edit} alt='Изменить' onClick={(e) => {
                                        e.stopPropagation();
                                        setRenameFolderId(el.id);
                                        setActiveModal('renameFolder');
                                    }} className='w-6 cursor-pointer'/>
                                }
                                <img src={deleteIcon} alt='Удалить' onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(el.id, el.type);
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
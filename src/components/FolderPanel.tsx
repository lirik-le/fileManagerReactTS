import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {useGetFolderQuery} from "../redux/slice/folders/folderApiSlice";
import AddFormFolder from "./AddFormFolder";

const FolderPanel: FC = () => {
    const dispatch = useAppDispatch();
    const [addFolderModal, setAddFolderModal] = useState<boolean>(false);
    const {folder} = useAppSelector((state) => state.folder);
    const token = useAppSelector((state) => state.auth.token);
    const { data, error, isLoading } = useGetFolderQuery('root');

    const GetFolder2 = () => {
        console.log(data)
    }

    useEffect(() => {
        GetFolder2();
    }, [])

    GetFolder2();

    return (
        <div>
            <button onClick={() => setAddFolderModal(true)}>Добавить папку</button>
            {addFolderModal && <AddFormFolder setAddFolderModal={setAddFolderModal}/>}
            {folder.children.length
                ? folder.children.map((el: any) => (
                    <p onClick={() => {}}>{el.name}</p>
                ))
                : <p>Нет существующих папок или файлов</p>
            }
        </div>
    );
};

export default FolderPanel;
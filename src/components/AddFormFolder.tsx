import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {useAddFolderMutation} from "../redux/slice/folders/folderApiSlice";
import {useAppSelector} from "../redux/store";

type Props = {
    setAddFolderModal: Dispatch<SetStateAction<boolean>>
}

const AddFormFolder: FC<Props> = ({setAddFolderModal}) => {
    const [name, setName] = useState('');
    const [addFolderMutation] = useAddFolderMutation();
    const id = useAppSelector(state => state.folder.folder.id);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const folder = {name, id};
        console.log(folder, 'folder')

        // try {
        //     const folder = {name, parentId: id};
        //     // const folder = await addFolderMutation({name, parentId: id}).unwrap();
        //     setName('');
        //
        //     console.log(folder, 'folder')
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const handleNameFolder = (e: any) => setName(e.target.value);

    return (
        <div className='scale-1 h-[100vh] w-[100vw] bg-gray-700/45 fixed top-0 left-0 flex items-center justify-center duration-50'>
            <div className='p-5 rounded-xl bg-white h-[200px] w-[400px]'>
                <button  onClick={() => setAddFolderModal(false)}>закрыть</button>
                <form action="">
                    <label>
                        Название папки:
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameFolder}
                            required/>
                    </label>
                    <button onClick={handleSubmit}>Добавить папку</button>
                </form>
            </div>
        </div>
    );
};

export default AddFormFolder;
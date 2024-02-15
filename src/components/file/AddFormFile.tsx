import React, {Dispatch, FC, SetStateAction} from 'react';
import close from "../../assets/img/close.png";
import {useAddFileMutation} from "../../redux/slice/files/filesApiSlice";
import {useAppSelector} from "../../redux/store";
import {useGetFolderQuery} from "../../redux/slice/folders/folderApiSlice";

type Props = {
    setActiveModal: Dispatch<SetStateAction<string>>
}
const AddFormFile: FC<Props> = ({setActiveModal}) => {
    const [file, setFile] = React.useState<File | null>(null);
    const folderId = useAppSelector(state => state.folder.folder.id);
    const [addFileMutation] = useAddFileMutation();
    const {refetch} = useGetFolderQuery(folderId);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: any) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData();

            formData.append('folderId', folderId);
            formData.append('file', file);

            await addFileMutation(formData);
            setActiveModal('');
            refetch();
        }
    };

    return (
        <div>
            <div
                className="flex flex-col items-center bg-gray-400/45 justify-center fixed top-0 left-0 h-screen w-screen pb-40">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 relative">
                    <img src={close} alt='Закрыть' onClick={() => setActiveModal('')}
                         className='w-3 h-auto absolute right-7 cursor-pointer'/>
                    <form className="flex flex-col" onSubmit={handleUpload}>
                        <p className='mb-5 text-xl'>Загрузка файла</p>
                        <input type='file' onChange={handleFileChange}
                               className="w-full bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"/>
                        <button type="submit"
                                className="button-class">Загрузить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFormFile;
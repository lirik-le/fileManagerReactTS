import React, {FC} from 'react';
import arrow from "../assets/img/right-arrow.png";
import {deleteFolderFromHistory, setNewFolder} from "../redux/slice/folders/folderSlice";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {Data} from "../types/main";

type Props = {
    refetch: any,
    folder: Data,
    dragOverHandler: (e: React.DragEvent<HTMLSpanElement>) => void,
    dropHandler: (e: React.DragEvent<HTMLSpanElement>, folder: any) => Promise<void>,
}

const BreadCrumbs: FC<Props> = ({refetch, folder, dragOverHandler, dropHandler}) => {
    const dispatch = useAppDispatch();
    const {historyFolders} = useAppSelector((state) => state.folder);

    const switchBreadCrumbs = async (id: string, name: string) => {
        dispatch(setNewFolder(id));
        dispatch(deleteFolderFromHistory({id, name}))
        await refetch();
    };

    return (
        <div className='mt-10 ml-10 flex items-end'>
            <p className='text-2xl font-semibold mr-24'>{folder.name === 'root' ? 'Главная' : folder.name}</p>
            <p className='flex items-end'>{historyFolders.length > 1
                && historyFolders.map((el, key) => (
                    <div className='flex items-end '>
                            <span
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e, el)}
                                key={key}
                                onClick={() => switchBreadCrumbs(el.id, el.name)}
                                className='text-base font-light cursor-pointer'
                            >
                                {el.name}
                            </span>
                        {key !== historyFolders.length - 1 && <img src={arrow} alt="Стрелка" className='w-6 mx-2'/>}
                    </div>
                ))
            }</p>
        </div>
    );
};

export default BreadCrumbs;
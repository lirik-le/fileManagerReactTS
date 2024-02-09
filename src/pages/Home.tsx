import React from 'react';
import {useAppSelector} from "../redux/store";
import FolderPanel from "../components/FolderPanel";
import Public from "../components/Public";

const Home = () => {
    const token = useAppSelector((state) => state.auth.token);

    return (
        <main>
            {token
                ? <FolderPanel/>
                : <Public/>
            }
        </main>
    );
};

export default Home;

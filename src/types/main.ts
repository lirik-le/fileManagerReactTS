import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export type Item = {
    id: string,
    name: string,
    file?: {
        name: string,
        filepath: string
    },
    type: string,
}

export type Data = {
    id: string,
    name: string,
    children: Item[]
}


export type dataType = {
    data: {
        data?: Data
    },
    error: FetchBaseQueryError | SerializedError | undefined,
    isLoading: boolean
}

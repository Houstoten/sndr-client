import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAuthState } from '../../../context/AuthContext/hooks/useAuthState'
import { PeerContext } from '../../../context/PeerContext/PeerContext'
import * as R from 'rambda'
import { DropZone } from '../../../atoms/DropZone'
import { useFileRequest } from '../../../context/PeerContext/hooks/useFileRequest'
import { usePersistance } from '../../../context/PersistanceContext/hooks/usePersistance'

const SendToUser = () => {
    const router = useRouter()
    const { id } = router.query
    const { userDetails: { id: myid } } = useAuthState()

    const db = usePersistance()

    const { requestFileAccept } = useFileRequest()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const variables = { input: { receiverid: id, ...R.pick(['name', 'size'], acceptedFiles[0]) } };

        requestFileAccept({ variables }).then(({ data: { requestFileAccept } }: any) => {

            const { id } = requestFileAccept

            db.table("files").add({ id, file: new Blob([acceptedFiles[0]], { type: acceptedFiles[0].type }) }, [id])
        })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return <DropZone getInputProps={getInputProps} getRootProps={getRootProps} />

    // return (
    //     <div {...getRootProps()}>
    //         <input {...getInputProps()} />
    //         {
    //             isDragActive ?
    //                 <p>Drop the files here ...</p> :
    //                 <p>Drag`n`drop some files here, or click to select files and send them to {id}</p>
    //         }
    //     </div>
    // )



}

export default SendToUser
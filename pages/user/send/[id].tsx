import { useRouter } from 'next/router'
import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAuthState } from '../../../context/AuthContext/hooks/useAuthState'
import { PeerContext } from '../../../context/PeerContext/PeerContext'
import * as R from 'rambda'
import { DropZone } from '../../../atoms/DropZone'

const SendToUser = () => {
    const router = useRouter()
    const { id } = router.query
    const { userDetails: { id: myid } } = useAuthState()

    const { peer } = useContext(PeerContext)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const connection = peer.connect(id, {
            metadata: {
                id: myid,
                files: R.map(R.pick(['name', 'type', 'size']), acceptedFiles)
            },
            reliable: true,
        });

        connection.on('open', () => {

            R.forEach((file: File) => connection.send(new Blob([file], {type: file.type})), acceptedFiles)
        })

        console.log('dropped some files!', acceptedFiles);
    }, [peer])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return <DropZone getInputProps={getInputProps} getRootProps={getRootProps}/>

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
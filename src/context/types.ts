export interface User {
    id: string,
    name: string,
    email: string,
    image: string,
    online?: boolean
}

export interface FileRequest {
    id: string,
    senderid: string,
    sender?: User,
    receiver?: User,
    receiverid: string,
    name: string,
    size: number,
    accepted: boolean,
    updatedat?: Date
}
import {

    type BinaryLike,
    type BinaryToTextEncoding,
    createHash,
    generateKeySync

} from "node:crypto"


export function sha256(data: BinaryLike, encoding: BinaryToTextEncoding = 'hex'): string {

    return createHash('sha256').update(data).digest(encoding)
}

export function md5(data: BinaryLike, encoding: BinaryToTextEncoding = 'hex'): string {

    return createHash('md5').update(data).digest(encoding)
}

export function md5binary(data: BinaryLike): Buffer {

    return createHash('md5').update(data).digest()
}

export function randomValueSync(max_length: number) {

    return generateKeySync('hmac', { length: 8*max_length })
        .export()
        .toString('base64')
        .replaceAll(/[^a-z0-9]/ig, '')
        .slice(0, max_length)
}

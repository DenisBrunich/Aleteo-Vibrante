export function isBrowser() {

    return typeof window === 'object'
        && typeof window.document === 'object'
}

export async function sha256(data: BufferSource): Promise<string> {

      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = new Uint8Array(hashBuffer)

      return Array.from(hashArray)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toLowerCase()
}

export function message(err: any): string {

    try {

        if (err) {

            if (typeof err === 'string') {

                return err
            }

            if (typeof err === 'object') {

                if (err instanceof Error) {

                    if (typeof err.message === 'string') {

                        return err.message
                    }
                }
            }

            return typeof err === 'object' ? JSON.stringify(err) : `${err}`
        }

        return ''
    }

    catch {

        return ''
    }
}

export interface ICache<T> {

    exp : number
    data: T|undefined
}

export function Cache<T>(ttl: number = 0): ICache<T> {

    let exp: number = 0
    let data: T | undefined = undefined

    return Object.seal(Object.defineProperties({}, {

        data: {

            enumerable: true,
            configurable: false,

            get: () => {

                if (data
                    && ttl > 0
                    && exp < Date.now()) {

                    data = undefined
                }

                return data
            },

            set: (value: T) => {

                exp = Date.now() + (ttl||0)
                data = value
                return data
            }
        },

        exp: {

            enumerable  : true,
            configurable: false,
            get: () => exp
        }

    }) as ICache<T>)
}

export type Hasher = (data: any) => string | Promise<string>

export interface SafeJsonResult {

    ok      : boolean
    json    : any
    error   : Error | null
}

export interface SafeJsonInput {

    input           : string|Request|undefined|null
    max_size_bytes  : number
    use_hash_check ?: false | { header?: string, hasher?: Hasher }
}

export async function safeJson(opt: SafeJsonInput): Promise<SafeJsonResult> {

    const { input, max_size_bytes, use_hash_check={}} = opt
    const { header: hash_header, hasher = sha256 } =
        use_hash_check === false
        ? { header: '' }
        : { header: 'X-Amz-Content-SHA256', ...use_hash_check }

    try {

        if ( ! input
            || typeof hasher !== 'function'
            || typeof hash_header  !== 'string'
            || typeof max_size_bytes !== 'number'
            ||        max_size_bytes < 1) {

            return failure('Bad input request')
        }

        if (typeof input === 'string') {

            if (input.length > max_size_bytes) {

                return failure('Input sring is too long')
            }

            return {

                ok      : true,
                json    : JSON.parse(input),
                error   : null
            }
        }

        if (!(input instanceof Request)) {

            return failure('Bad input request')
        }

        const content_length = input.headers.get('Content-Length')

        if (!content_length) {

            return failure('Request misses Content-Length header')
        }

        const expected_size = parseInt(content_length)

        if (isNaN(expected_size) || expected_size < 1) {

            return failure('Content-Length header has invalid value')
        }

        if (expected_size > max_size_bytes) {

            return failure('Content-Length exceeds allowed limit')
        }

        if (hash_header) {

            if (!input.headers.get(hash_header)) {

                return failure(`Data consistency header "${hash_header}" is missing`)
            }
        }

        const reader = input.body?.getReader()

        if (!reader) {

            return failure('Failure to obtain body reader')
        }

        let offset = 0
        const data: Uint8Array<ArrayBuffer> = new Uint8Array(expected_size)

        while (true) {

            const { done, value } = await reader.read()

            if (done) {

                break
            }

            else if (offset + value.length > expected_size) {

                await reader.cancel()
                return failure('Request rejected for body size exceeds announced content length')
            }

            else {

                data.set(value, offset)
                offset += value.length
            }
        }

        if (offset < 1) {

            return failure('Empty body')
        }

        if (expected_size === offset) {

            if (hash_header) {

                const hash = input.headers.get(hash_header)?.toLowerCase()

                if (!hash || hash !== (await hasher(data)).toLowerCase()) {

                    return failure('Failure to verify data consistency')
                }
            }

            const text = new TextDecoder().decode(data)
            const json = JSON.parse(text)

            return {

                ok      : true,
                json    : json,
                error   : null
            }
        }

        else {

            return failure('Content-Length header has invalid value')
        }
    }

    catch (err) {

        return failure(err)
    }

    function failure(err: string | Error | unknown): SafeJsonResult {

        if (typeof err === 'string') {

            return {

                ok      : false,
                json    : undefined,
                error   : new Error(`SafeJSON error: ${err || 'Unknown error'}`)
            }
        }

        if (typeof err === 'object' && err instanceof Error) {

            return {

                ok      : false,
                json    : undefined,
                error   : err
            }
        }

        return {

            ok      : false,
            json    : undefined,
            error   : new Error(`SafeJSON error: ${ err ? String(err) : 'Unknown Error' }`)
        }
    }
}

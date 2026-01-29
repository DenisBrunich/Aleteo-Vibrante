import type * as SDK from "@tma.js/sdk"
import type { SerializeOptions } from "cookie"


export type { InitData as InitDataType } from "@tma.js/sdk"

export type UserID = SDK.User['id']
export type SessionID = `${UserID}:${string}`

export interface User extends SDK.User {

    name: string
}

export type SessionExtension = Record<string, any>

export type Session<EX extends SessionExtension = {}> = User & EX & {

    start_param?: string
}

export interface SessionValidationState<SESSION = User> {

    session ?: SESSION
    promise ?: Promise<SESSION|undefined>
    loading ?: boolean
    error   ?: any
}

export interface AuthRequest<EX extends SessionExtension = {}> {

    expectedUser    : number
    authData        : string
    initData?       : EX
}

export interface Authenticator<STORE, EX extends SessionExtension = {}> {

    login(store: STORE, request: AuthRequest<EX>): Promise<Session<EX>|undefined>
    authenticate(store: STORE): Promise<Session<EX>|undefined>
}

export interface CookieProvider {

    get(name: string): string | undefined
    set(name: string, value: string, options: SerializeOptions): void
}

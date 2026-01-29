const prefix = 'aleteo'

export default {

    aws: {
        region: 'eu-west-1' as const,
    },

    telegram: {
        session: {
            delay_tolerance : 300,
            hash: {
                algorithm   : "sha256",
                key         : "WebAppData",
            }
        },
    },

    session: {

        ttl     : 7_776_000,

        cookie  : {
            name    : 'SESSION',
            path    : '/',
            domain  : '.cloudfront.net',
            max_age : 14_400,
            keys_ttl: 12*3600_000
        },

        max_payload_size    : 1024*1024,
        hash_header_name    : 'X-Amz-Content-SHA256',
    },

    artifacts: {

        params: {
            cache_ttl       : 300,
            bot             : `/${prefix}/bot`,
            deployment      : `/${prefix}/deployment`,
            webhook         : `/${prefix}/webhook`,
            cookies         : `/${prefix}/cookies`,
        },

        lambda: {
            gui: {
                basepath    : '/app',
                port        : 7000,
            },
        },

        tables: {

            config: {
                name: `${prefix}-config`,
                pk  : { name: "tenant" },
                sk  : { name: "id" }
            },

            users: {
                name: `${prefix}-users`,
                pk  : { name: "id" },
                sk  : { name: "order", type: "N" }
            },

            sessions: {
                name: `${prefix}-sessions`,
                pk  : { name: "user"    },
                sk  : { name: "session" },
                ttl : "ttl",
            },

        } as const
    }

} as const

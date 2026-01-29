import type { Config } from "@react-router/dev/config";

export default {

    ssr         : true,
    prerender   : ["/"],
    basename    : '/app',
    future      : {

        v8_splitRouteModules: "enforce"
    }

} satisfies Config;

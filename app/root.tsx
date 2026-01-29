import type { Route     } from "./+types/root"
import { useTelegram    } from "~/telegram"
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import "./app.css"


export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}


export default function App() {
    const tg = useTelegram()
    return <Outlet context={ tg } />
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {

    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-6xl font-light text-gold-400 mb-4">{message}</h1>
                <p className="text-xl text-[#a09080]">{details}</p>
                {stack && (
                    <pre className="mt-8 p-4 bg-[#0d0d0d] rounded-lg overflow-x-auto text-left text-sm text-gray-400">
                        <code>{stack}</code>
                    </pre>
                )}
            </div>
        </main>
    )
}

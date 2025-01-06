import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State{
    token: string;
}

interface Actions {
    setToken: (token: string) => void;
}

export const tokenStore = create(
    persist<State & Actions>(
        (set) => ({
            token:'',
            setToken: (token: string) =>
                set(() => ({
                    token
                }))
        }),
        {
            name: 'token'
        }
    )
)
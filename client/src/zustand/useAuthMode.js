import {create} from "zustand";

const useAuthMode = create((set) => ({
    mode: "signIn", // other value should be signUp and otp

    setMode: (mode) => set({mode})
}))

export default useAuthMode
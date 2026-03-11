import {create} from "zustand";

const useAuthMode = create((set) => ({
    mode: "signIn", // other value should be signUp and otp
    email: "",
    open: false,  // for auth dialog box

    setMode: (mode) => set({mode}),
    setEmail: (email) => set({email}),
    setOpen: (open) => set({open})
}))

export default useAuthMode
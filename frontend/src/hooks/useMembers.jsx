import { useContext } from "react";
import { MembersContenxt } from "../contexts/MembersContext";


export default function useMembers() {
    const context = useContext(MembersContenxt)

    if(!context) throw new Error("out of MembersContenxt");
    
    return context
}
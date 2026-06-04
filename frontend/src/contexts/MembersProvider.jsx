import { useEffect, useState } from "react";
import { createMember, deleteMemberById, fetchAllMembers, fetchMemberById, fetchStats, updateMember, updateMemberStatus } from "../api/memberApi";
import { MembersContenxt } from "./MembersContext";

function MembersProvider({children}) {
    const[members, setMembers] = useState([])
    const[stats, setStats] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchAllMembers()
        .then((data) => setMembers(data))
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false))
    }, [])


    useEffect(() => {
        loadStats();
    }, [])

    function addMember(data) {
        return createMember(data)
        .then(() => setMembers((prev) => [...prev, data]))
        .catch((err) => console.error(err))
    }

    async function getMemberById(id) {
        return await fetchMemberById(id);
    }

    function changeMember(id, data) {
        return updateMember(id, data)
        .then(() => fetchAllMembers())
        .then((data) => setMembers(data))
        .catch((err) => console.error(err))
    }

    function changeMemberStatus(id, active) {
        updateMemberStatus(id, active)
        .then(() => fetchAllMembers())
        .then((data) => setMembers(data))
        .catch((err) => console.error(err))
    }

    function deleteMember(id){
        setIsDeleting(true);
        deleteMemberById(id)
        .then(() => setMembers((prev) => prev.filter((c) => c.id !== id)))
        .catch((err) => console.error(err))
    }

    function loadStats() {
        fetchStats()
        .then((data) => setStats(data))
        .catch((err) => console.error(err))
    }

    function loadMembers(active) {
        fetchAllMembers(active)
        .then((data) => setMembers(data))
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false))
    }
    
    return ( 
        <MembersContenxt.Provider
            value={{members, stats, isLoading, isDeleting, addMember, getMemberById, changeMember, changeMemberStatus, deleteMember, loadStats,  loadMembers}}
        >
            {children}
        </MembersContenxt.Provider>
     );
}

export default MembersProvider;
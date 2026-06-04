import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/members';


export async function fetchAllMembers(active) {
    if (active !== undefined && active !== null) {
        const resp = await axios.get(BASE_URL, { params: { active } });
        return resp.data
    }

    const resp = await axios.get(BASE_URL);

    return resp.data
}

export async function fetchMemberById(id) {

    const resp = await axios.get(`${BASE_URL}/${id}`);

    return resp.data
}

export async function createMember(data) {

    const resp = await axios.post(BASE_URL, data);

    return resp.data
}

export async function updateMember(id, data) {

    const resp = await axios.put(`${BASE_URL}/${id}/edit`, data);

    return resp.data
}

export async function updateMemberStatus(id, active) {

    const resp = await axios.patch(`${BASE_URL}/${id}/status`, {active});

    return resp.data
}


export async function deleteMemberById(id) {

    const resp = await axios.delete(`${BASE_URL}/${id}`);

    return resp.data
}

export async function fetchStats() {

    const resp = await axios.get(`${BASE_URL}/stats`);

    return resp.data
}
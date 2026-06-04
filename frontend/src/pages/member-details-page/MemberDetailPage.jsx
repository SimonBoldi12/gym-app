import { useNavigate, useParams } from "react-router-dom";
import useMembers from "../../hooks/useMembers";
import style from "./MemberDetailPage.module.css"
import { Button, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

function MemberDetailPage() {
    const { isLoading, getMemberById } = useMembers()
    const navigate = useNavigate()
    const { id } = useParams()
    const [formData, setFormData] = useState({
            name: "",
            email: "",
            membershipType: "",
            monthlyFee: "",
            joinDate: "",
            active: true
        });

    useEffect(() => {
        getMemberById(id)
        .then((data) => setFormData(data))
        .catch((err) => console.error(err))
    }, [id]);

    

    return ( 
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>MembershipType</TableCell>
                            <TableCell>monthlyFee</TableCell>
                            <TableCell>joinDate</TableCell>
                            <TableCell>Active</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading && (
                            <>
                                <TableRow><TableCell colSpan={5}><Skeleton variant="rounded" /></TableCell></TableRow>
                                <TableRow><TableCell colSpan={5}><Skeleton variant="rounded" /></TableCell></TableRow>
                                <TableRow><TableCell colSpan={5}><Skeleton variant="rounded" /></TableCell></TableRow>
                            </>
                        )}
                            <TableRow>
                                <TableCell>{formData.id}</TableCell>
                                <TableCell>{formData.name}</TableCell>
                                <TableCell>{formData.email}</TableCell>
                                <TableCell>{formData.membershipType}</TableCell>
                                <TableCell>{formData.monthlyFee}</TableCell>
                                <TableCell>{formData.joinDate}</TableCell>
                                <TableCell>{formData.active ? "✅" : "❌"}</TableCell>
                                <TableCell><Button onClick={() => navigate(`/members/${formData.id}/edit`)}>Szerkesztés</Button></TableCell>
                                <TableCell><Button onClick={() => navigate(`/`)}>Vissza</Button></TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
        </TableContainer>

     );
}

export default MemberDetailPage;
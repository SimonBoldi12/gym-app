import style from "./MemberListPage.module.css";
import { useEffect, useState } from "react";
import {
    Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import LoopIcon from '@mui/icons-material/Loop';
import useMembers from "../../hooks/useMembers";
import { useNavigate } from "react-router-dom";

function MemberListPage() {
  const { members, isLoading, loadMembers, deleteMember, isDeleting, changeMemberStatus } = useMembers();
  const [onlyActive, setOnlyActive] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    loadMembers(onlyActive ? true : undefined);
    }, [onlyActive]);


    function handleDelete(id){
        if(window.confirm("Biztos hogy torli?")){
            deleteMember(id)
        }
        return
    }

  return (
    <section>
    <h2>MemberListPage</h2>
    <Stack 
    spacing={2} 
    direction={"row"} 
    sx={{ justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
        <Button variant="contained" onClick={() => navigate("/members/new")}>Új tag felvétele</Button>
        <Button variant="outlined" onClick={() => navigate("/stats")}>Statisztika</Button>
      <FormControlLabel
        control={
          <Checkbox
            checked={onlyActive}
            onChange={(e) => setOnlyActive(e.target.checked)}
          />
        }
        label="Csak aktív tagok"
      />
    </Stack>

      <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>MembershipType</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell colSpan={4} align="center">Műveletek</TableCell>
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
                        {members.length < 1 && !isLoading && (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <h2>Members is empty!</h2>
                                </TableCell>
                            </TableRow>
                        )}
                        {members.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>{member.id}</TableCell>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>{member.membershipType}</TableCell>
                                <TableCell>{member.active ? "✅" : "❌"}</TableCell>
                                <TableCell><Button startIcon={<InfoIcon />} onClick={() => navigate(`/members/${member.id}`)}>Részletek</Button></TableCell>
                                <TableCell><Button startIcon={<EditIcon />} onClick={() => navigate(`/members/${member.id}/edit`)}>Szerkesztés</Button></TableCell>
                                <TableCell><Button startIcon={<DeleteIcon />} disabled={isDeleting} onClick={() => handleDelete(member.id)}>Törlés</Button></TableCell>
                                <TableCell><Button startIcon={<LoopIcon />} onClick={() => changeMemberStatus(member.id, !member.active)}>Aktivál/Deaktivál</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </TableContainer>
    </section>
  );
}

export default MemberListPage;

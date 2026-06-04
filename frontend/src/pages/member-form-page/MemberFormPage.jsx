import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button, Checkbox, FormControl, FormControlLabel,
    InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import useMembers from "../../hooks/useMembers";
import style from "./MemberFormPage.module.css"

function MemberFormPage() {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const { addMember, changeMember, getMemberById } = useMembers();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        membershipType: "BASIC",
        monthlyFee: "",
        joinDate: "",
        active: true
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            getMemberById(id).then((data) => {
                setFormData(data);
            });
        }
    }, [id]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    function validate() {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "A név nem lehet üres!";
        if (!formData.email.trim()) newErrors.email = "Az email nem lehet üres!";
        return newErrors;
    }

    function handleSubmit() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const dataToSend = {
        ...formData,
        monthlyFee: parseFloat(formData.monthlyFee), 
    };

    if (isEditMode) {
        changeMember(id, dataToSend).then(() => navigate("/"));
    } else {
        addMember(dataToSend).then(() => navigate("/"));
    }
}

    return (
        <section className={style.formSection}>
            <h2>{isEditMode ? "Tag szerkesztése" : "Új tag felvétele"}</h2>

            <TextField
                label="Név"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                margin="normal"
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Membership Type</InputLabel>
                <Select
                    name="membershipType"
                    value={formData.membershipType}
                    onChange={handleChange}
                    label="Membership Type"
                >
                    <MenuItem value="BASIC">Basic</MenuItem>
                    <MenuItem value="STANDARD">Standard</MenuItem>
                    <MenuItem value="PREMIUM">Premium</MenuItem>
                    <MenuItem value="STUDENT">Student</MenuItem>
                </Select>
            </FormControl>


            <TextField
                label="Havi díj"
                name="monthlyFee"
                type="number"
                value={formData.monthlyFee}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            <InputLabel sx={{ textAlign: "left" }}>Belépés dátuma</InputLabel>
            <TextField
                name="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                className={style.dateInput}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                    />
                }
                label="Aktív tag"
            />

            <br />

            <Button variant="contained" onClick={handleSubmit}>
                {isEditMode ? "Mentés" : "Létrehozás"}
            </Button>

            <Button onClick={() => navigate("/")}>
                Vissza
            </Button>
        </section>
    );
}

export default MemberFormPage;
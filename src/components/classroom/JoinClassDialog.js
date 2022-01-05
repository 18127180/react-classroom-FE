import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import ClassProvider from "../../contexts/ClassProvider";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const validationSchema = yup.object({
    code: yup.string("Enter code to join class").required("Class code is required"),
});

export default function JoinClassDialog({ open, handleClose }) {
    const { classState, loading } = React.useContext(ClassProvider.context);
    const [classes, setClasses] = classState;
    const [error, setError] = React.useState("");
    const access_token = localStorage.getItem("access_token");
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: ""
        },
        isInitialValid: false,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios
                .post(
                    process.env.REACT_APP_API_URL + "/classroom/join-by-code",
                    {
                        invite_code: values.code,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + access_token,
                        },
                    }
                )
                .then((res) => {
                    // console.log(res.data);
                    if (res.status === 200) {
                        if (res.data.status === "SUCCESS") {
                            navigate(res.data.path);
                            handleClose();
                        } else {
                            setError(res.data.msg);
                            const time = setTimeout(() => {
                                setError("");
                            }, 3000);
                            return () => {
                                clearTimeout(time);
                            };
                        }
                    } else alert("Something's wrong. Please try again later");
                    formik.resetForm();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth="true"
            >
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">Join class</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            id="code"
                            name="code"
                            label="Class code (required)"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                        />
                        <Box sx={{ color: 'red' }}>{error}</Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ color: "#000" }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={!formik.isValid}
                        >
                            Join
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

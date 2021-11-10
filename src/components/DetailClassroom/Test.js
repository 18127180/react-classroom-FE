import React from "react";
import Grid from "@mui/material/Grid";

// const Test = () => {
//     return (
//         <div>
//             123
//         </div>
//     );
// };

const templates = {
    template1: {
        items: [1, 2]
    },
    template2: {
        items: [2, 3, 4]
    },
};

const Test = () => (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
    >

        <Grid item xs={3}>
        </Grid>

    </Grid>
);

export default Test;

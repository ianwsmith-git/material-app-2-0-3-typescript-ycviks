import { Table, TableCell, TableHead, TableRow, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const StyledTable = withStyles((theme : Theme) => ({

}))(Table);

export const StyledTableCell = withStyles((theme: Theme) => ({
    head: {
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.common.black,
        fontWeight: 600
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);



export const StyledTableRow = withStyles((theme : Theme) => ({
    root: {
        padding: "none",
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },

    },
}))(TableRow);



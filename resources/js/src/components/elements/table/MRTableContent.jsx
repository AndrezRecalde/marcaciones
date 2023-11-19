import { MaterialReactTable } from "material-react-table";
import classes from "./TableModule/MRTableContent.module.css";

export const MRTableContent = ({ table }) => {
    return (
        <div className={classes.wrapper}>
            <MaterialReactTable table={table} />
        </div>
    );
};

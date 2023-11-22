import { TitleSection } from "../../../components";
import { LinksGroup, lFuncionarioTTHH, lFuncionarios } from "../../../layouts";

import classes from "./NavbarModule/AppNavbar.module.css";

export const AppNavbar = () => {
    const srv_user = JSON.parse(localStorage.getItem("user_srvm"));
    const mockdata =  srv_user.cdgo_usrio === 1303 ? lFuncionarioTTHH : lFuncionarios;

    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <div>
            <div className={classes.header}>
                <TitleSection
                    title={srv_user.departamento}
                    fw={700}
                    fz={12}
                />
            </div>
            <div className={classes.linksInner}>{links}</div>
        </div>
    );
};

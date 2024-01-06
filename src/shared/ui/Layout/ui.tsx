import Container from "../Container";
import { Outlet } from "react-router-dom";
import { Props } from "./model/interfaces";

const Layout = ({ headerSlot, announcementSlot, footerSlot }: Props) => {
    return (
        <Container>
            <div>
                {announcementSlot && announcementSlot}
                {headerSlot}
            </div>
            <Outlet />
            {footerSlot && footerSlot}
        </Container>
    );
};

export default Layout;
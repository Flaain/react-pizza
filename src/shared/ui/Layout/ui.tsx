import { Outlet } from "react-router-dom";
import Container from "../Container";
import { Props } from "./interfaces";

const Layout: React.FC<Props> = ({ headerSlot, announcementSlot, footerSlot }) => {
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
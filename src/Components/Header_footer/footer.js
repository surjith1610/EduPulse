import React from "react";
import { UniLogo } from "../Utils/tools";
const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
            <UniLogo Link={true}
                         LinkTo={'/'}
                         width ="70px"
                         height="70px"
            />
            </div>
            <div className="footer_descl">
                Teach Digital Lab 2023.All Rights Reserved
            </div>
        </footer>
    )
}

export default Footer;
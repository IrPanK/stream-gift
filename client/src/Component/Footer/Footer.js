import React from "react";
import { SiInstagram, SiYoutube } from "react-icons/si";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-contact-box">
                <div className="footer-email-box">
                    <p className="footer-bold ">Contact Me</p>
                    <div
                        onClick={() =>
                            window.open(
                                "mailto:irfannkamill@gmail.com",
                                "_blank"
                            )
                        }
                        className="footer-email"
                    >
                        irfannkamill@gmail.com
                    </div>
                </div>
                <div>
                    <p className="footer-bold">Social Media</p>
                    <div className="footer-icon-box">
                        <SiInstagram
                            className="footer-icon"
                            onClick={() =>
                                window.open(
                                    "https://www.instagram.com/irpantech/",
                                    "_blank"
                                )
                            }
                        />
                        <SiYoutube
                            className="footer-icon"
                            onClick={() =>
                                window.open(
                                    "https://www.youtube.com/@irpantech1226",
                                    "_blank"
                                )
                            }
                        />
                    </div>
                </div>
            </div>
            <div>
                <p>made with &#10084; by Irfan Kamil</p>
            </div>
        </div>
    );
};

export default Footer;

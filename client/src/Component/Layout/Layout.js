import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";

import "./Layout.css";

const Layout = ({ content }) => {
    return (
        <div>
            <Nav />
            <h1 className="layout-content">{content}</h1>
            <div className="layout-footer">
                <Footer />
            </div>
        </div>
    );
};

export default Layout;

import Nav from "../Nav/Nav";

const Layout = ({ content }) => {
    return (
        <div>
            <Nav />
            <h1>{content}</h1>
        </div>
    );
};

export default Layout;

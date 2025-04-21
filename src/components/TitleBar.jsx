import "./TitleBar.scss";

const TitleBar = ({ children }) => {
    return (
        <div className="header-controls">
            {children}
        </div>
    );
};

export default TitleBar;
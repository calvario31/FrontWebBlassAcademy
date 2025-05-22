import "./TitleBar.scss";

const TitleBar: React.FC<any> = ({ title }) => {
    return (
        <div className="header-controls">
            <h2 className="blass-title">{title}</h2>
        </div>
    );
};

export default TitleBar;
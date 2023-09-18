import "./opacityLoader.scss";

const OpacityLoader = () => {
    return (
        <div className="opacity-loader">
            <div className="opacity-loader-slider">
                <div className="spinner-sector__circle"></div>
                <div className="spinner-sector__line spinner-sector__line--first"></div>
                <div className="spinner-sector__circle"></div>
                <div className="spinner-sector__line spinner-sector__line--second"></div>
                <div className="spinner-sector__circle"></div>
            </div>
        </div>
    );
};

export default OpacityLoader;

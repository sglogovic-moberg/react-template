import "./blurLoader.scss";

const BlurLoader = () => {
    return (
        <div className="blur-loader">
            <div className="blur-loader-component">
                <div className="blur-loader-component-slider">
                    <div className="spinner-sector__circle"></div>
                    <div className="spinner-sector__line spinner-sector__line--first"></div>
                    <div className="spinner-sector__circle"></div>
                    <div className="spinner-sector__line spinner-sector__line--second"></div>
                    <div className="spinner-sector__circle"></div>
                </div>
            </div>
        </div>
    );
};

export default BlurLoader;

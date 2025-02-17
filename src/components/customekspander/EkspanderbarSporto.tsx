export function EkspanderbarSporto() {
    return (
        <section aria-label="Demo med custom styling" className="navds-expansioncard navds-expansioncard--medium">
            <div className="navds-expansioncard__header" data-open="false">
                <div className="navds-expansioncard__header-content">
                    <h3 className="navds-expansioncard__title navds-expansioncard__title--medium navds-heading navds-heading--medium">
                        Generelle bestemmelser
                    </h3>
                </div>
                <button className="navds-expansioncard__header-button" type="button" aria-expanded="false">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="none"
                        viewBox="0 0 24 24"
                        focusable="false"
                        role="img"
                        aria-labelledby="title-R2avfaunnl7"
                        className="navds-expansioncard__header-chevron"
                    >
                        <title id="title-R2avfaunnl7">Vis mer</title>
                        <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M5.97 9.47a.75.75 0 0 1 1.06 0L12 14.44l4.97-4.97a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 0 1 0-1.06"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
            <div
                aria-hidden="true"
                data-open="false"
                className="navds-expansioncard__content navds-expansioncard__content--closed navds-body-long navds-body-long--medium"
            >
                <div className="navds-expansioncard__content-inner"></div>
            </div>
        </section>
    )
}

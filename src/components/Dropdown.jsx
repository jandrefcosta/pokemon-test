import { useTranslation } from "react-i18next";


const Dropdown = ({ options, multiple, onChange, value }) => {

    const { t } = useTranslation();

    return (
        <div className="dropdown__container">
            {/* <img src={chevron} className="dropdown__icon" alt="Chevron" /> */}
            <select className="dropdown" name="types" id="types" multiple={multiple} size="2" onChange={onChange} defaultValue={value}>
                <option className="dropdown__option" value="">
                    Selecione o(s) tipo(s)
                </option>
                {options && options.map((option, index) => (
                    <option className="dropdown__option" value={option.value} key={index}>
                        {t(option.text)}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default Dropdown;

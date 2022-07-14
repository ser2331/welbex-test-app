import React from "react";
import Types from "../types";

import './filter-menu.css';

const { colsTypes, paramsTypes, paramsTypesMap } = Types;

const FilterMenu = ({ onReset, handleChangeCol,
                        handleChangeParams, handleChangeText,
                        text, getInputType, isName}) => {

    return (
        <div className="FilterMenu">
            <form>
                <select className="cols" onChange={handleChangeCol}>
                    {colsTypes.map((i) => (<option key={i.id} value={i.type}>{i.name}</option>))}
                </select>

                <select className="params" onChange={handleChangeParams}>
                    {isName ? (
                        paramsTypes.filter((t) => (
                            (t.type !== paramsTypesMap.get('more').type) && (t.type !== paramsTypesMap.get('less').type))
                        )
                            .map((i) => (<option key={i.id} value={i.type}>{i.name}</option>))
                        ) : (
                            paramsTypes.map((i) => (<option key={i.id} value={i.type}>{i.name}</option>))
                        )
                    }
                </select>

                <input
                    className="input"
                    type={getInputType()}
                    value={text}
                    onChange={handleChangeText}
                    placeholder="Введите текст"
                />
            </form>
            <button className="submit-btn" onClick={onReset}>
                reset
            </button>
        </div>
    );
};

export default FilterMenu;

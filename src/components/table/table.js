import React from "react";
import Types from "../types";
import vectorDown from '../../assets/images/vector-down.png';
import vectorUp from '../../assets/images/vector-up.png';

import './table.css';

const { colsTypes, colsTypesMap } = Types;

const Table = ({ data, setSortType, sortType, isReverse, setRevers }) => {

    const renderTable = () => (
        <table className="table-content" >
            <thead>
            <tr>
                {colsTypes.map((i) => {
                    const isData = i.type === colsTypesMap.get('date').type;
                    return (
                        isData ? (
                            <th key={i.id} >{i.name}</th>
                        ) : (
                            <th
                                style={{cursor: "pointer"}}
                                key={i.id}
                                onClick={() => {
                                    setSortType(i.type);
                                    setRevers(!isReverse);
                                }}
                            >
                                <div className="cell-content">
                                    {i.name}
                                    <img className="vector" src={(sortType === i.type) && isReverse ? vectorUp : vectorDown} alt="vector"/>
                                </div>
                            </th>
                        )
                    )
                })}
            </tr>
            </thead>

            <tbody>

            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.distance}</td>
                </tr>
            ))}

            </tbody>
        </table>
    );

    return (
        <div className="Table">
            {data.length ? renderTable() : <div className="empty-data">Данные отсутствуют</div>}
        </div>
    );
};

export default Table;

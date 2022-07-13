import React, {useEffect, useState} from "react";
import axios from 'axios';
import Types from "../types";
import Table from "../table";
import FilterMenu from "../filter-menu";
import Pagination from "../pagination";

import './app.css';

const { colsTypesMap, paramsTypesMap } = Types;

const App = () => {
    const baseApi = 'https://welbex-test-app.herokuapp.com/api/list';

    const [data, setData] = useState([]);

    const [col, setCol] = useState(colsTypesMap.get('date').type);
    const [params, setParams] = useState(paramsTypesMap.get('equals').type);
    const [text, setText] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState('');
    const [isReverse, setRevers] = useState(false);

    useEffect(() => {
        axios
            .get(baseApi)
            .then(res => setData(res.data));
    }, []);

    const isEquals = params === paramsTypesMap.get('equals').type;
    const isContains = params === paramsTypesMap.get('contains').type;
    const isMore = params === paramsTypesMap.get('more').type;
    const isLess = params === paramsTypesMap.get('less').type;

    const isDate = col === colsTypesMap.get('date').type;
    const isName = col === colsTypesMap.get('name').type;

    const pageSize = 8;

    const handleChangeCol = (e) => {
        setCol(e.target.value);
    };
    const handleChangeParams = (e) => {
        setParams(e.target.value);
    };
    const handleChangeText = (e) => {
        setText(e.target.value);
    };

    const getVisibleItems = () => {
        if (isEquals) {
            const newArr = data.filter((i) => i[col].toString() === text.toString());
            if (newArr.length > 0) {
                return newArr;
            } else return data;
        }

        if (isContains) {
            return data.filter((item) => item[col].toString().toLowerCase().indexOf(text.toLowerCase()) > -1);
        }

        if (isMore) {
            if (isDate) {
                return data.filter((item) => new Date(item[col]) > new Date(text));
            } else return data.filter((i) => Number(i[col]) > Number(text));
        }

        if (isLess) {
            if (isDate) {
                return data.filter((item) => new Date(item[col]) < new Date(text));
            } else return data.filter((i) => Number(i[col]) < Number(text));
        }

        return data;
    };

    const onReset = () => {
        setText('');
    };

    const getInputType = () => {
        if (isName || isDate) {
            return 'string';
        } else return 'number'
    };

    const sorting = (arr, type) => {
        if (type) {
            if (isReverse) {
                return arr.sort((a, b) => a[type].toLowerCase().localeCompare(b[type].toLowerCase())).reverse();
            } else return arr.sort((a, b) => a[type].toLowerCase().localeCompare(b[type].toLowerCase()));
        } else return arr;
    };

    const formatData = text.length > 0 ? sorting(getVisibleItems(), sortType) : sorting(data, sortType);

    const visibleData = formatData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        if (visibleData?.length === 0) {
            setCurrentPage(1);
        }
    }, [visibleData]);

    return (
        <div className="App">
            <FilterMenu
                handleChangeCol={handleChangeCol}
                handleChangeParams={handleChangeParams}
                handleChangeText={handleChangeText}
                onReset={onReset}
                text={text}
                getInputType={getInputType}
                isName={isName}
            />

            <Table
                setSortType={setSortType}
                sortType={sortType}
                setRevers={setRevers}
                isReverse={isReverse}
                data={visibleData}
            />

            <Pagination
                totalCount={formatData.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
            />
        </div>
    );
};

export default App;

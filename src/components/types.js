export default class Types {
    static paramsTypes = [
        { id: 0, key: 'equals', type: 'equals', name: 'Равно' },
        { id: 1, key: 'contains', type: 'contains', name: 'Содержит' },
        { id: 2, key: 'more', type: 'more', name: 'Больше' },
        { id: 3, key: 'less', type: 'less', name: 'Меньше' },
    ];

    static paramsTypesMap = Types.paramsTypes.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static colsTypes = [
        { id: 0, key: 'date', type: 'date', name: 'Дата' },
        { id: 1, key: 'name', type: 'name', name: 'Название' },
        { id: 2, key: 'quantity', type: 'quantity', name: 'Количество' },
        { id: 3, key: 'distance', type: 'distance', name: 'Расстояние' },
    ];

    static colsTypesMap = Types.colsTypes.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());
}

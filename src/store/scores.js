import {defineStore} from 'pinia'
import {nextTick, ref} from 'vue'

export const useScores = defineStore('scores', () => {
    const state = ref({
        inputSample: ['PLAYER WIN', 'PLAYER WIN', 'PLAYER WIN', 'PLAYER WIN', 'PLAYER WIN', 'PLAYER WIN', 'TIE', 'TIE', 'BANKER WIN', 'BANKER WIN', 'BANKER WIN', 'PLAYER WIN', 'PLAYER WIN', 'PLAYER WIN', 'BANKER WIN', 'TIE',],
        rowsLength: 6,
        columnLength: 18,
        rows: [],
        currentRowIndex: 0,
        currentColumnIndex: 0,
        currentType: undefined,
        rowsBasic: [],
        currentRowIndexBasic: 0,
        currentColumnIndexBasic: 0,
        currentInputLengthBasic: 0,
        infoType: {
            banker: {
                colorClass: 'bg-red-700', title: 'BANKER', value: 'BANKER WIN'
            }, player: {
                colorClass: 'bg-blue-700', title: 'PLAYER', value: 'PLAYER WIN'
            }, tie: {
                colorClass: 'bg-green-700', title: 'TIE', value: 'TIE'
            }

        },
    })

    const _initTotalRows = (_key) => {
        let _rows = []
        for (let i = 0; i < state.value.rowsLength; i++) {
            _rows[i] = [];
            for (let j = 0; j < state.value.columnLength; j++) {
                _rows[i][j] = 0
            }
        }
        state.value[_key] = _rows
    }
    const addScoreInput = (_type) => {
        addType(_type)
        addTypeBasic(_type, state.value.currentInputLengthBasic)
        state.value.inputSample.push(_type)
    }
    const resetScores = () => {
        state.value.columnLength = 18
        savePoint(0, 0, undefined)
        savePointBasic(0, 0, 0)
        initRowsBasic()
        initRows()
        state.value.inputSample = []
    }


    const initRows = () => {
        _initTotalRows('rows')
    }
    const initData = () => {
        for (let i = 0; i < state.value.inputSample.length; i++) {
            addType(state.value.inputSample[i])
        }
    }
    const getPointIndex = (_type) => {
        let rowIndex = state.value.currentRowIndex, columnIndex = state.value.currentColumnIndex
        let isSamRowValue = () => {
            let row = state.value.rows[0]
            let value = row?.[columnIndex - 1]
            if (!value) {
                return false
            }
            let isHasValue = value === state.value.currentType
            return isHasValue && state.value.currentRowIndex === 0
        }
        let isPreColumnValue = () => {
            let row = state.value.rows[rowIndex]
            let value = row?.[columnIndex - 1]
            if (!value) {
                return false
            }
            let isHasValue = value === state.value.currentType
            return isHasValue && state.value.rows[0][columnIndex] !== state.value.currentType
        }
        let isNextRowValue = () => {
            let nextRow = state.value.rows[rowIndex + 1]
            if (!nextRow) {
                return false
            }
            let value = nextRow[columnIndex]
            let isHasValue = value !== 0
            return isHasValue
        }
        if (state.value.currentColumnIndex === 0 && state.value.currentType === undefined) {
            rowIndex = 0
            columnIndex = 0
        } else if (_type === state.value.currentType) {
            if (isSamRowValue()) {
                rowIndex = state.value.currentRowIndex
                columnIndex = state.value.currentColumnIndex + 1
            } else if (isPreColumnValue()) {
                rowIndex = state.value.currentRowIndex
                columnIndex = state.value.currentColumnIndex + 1
            } else if (isNextRowValue()) {
                rowIndex = state.value.currentRowIndex
                columnIndex = state.value.currentColumnIndex + 1
            } else if (state.value.currentRowIndex === state.value.rows.length - 1) {
                rowIndex = state.value.currentRowIndex
                columnIndex = state.value.currentColumnIndex + 1
            } else {
                rowIndex = state.value.currentRowIndex + 1
                columnIndex = state.value.currentColumnIndex
            }
        } else if (_type !== state.value.currentType) {
            rowIndex = 0
            columnIndex = state.value.rows[0].filter(e => e !== 0).length
        }
        return {
            rowIndex, columnIndex,
        }
    }
    const addType = async (_type) => {
        if (state.value.currentColumnIndex === state.value.columnLength - 2) {
            for (let i = 0; i < state.value.rowsLength; i++) {
                for (let j = state.value.columnLength; j < state.value.columnLength + 9; j++) {
                    state.value.rows[i][j] = 0
                }
            }
            state.value.columnLength += 9
        }
        let point = getPointIndex(_type)
        state.value.rows[point.rowIndex][point.columnIndex] = _type
        savePoint(point.rowIndex, point.columnIndex, _type)
        await nextTick()
        document.querySelectorAll('.container-table').forEach(e => e.scrollTo(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER))
    }
    const savePoint = (rowIndex, columnIndex, _type) => {
        state.value.currentRowIndex = rowIndex
        state.value.currentColumnIndex = columnIndex
        state.value.currentType = _type
    }


    const initRowsBasic = () => {
        _initTotalRows('rowsBasic')
    }
    const initDataBasic = () => {
        for (let i = 0; i < state.value.inputSample.length; i++) {
            addTypeBasic(state.value.inputSample[i], i)
        }
    }
    const getPointIndexBasic = (_index) => {
        let rowIndex
        let columnIndex
        rowIndex = (_index % 6)
        columnIndex = Math.trunc(_index / 6)
        return {
            rowIndex, columnIndex,
        }
    }
    const addTypeBasic = (_type, _index) => {
        let point = getPointIndexBasic(_index)
        state.value.rowsBasic[point.rowIndex][point.columnIndex] = _type
        savePointBasic(point.rowIndex, point.columnIndex, false)
    }
    const savePointBasic = (rowIndex, columnIndex, currentInputLengthBasic) => {
        state.value.currentRowIndexBasic = rowIndex
        state.value.currentColumnIndexBasic = columnIndex
        if (typeof currentInputLengthBasic === "boolean" && currentInputLengthBasic === false) {
            state.value.currentInputLengthBasic += 1
        } else {
            state.value.currentInputLengthBasic = 0
        }
    }

    return {
        state, resetScores, addScoreInput, initRows, initData, initRowsBasic, initDataBasic,
    }
})

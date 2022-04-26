import {defineStore, acceptHMRUpdate} from 'pinia'
import {ref} from 'vue'

export const useScoresStorePin = defineStore('scores', () => {
    const state = ref({
        inputSample: ["1", "2", "2", "1", "2", "1", "1", "1", "2", "2", "2", "2", "2", "2", "2", "1", "1", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "1", "1", "2", "1", "2", "1", "1", "2", "1", "2",],
        rowsLength: 6,
        columnLength: 30,
        rows: [],

        currentRowIndex: 0,
        currentColumnIndex: 0,
        currentType: undefined,
    })
    const initRows = () => {
        let numRows = 6
        let numCols = 30
        let rows1 = []
        for (let i = 0; i < numRows; i++) {
            let row = []
            for (let j = 0; j < numCols; j++) {
                row.push(0)
            }
            rows1.push(row)
        }
        state.value.rows = rows1;
    }

    const addScoreInput = (_value) => {
        state.value.inputSample.push(_value)
    }
    const resetScores = (_value) => {
        savePoint(0, 0, undefined)
        initRows()
        state.value.inputSample = []
    }
    const addType = (_type) => {
        let point = getPointIndex(_type)
        addScore(_type, point.rowIndex, point.columnIndex)
        savePoint(point.rowIndex, point.columnIndex, _type)
    }
    const savePoint = (rowIndex, columnIndex, _type) => {
        state.value.currentRowIndex = rowIndex
        state.value.currentColumnIndex = columnIndex
        state.value.currentType = _type
    }
    const getPointIndex = (_type) => {
        window.console.log(_type, state.value.currentType)
        let rowIndex = state.value.currentRowIndex, columnIndex = state.value.currentColumnIndex
        let isNextRowValue = () => {
            let nextRow = state.value.rows[rowIndex + 1]
            if (!nextRow) {
                return false
            }
            let value = nextRow[columnIndex]
            let isHasValue = value !== 0
            return isHasValue
        }
        let isNextRowValue2 = () => {
            let nextRow = state.value.rows[rowIndex + 2]
            if (!nextRow) {
                return false
            }
            let valueNextRow2 = nextRow[columnIndex]
            let isSame = valueNextRow2 === state.value.currentType
            return isSame
        }
        let isNextRowPreColumnSameValue = () => {
            let nextRow = state.value.rows[rowIndex + 1]
            if (!nextRow) {
                return false
            }
            let valueNextRow2 = nextRow[columnIndex - 1]
            const isNextRow2PreColumnSameValue = valueNextRow2 === state.value.currentType
            return isNextRow2PreColumnSameValue
        }
        // eslint-disabled
        if (state.value.currentColumnIndex === 0 && state.value.currentType === undefined) {
            rowIndex = 0
            columnIndex = 0
            console.warn('DÒNG ĐẦU TIÊN 0:0')
        } else if (_type === state.value.currentType) {
            if (isNextRowValue()) {
                // dòng tiiếp theo có giá trị
                console.error('1  DÒNG TIẾP THEO CÓ GIÁ TRỊ ( value !== 0) ')
                rowIndex = state.value.currentRowIndex
                columnIndex = state.value.currentColumnIndex + 1
            } else if (isNextRowValue2()) {
                rowIndex = state.value.currentRowIndex
                columnIndex = state.value.currentColumnIndex + 1
            } else if (isNextRowPreColumnSameValue()) {
                rowIndex = state.value.currentRowIndex
                columnIndex = state.value.currentColumnIndex + 1
            } else if (state.value.currentRowIndex === state.value.rows.length - 1) {
                // chạm đáy
                console.error('2 CHẠM ĐÁY')
                rowIndex = state.value.currentRowIndex
                columnIndex = state.value.currentColumnIndex + 1
            } else {
                console.error('3 GIÁ TRỊ GIỐNG DÒNG TIẾP THEO ')
                rowIndex = state.value.currentRowIndex + 1
                columnIndex = state.value.currentColumnIndex
            }
        } else if (_type !== state.value.currentType) {
            console.error('GIÁ TRỊ KHÁC CỘT TIẾP THEO, TỔNG GIÁ TRỊ CỦA DÒNG ĐẦU  ')
            rowIndex = 0
            columnIndex = state.value.rows[0].filter(e => e !== 0).length
        }
        return {
            rowIndex, columnIndex,
        }
    }

    const addScore = (_type, rowIndex, columnIndex) => {
        state.value.rows[rowIndex][columnIndex] = _type
    }

    const initData = () => {
        for (let i = 0; i < state.value.inputSample.length; i++) {
            addType(state.value.inputSample[i])
        }
    }

    return {
        state, addScore, resetScores, initRows, addScoreInput, initData, addType,
    }
})

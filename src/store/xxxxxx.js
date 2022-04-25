import {computed, reactive,} from "vue";
import dataTest from './data'

export const xxxxxx = () => {
    const {rowsLength, columnLength, inputSample} = dataTest
    const state = reactive({
        currentRowIndex: 0,
        currentColumnIndex: 0,
        currentValue: undefined,
        rowsLength,
        columnLength,
        matrix: [],
        matrixBasic: [],
        inputSample: inputSample || [],
    })
    const initMatrix = () => {
        for (let i = 0; i < state.rowsLength; i++) {
            state.matrix[i] = [];
            for (let j = 0; j < state.columnLength; j++) {
                setValueCell(i, j, 0)
            }
        }
    }
    const setValueCell = (rowIndex, columnIndex, _value) => {
        state.matrix[rowIndex][columnIndex] = _value
    }

    const initDataToSpecialMatrix = () => {
        initMatrix()
        let savePosition = (rowIndex, columnIndex, _value) => {
            state.currentRowIndex = rowIndex
            state.currentColumnIndex = columnIndex
            state.currentValue = _value
        }
        let setSpecialValueCell = (_value) => {
            const {specialRowIndex, specialColumnIndex} = getSpecialPosition(_value)
            setValueCell(specialRowIndex, specialColumnIndex, _value)
            savePosition(specialRowIndex, specialColumnIndex, _value)
        }
        let getSpecialPosition = (_value) => {
            let specialRowIndex = state.currentRowIndex
            let specialColumnIndex = state.currentColumnIndex
            let isNextRowValue = () => {
                let nextRow = state.matrix[specialRowIndex + 1]
                if (!nextRow) {
                    return false
                }
                let value = nextRow[specialColumnIndex]
                let isHaveValue = (value !== 0)
                return isHaveValue
            }
            let isNextTwoRowValue = () => {
                let nextTowRow = state.matrix[specialRowIndex + 2]
                if (!nextTowRow) {
                    return false
                }
                let valueNextTwoRow = nextTowRow[specialColumnIndex]
                let isSameValue = valueNextTwoRow === state.currentValue
                return isSameValue
            }
            let isNextRowPreColumnSameValue = () => {
                //turn right,on each column can not touch the same value
                let nextRow = state.matrix[specialRowIndex + 1]
                if (!nextRow) {
                    return false
                }
                let valueNextRow2 = nextRow[specialColumnIndex - 1]
                const isNextRow2PreColumnSameValue = valueNextRow2 === state.currentValue
                return isNextRow2PreColumnSameValue
            }
            if (state.currentColumnIndex === 0 && state.currentValue === undefined) {
                specialRowIndex = 0
                specialColumnIndex = 0
                console.warn('DÒNG ĐẦU TIÊN 0:0')
            } else if (_value === state.currentValue) {
                if (isNextRowValue()) {
                    console.error('1  DÒNG TIẾP THEO CÓ GIÁ TRỊ ( value !== 0) ')
                    specialRowIndex = state.currentRowIndex
                    specialColumnIndex = state.currentColumnIndex + 1
                } else if (isNextTwoRowValue()) {
                    specialRowIndex = state.currentRowIndex
                    specialColumnIndex = state.currentColumnIndex + 1
                } else if (isNextRowPreColumnSameValue()) {
                    specialRowIndex = state.currentRowIndex
                    specialColumnIndex = state.currentColumnIndex + 1
                } else if (state.currentRowIndex === state.rowsLength - 1) {
                    // chạm đáy
                    console.error('2 CHẠM ĐÁY')
                    specialRowIndex = state.currentRowIndex
                    specialColumnIndex = state.currentColumnIndex + 1
                } else {
                    console.error('3 GIÁ TRỊ GIỐNG DÒNG TIẾP THEO ')
                    specialRowIndex = state.currentRowIndex + 1
                    specialColumnIndex = state.currentColumnIndex
                }
            } else if (_value !== state.currentValue) {
                console.error('GIÁ TRỊ KHÁC CỘT TIẾP THEO, TỔNG GIÁ TRỊ CỦA DÒNG ĐẦU  ')
                specialRowIndex = 0
                specialColumnIndex = state.matrix[0].filter(el => el !== 0).length
            }
            return {
                specialRowIndex, specialColumnIndex,
            }
        }
        for (let i = 0; i < state.inputSample.length; i++) {
            setSpecialValueCell(state.inputSample[i])
        }
    }
    const initDataToBasicMatrix = () => {
        let _arrArr = []
        for (let i = 0; i < state.inputSample.length; i += state.rowsLength) {
            const chunk = state.inputSample.slice(i, i + state.rowsLength);
            _arrArr.push(chunk)
        }
        for (let i = 0; i < state.rowsLength; i++) {
            state.matrixBasic[i] = [];
            for (let j = 0; j < state.columnLength; j++) {
                state.matrixBasic[i][j] = _arrArr[j]?.[i]
            }
        }
    }
    const addScore = (_value) => {
        state.inputSample.push(_value)
    }

    const resetBoard = () => {
        state.inputSample.length = 0
    }

    return {
        matrixBasic: computed(() => state.matrixBasic),
        matrix: computed(() => state.matrix),
        initDataToSpecialMatrix,
        initDataToBasicMatrix,
        addScore,
        resetBoard,
    }
}
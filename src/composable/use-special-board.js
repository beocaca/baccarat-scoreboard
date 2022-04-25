import {ref} from "vue";

export const useSpecialBoard = (state) => {
    const matrix = ref([])
    let currentRowIndex = 0
    let currentColumnIndex = 0
    let currentValue = undefined

    let savePosition = (rowIndex, columnIndex, _value) => {
        currentRowIndex = rowIndex
        currentColumnIndex = columnIndex
        currentValue = _value
    }

    let setSpecialValueCell = (_value) => {
        const {currentRowIndex, currentColumnIndex} = getSpecialPosition(_value)
        setValueCell(currentRowIndex, currentColumnIndex, _value)
        savePosition(currentRowIndex, currentColumnIndex, _value)
    }

    const setValueCell = (rowIndex, columnIndex, _value) => {
        matrix.value[rowIndex][columnIndex] = _value
    }

    let getSpecialPosition = (_value) => {
        window.console.log(_value, currentValue)
        let currentRowIndex = currentRowIndex
        let currentColumnIndex = currentColumnIndex
        let isNextRowValue = () => {
            let nextRow = matrix.value[currentRowIndex + 1]
            if (!nextRow) {
                return false
            }
            let value = nextRow[currentColumnIndex]
            let isHasValue = value != 0
            return isHasValue
        }
        let isNextRowValue2 = () => {
            let nextRow = matrix.value[currentRowIndex + 2]
            if (!nextRow) {
                return false
            }
            let valueNextRow2 = nextRow[currentColumnIndex]
            let isSame = valueNextRow2 == currentValue
            return isSame
        }
        let isNextRowPreColumnSameValue = () => {
            let nextRow = matrix.value[currentRowIndex + 1]
            if (!nextRow) {
                return false
            }
            let valueNextRow2 = nextRow[currentColumnIndex - 1]
            const isNextRow2PreColumnSameValue = valueNextRow2 == currentValue
            return isNextRow2PreColumnSameValue
        }
        if (currentColumnIndex == 0 && currentValue == undefined) {
            currentRowIndex = 0
            currentColumnIndex = 0
            console.warn('DÒNG ĐẦU TIÊN 0:0')
        } else if (_value == currentValue) {
            if (isNextRowValue()) {
                console.error('1  DÒNG TIẾP THEO CÓ GIÁ TRỊ ( value !== 0) ')
                currentRowIndex = currentRowIndex
                currentColumnIndex = currentColumnIndex + 1
            } else if (isNextRowValue2()) {
                currentRowIndex = currentRowIndex
                currentColumnIndex = currentColumnIndex + 1
            } else if (isNextRowPreColumnSameValue()) {
                currentRowIndex = currentRowIndex
                currentColumnIndex = currentColumnIndex + 1
            } else if (currentRowIndex == state.value.rowsLength - 1) {
                // chạm đáy
                console.error('2 CHẠM ĐÁY')
                currentRowIndex = currentRowIndex
                currentColumnIndex = currentColumnIndex + 1
            } else {
                console.error('3 GIÁ TRỊ GIỐNG DÒNG TIẾP THEO ')
                currentRowIndex = currentRowIndex + 1
                currentColumnIndex = currentColumnIndex
            }
        } else if (_value != currentValue) {
            console.error('GIÁ TRỊ KHÁC CỘT TIẾP THEO, TỔNG GIÁ TRỊ CỦA DÒNG ĐẦU  ')
            currentRowIndex = 0
            currentColumnIndex = matrix.value[0].filter(el => el != 0).length
        }
        return {
            currentRowIndex, currentColumnIndex,
        }

    }

    const initMatrix = () => {
        let rows = []
        for (let i = 0; i < state.value.rowsLength; i++) {
            let row = []
            for (let j = 0; j < state.value.columnLength; j++) {
                row.push('0')
            }
            rows.push(row)
        }
        matrix.value = rows
        // for (let i = 0; i < state.value.rowsLength; i++) {
        //     matrix.value[i] = [];
        //     for (let j = 0; j < state.value.columnLength; j++) {
        //         matrix.value[i][j] = 0
        //     }
        // }
    }

    const initDataToSpecialMatrix = () => {
        initMatrix()
        for (let i = 0; i < state.value.inputSample.length; i++) {
            setSpecialValueCell(state.value.inputSample[i])
        }
        console.error(currentRowIndex, currentColumnIndex, currentValue)
    }
    return {
        matrix, initDataToSpecialMatrix
    }
}
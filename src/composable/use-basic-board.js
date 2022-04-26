import {ref} from "vue";

export const useBasicBoard = (state) => {
    const matrix = ref([])
    const initDataToBasicMatrix1 = () => {
        let _arrArr = []
        for (let i = 0; i < state.value.inputSample.length; i += state.value.rowsLength) {
            const chunk = (state.value.inputSample || []).slice(i, i + state.value.rowsLength);
            _arrArr.push(chunk)
        }
        for (let i = 0; i < state.value.rowsLength; i++) {
            matrix.value[i] = [];
            for (let j = 0; j < state.value.columnLength; j++) {
                matrix.value[i][j] = _arrArr[j]?.[i]
            }
        }
    }
    return {
        matrix, initDataToBasicMatrix1
    }
}


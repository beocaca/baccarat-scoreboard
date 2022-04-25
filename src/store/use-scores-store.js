import {ref, reactive} from "vue";

export const useScoresStore = () => {
    let state = ref({
        inputSample: ["1", "2", "2", "1", "2", "1", "1", "1", "2", "2", "2", "2", "2", "2", "2", "1", "1", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "1", "1", "2", "1", "2", "1", "1", "2", "1", "2",],
        rowsLength: 6,
        columnLength: 18,
    })
    const addScore = (_value) => {
        console.error(state.value.inputSample)
        state.value.inputSample.push(_value)
        console.error(state.value.inputSample)
    }

    const resetBoard = () => {
        state.value.inputSample.length = 0
    }

    return {
        state, addScore, resetBoard,
    }
}
<template>
  <div>
    <div class="container">
      Rows : {{ rows }}
      <div>currentRowIndex : {{ currentRowIndex }}</div>
      <div>currentColumnIndex: {{ currentColumnIndex }}</div>
      <div>currentType: {{ currentType }}</div>
      <div> {{ maxRows }}</div>
      <div class="p-10 border overflow-x-auto">
        <table>
          <tr v-for="(row, rowIndex) in rows"
              class="flex red"
              :key="rowIndex">
            <td
                class=" w-10 red h-10 flex items-center justify-center"
                v-for="(column, columnIndex) in row"
                :class="{'bg-blue-700':column === '2',
                 'bg-green-700':column === '3',
                 'bg-red-600':column === '1'}"
                :key="columnIndex"
            >
              {{ column === 0 ? '' : column }}
            </td>
          </tr>
        </table>
      </div>
      <div class="space-x-2">
        <button class="border p-2 w-20"
                @click="addType('1')">1
        </button>
        <button class="border p-2 w-20"
                @click="addType('2')">2
        </button>
        <button class="border p-2 w-20"
                @click="addType('3')">3
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data: () => ({
    rows: [],
    maxRows: 6,
    currentRowIndex: 0,
    currentColumnIndex: 0,
    currentType: undefined,
    inputSample: [
      "1",
      "2",
      "2",
      "1",
      "2",
      "1",
      "1",
      "1",
      "2",
      "2",
      "2",
      "2",
      "2",
      "2",
      "2",
      "1",
      "1",
      "2",
      "2",
      "2",
      "2",
      "2",
      "2",
      "2",
      "2",
      "2",
      "2",
      "1",
      "1",
      "2",
      "1",
      "2",
      "1",
      "1",
      "2",
      "1",
      "2",
    ]
  }),
  mounted() {
    this.initRows()
    this.initData()
  },
  methods: {
    initData() {
      for (let i = 0; i < this.inputSample.length; i++) {
        this.addType(this.inputSample[i])
      }
    },
    initRows() {
      let numRows = 6
      let numCols = 30
      let rows = []
      for (let i = 0; i < numRows; i++) {
        let row = []
        for (let j = 0; j < numCols; j++) {
          row.push(0)
        }
        rows.push(row)
      }
      this.rows = rows
      this.maxRows = numRows
    },
    addType(_type) {
      let point = this.getPointIndex(_type)
      this.addScore(_type, point.rowIndex, point.columnIndex)
      this.savePoint(point.rowIndex, point.columnIndex, _type)
    },
    savePoint(rowIndex, columnIndex, _type) {
      this.currentRowIndex = rowIndex
      this.currentColumnIndex = columnIndex
      this.currentType = _type
    },
    getPointIndex(_type) {
      window.console.log(_type, this.currentType)
      let rowIndex = this.currentRowIndex,
          columnIndex = this.currentColumnIndex
      let isNextRowValue = () => {
        let nextRow = this.rows[rowIndex + 1]
        if (!nextRow) {
          return false
        }
        let value = nextRow[columnIndex]
        let isHasValue = value !== 0
        return isHasValue
      }
      let isNextRowValue2 = () => {
        let nextRow = this.rows[rowIndex + 2]
        if (!nextRow) {
          return false
        }
        let valueNextRow2 = nextRow[columnIndex]
        let isSame = valueNextRow2 === this.currentType
        return isSame
      }
      let isNextRowPreColumnSameValue = () => {
        let nextRow = this.rows[rowIndex + 1]
        if (!nextRow) {
          return false
        }
        let valueNextRow2 = nextRow[columnIndex - 1]
        const isNextRow2PreColumnSameValue = valueNextRow2 === this.currentType
        return isNextRow2PreColumnSameValue
      }
      // eslint-disabled
      if (this.currentColumnIndex === 0 && this.currentType === undefined) {
        rowIndex = 0
        columnIndex = 0
        console.warn('DÒNG ĐẦU TIÊN 0:0')
      } else if (_type === this.currentType) {
        if (isNextRowValue()) {
          // dòng tiiếp theo có giá trị
          console.error('1  DÒNG TIẾP THEO CÓ GIÁ TRỊ ( value !== 0) ')
          rowIndex = this.currentRowIndex
          columnIndex = this.currentColumnIndex + 1
        } else if (isNextRowValue2()) {
          rowIndex = this.currentRowIndex
          columnIndex = this.currentColumnIndex + 1
        } else if (isNextRowPreColumnSameValue()) {
          rowIndex = this.currentRowIndex
          columnIndex = this.currentColumnIndex + 1
        } else if (this.currentRowIndex === this.rows.length - 1) {
          // chạm đáy
          console.error('2 CHẠM ĐÁY')
          rowIndex = this.currentRowIndex
          columnIndex = this.currentColumnIndex + 1
        } else {
          console.error('3 GIÁ TRỊ GIỐNG DÒNG TIẾP THEO ')
          rowIndex = this.currentRowIndex + 1
          columnIndex = this.currentColumnIndex
        }
      } else if (_type !== this.currentType) {
        console.error('GIÁ TRỊ KHÁC CỘT TIẾP THEO, TỔNG GIÁ TRỊ CỦA DÒNG ĐẦU  ')
        rowIndex = 0
        columnIndex = this.rows[0].filter(e => e !== 0).length
      }
      return {
        rowIndex,
        columnIndex,
      }
    },
    addScore(_type, rowIndex, columnIndex) {
      window.console.log({_type, rowIndex, columnIndex, rows: this.rows})
      this.rows[rowIndex][columnIndex] = _type
      this.$forceUpdate()
    },
  },
}
</script>
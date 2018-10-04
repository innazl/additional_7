module.exports = function solveSudoku(matrix) {
  // запись матрицы в одномерный массив
  var arrayIn = [];  // при const не проходит по времени ..хз
  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix[i].length; j++){
      arrayIn.push(matrix[i][j]);
    }
  }
  search_index(0);
  return output_matrix(arrayIn);
  // поиск индекса в массиве элемементов которые равны 0 
  function search_index(index) {
    if (index >= arrayIn.length) {
      return true;     
    } else if (arrayIn[index] != 0) {
      return search_index(index + 1);
    }
    // перебор всех цифр от 1..9 с проверкой повторов
    for (let i = 1; i <= 9; i++) {
      if (search_number(i, Math.floor(index / 9), index % 9)) {
        arrayIn[index] = i;
        if (search_index(index + 1)) {
          return true;
        }
      }
    }
    arrayIn[index] = 0;
    return false;
  }
  // поиск повтора цифры
  function search_number(num, row, col) {
    for (let i = 0; i < 9; i++) {
      let current_ind = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);
      if (num == arrayIn[(row * 9) + i] || num == arrayIn[col + (i * 9)] || num == arrayIn[current_ind ]) {
        return false;
      }
    }
    return true;
  }
  // разбивка одномерного массива в матрицу 9Х9
  function output_matrix(arrin) {
    const result = [];
    for (let i = 0; i < arrin.length; i += 9) {
      result.push(arrin.slice(i, i + 9));
    }
    return result;
  }
}
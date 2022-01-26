function createMat(gSize) {
    var mat = []
    for (var i = 0; i < gSize; i++) {
        var row = []
        for (var j = 0; j < gSize; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}
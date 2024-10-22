
// solid
// single open lishi interface接口封闭 dependent依赖倒置


// 01. single
fn = (function () {
    let tmp = {}
    return function () {
        return tmp
    }

})()
fn() === fn()


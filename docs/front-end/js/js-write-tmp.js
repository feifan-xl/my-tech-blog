



// 实在一个有并发限制的promise.all

function myPromiseAll (list, count) {

    return new Promise((resolve, reject) => {
        let running = 0
        let res = []
        let index = 0
        let resCount = 0
        function step (i) {
            if (!list[i]) return
            running++
            list[i]().then(val => {
                resCount++
                running--
                res[i] = val
                if (resCount === list.length) {
                    resolve(res)
                }
                if (running < count && ++index < list.length ) {
                    step(index)
                }
            })
        }
        for (let i = 0; i < list.length && i < count; i++) {
            index = i
            step(i)
        }
    })
}
function delay (count, timer) {
    return new Promise(res => {
        setTimeout(() => {
            console.log(count)
            res(count)
        }, timer)
    })
}
const p1 = () => delay('1',5000)
const p2 = () => delay('2',2000)
const p3 = () => delay('3',3000)
const p4 = () => delay('4',2000)
const p5 = () => delay('5',3000)

const p = [p1,p2,p3,p4,p5]
myPromiseAll(p,3).then(res => console.log(res))



// lodash.get
// a[3].b -> a.3.b
function get (source, path, defaultValue) {

    const paths = path
        .replace(/\[(w+)\]/g, '.$1')
        .replace(/\["(\w+)"\]/g, ".$1")
        .replace(/\['(\w+)'\]/g, ".$1")
        .split(".")
    let res = source
    for (let key of paths) {
        res = res?.[key]
    }
    return res === undefined ? defaultValue : res
}

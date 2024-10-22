
const fs = require('fs');
const path = require('path');

function isIneffective(name) {
  return ['.vitepress', 'index.md'].includes(name)
   || name.includes('.png')
   || name.includes('imgs')
   || name.includes('.html')
   || name.includes('.js');
}

function isfilterExtname (name) {
  return ['.png', '.js', '.html'].includes(name)
}

fs.readdir('./docs', (err, dirList) => {
  dirList.forEach(i => {
    printSameLevelMenu('./docs', i)
  })
})


function printSameLevelMenu (preDir, dirName) {
  if (['.vitepress', 'index.md'].includes(dirName)) return
  console.log(preDir, dirName)
  if (isIneffective(dirName)) return
  const dir = './' + path.join(preDir, dirName)
  fs.readdir(dir, (err, dirList) => {
    if (!dirList) return
    const list = dirList.filter(i => {
      if (isIneffective(i)) return false
      printSameLevelMenu(dir, i)
      return true
    })
    let str =
`---
sidebar: false
--- 

### 目录
`
      list.forEach(tmp => {
        const allUrl = path.join(__dirname, dir, tmp)
        if (isfilterExtname(path.extname(allUrl))) return
        if (path.extname(allUrl) === '') {
          str =
`${str}- [${tmp}](./${tmp}/index.md)
`
        }
        else {
          str =
`${str}- [${tmp}](./${tmp})
`
        }
      })
      fs.writeFile(dir + '/index.md', str, (err) => {
        console.log(err);
      } )
    })
}
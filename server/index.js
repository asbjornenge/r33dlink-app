import path from 'path'
import htmlToText from 'html-to-text'
import readability from 'easy-read'

let html = path.join(__dirname, 'index.html')

//htmlToText.fromFile(html, (err, text) => {
//    console.log(text)
//})

//let link = "https://github.com/mafintosh/standard"
let link = "http://www.osloby.no/nyheter/Rosa-matbud-tar-over-bygatene-8340584.html"

readability(link, (res) => {
//    console.log(res)
    let text = htmlToText.fromString(res.content, {ignoreHref: true, ignoreImage: true})
    console.log(text)
})

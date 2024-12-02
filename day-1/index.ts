import * as fs from 'fs'
import * as readline from 'readline'

// PART 1

let sum = 0
const leftList: number[] = []
const rightList: number[] = []

const lineReader = readline.createInterface({
    input: fs.createReadStream('./data.txt'),
    terminal: false,
})

lineReader.on('line', (line) => {
    const pair = line.split('   ')
    leftList.push(parseInt(pair[0]))
    rightList.push(parseInt(pair[1]))
})

lineReader.on('close', () => {

    const sortedLeftList = leftList.sort()
    const sortedRightList = rightList.sort()

    for (let i = 0; i < sortedLeftList.length; i++) {
        const left = sortedLeftList[i]
        const right = sortedRightList[i]

        const distance = Math.abs(left - right)

        sum += distance
    }

    console.log(`Part 1: ${sum}`)

    // PART 2

    let similarityScore = 0
    const leftSet = new Set(Array.from(sortedLeftList))

    const occurrenceMap = sortedRightList.reduce((acc, curr) => {
        acc[curr] = (acc[curr] ?? 0) + 1

        return acc
    }, {} as Record<number, number>)

    leftSet.forEach((number) => {
        const occurrences = occurrenceMap[number] ?? 0

        similarityScore += (number * occurrences)
    })

    console.log(`Part 2: ${similarityScore}`)

})
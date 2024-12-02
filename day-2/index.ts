import * as fs from 'fs'
import * as readline from 'readline'

// PART 1

const lineReader = readline.createInterface({
    input: fs.createReadStream('./data.txt'),
    terminal: false,
})

const getIsReportSafe = (report: number[]) => {

    let isSafe = true;
    let direction = report[1] - report[0] < 0 ? -1 : 1;

    for (let i = 0; i < report.length; i++) {
        const currLevel = report[i]
        const nextLevel = report[i + 1]

        const delta = nextLevel - currLevel
        const absDelta = Math.abs(delta)

        isSafe = !(absDelta === 0 
        || absDelta > 3
        || (direction === -1 && delta > 0) 
        || (direction === 1 && delta < 0))

        if (!isSafe) break;
    }

    return isSafe

}

let numSafeReports = 0;

lineReader.on('line', (line) => {

    const report = line.split(' ').map((level) => parseInt(level))

    const isReportSafe = getIsReportSafe(report)

    if (isReportSafe) numSafeReports += 1
    else {

        // PART 2

        for (let i = 0; i < report.length; i++) {

            const reportToDampen = [...report]

            reportToDampen.splice(i, 1)

            const isDampenedReportSafe = getIsReportSafe(reportToDampen)

            if (isDampenedReportSafe) {
                numSafeReports += 1
                break;
            }
    
        }
    }
    
})

lineReader.on('close', () => {

    console.log(`Part 1: ${numSafeReports}`)

})
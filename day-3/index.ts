import { assert } from 'console'
import * as fs from 'fs'
import * as readline from 'readline'

// PART 1

const data = fs.readFileSync('./data.txt', 'utf-8')

const part1 = (data: string) => {
    const validInstructionPattern = /mul\(\d*,\d*\)/g

    const validInstructions = [...data.matchAll(validInstructionPattern)].map((match) => match[0])
    const digitPairs = validInstructions.map((instruction) => {
        const digits  = instruction
            .replace(/mul\(/g, '')
            .replace(/\)/g, '')
            .split(',')

        return digits
    })

    const sum = digitPairs.reduce((acc, curr) => {

        const a = parseInt(curr[0])
        const b = parseInt(curr[1])

        acc += (a * b)

        return acc

    }, 0)

    return sum
}

const part2 = (data: string) => {

    const validInstructionPattern = /mul\(\d*,\d*\)|don\'t\(\)|do\(\)/g
    const validInstructions = [...data.matchAll(validInstructionPattern)].map((match) => match[0])

    let sum = 0
    let enabled = true

    for (let i = 0; i < validInstructions.length; i++) {
        const instruction = validInstructions[i]

        if (instruction.includes('mul') && enabled) {
            const digits  = instruction
                .replace(/mul\(/g, '')
                .replace(/\)/g, '')
                .split(',')
            
            sum += (parseInt(digits[0]) * parseInt(digits[1]))

            continue;
        }

        else if (instruction.includes(`don't()`)) enabled = false
        else if (instruction.includes(`do()`)) enabled = true
    }

    return sum

}

const part1Sum = part1(data)
const part2Sum = part2(data)
console.log(`Part 1: ${part1Sum}`)
console.log(`Part 2: ${part2Sum}`)

assert(part1Sum === 183380722, 'Part 1 Failed')
assert(part2Sum === 82733683, 'Part 2 Failed')
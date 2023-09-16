import { readFileSync, writeFileSync } from 'fs';
import inquirer from 'inquirer'

(async () => {
    try {
        console.log('Ler arquivos')
        const answers = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: "Nome do arquivo",
        });
        const fileName = answers.name

        const output = readFileSync(new URL(`./${fileName}.txt`, import.meta.url));
        const dataString = output.toString().split('\n')

        const reduced = dataString.reduce((list, data) => {
            let result;
            if (list.length === 0 || data === '') result = []
            else result = list[list.length - 1]

            if (data !== '') result.push(data)

            if (list.length === 0 || data === '') list.push(result)
            else list.splice(list.length - 1, result)

            return list
        }, [])
        console.log('reduced', reduced)
        const resultData = reduced.map(listData => ({
            question: listData[1],
            answer: listData[2]
        }))

        writeFileSync('output/Result.json', JSON.stringify(resultData));
    } catch (err) {
        console.error(err);
    }
})()

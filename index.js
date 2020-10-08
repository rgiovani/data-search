const IsNotArrayError = require('./src/utils/shared/exceptions/IsNotArray.error.js');
const validate = require('./src/utils/shared/functions/validateTypes.js');
const dataset = require('./src/models/dataSet/DataSet.js')
const defaultFunction = require('./src/utils/shared/functions/defaultFunctions.js');

exports.dataSet = [];
exports.dataBaseEntity = [];

exports.dataSetGenerate = function(data) {

    try {
        if (data.length > 0) {
            if (validate.objectInArrayContainsId(data)) {
                dataSet = [];
                dataBaseEntity = [];
                data.forEach(item => {
                    dataBaseEntity.push(item);
                    dataSet.push(dataset.create(item));
                })
            }
        } else if (!Array.isArray(data)) {
            throw new IsNotArrayError();
        }
    } catch (e) {
        console.error(`\n[${e.type}] - ${e.description}`);
        console.error(`${e.stack}`);
    }


}

// //**Example */
// const request = [
//     { id: 1, title: 'my new ad', subtitle: 'what do you think of looking?', nota: 3.5 },
//     { id: 2, title: 'hey, go to my website', subtitle: 'my website is beautiful', nota: 4 },
// ]
// this.dataSetGenerate(request);
// let response = defaultFunction.sortArrayOfObject(request, 1, 'nota') //1(DESC)!=1(ASC)
// console.log(response);
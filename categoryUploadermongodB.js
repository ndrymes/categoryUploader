const Categories = require("./model/categoriesMongo");
const xlsx = require('xlsx')

const db = require('./db/odamongo')
const workbook = xlsx.readFile('newcategory (2).csv')  
    const sheet_name_list = workbook.SheetNames
    
    //console.log(sheet_name_list);
    
    const ws = workbook.Sheets[sheet_name_list[0]]
    
    const data = xlsx.utils.sheet_to_json(ws)
    //console.log(data);
    

// for (const value of catCommission) {
//     const categoryName =value.G.toLocaleLowerCase()
//     //console.log(categoryName);
//     console.log(value.H);
    
//     Categories.find({}).updateMany({$set: {commission:0.04 }} )
//     .then((out) => {
//         console.log(out);
        
//     })
//     .catch((e) => {
//         console.log(e);
//     });
    
// }
const comission = {
    Fashion:0.08,
    'Sport & Fitness':0.07,
    Electronics:0.07,
    'Games & Console':0.03,
    'Health & Beauty':0.06,
    'Baby Products':0.05,
    'Home & Office':0.05,
    Groceries:0.05,
    Tobacco:0.05,
    'Books, Movies and Music':0.05,
    'Commercial Equipment & Tools':0.05,
    Drinks:0.04,
    'Computer & Accessories':0.04,
    'Phones & Tablets':0.04,
    'Pets & Vets':0.04

}
const commission_keys = Object.keys(comission )
const newData = []
for (const value of data) {
    for (const data of commission_keys) {
        if (data === value.categoryName ) {
            value.commission = comission[data]
        }
    } 
    if (value.parentId==='NULL') {
        value.parentId = null
    }   
    if (value.image==='NULL') {
        value.image=null
    }
    newData.push(value)
    
}
console.log(newData);

Categories.insertMany(newData )
    .then((out) => {
        console.log(out);
    })
    .catch((e) => {
        console.log(e);
    });








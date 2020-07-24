
const Brands = require('./model/brand')
require('./db/odamongo')
 const xlsx = require('xlsx')
const workbook = xlsx.readFile('brands (2) 06-07-20.csv')  
    const sheet_name_list = workbook.SheetNames
    
    //console.log(sheet_name_list);
    
    const ws = workbook.Sheets[sheet_name_list[0]]
    
    const file = xlsx.utils.sheet_to_json(ws)
const bulk = [];
async function bulkupload(productList) {

    for (const current in productList) {
 
        bulk.push({
            brandId:productList[current].uid,
            brandName:productList[current].name,
            createdBy:'5cda84ba304944461a81de04'
        });
    
}
console.log(bulk.length);
try {
      await Brands.insertMany(bulk);
      console.log('Done!');
      process.exit();
    } catch (e) {
      console.log(e);
      process.exit();
    }
}
bulkupload(file);

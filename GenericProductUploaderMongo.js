// import { idGenerator } from '../utils/IdGenerator';
const GenericProducts = require("./model/genericproducts");
const Categories = require("./model/categoriesMongo");
const Brands = require("./model/brand");
const generator = require("./utils/Idgenerator");
const xlsx = require('xlsx')
require("./db/odamongo");
const client = require("./db/elastic");
// import { Brands } from '../models/brands/brandsSchema';
const workbook = xlsx.readFile('genericproducts (1) 06-07-2020.csv')  
const sheet_name_list = workbook.SheetNames

//console.log(sheet_name_list);

const ws = workbook.Sheets[sheet_name_list[0]]

const file = xlsx.utils.sheet_to_json(ws)
//console.log('myyy', file);


const bulk = [];
async function bulkupload(productList) {
  //console.log('i got here',productList );
  
    let count = 0;
    for (const current in productList) {
        const mysub = [];
        const mysubname = [];
        
        
        const imaagess = productList[current].images;
        try {
            const mongocat = await Categories.findOne({ categoryId: productList[current].category });
            const checkCat = await GenericProducts.findOne({ productName: productList[current].title });
             console.log('mychesd',checkCat );
            
            if (checkCat || !mongocat) {
              continue;
            }

            //console.log(mongocat);
            const brandId = await Brands.findOne({ brandId: productList[current].brandUid});
            if (!productList[current].brandUid) {
                console.log('i no get',productList[current].uid);
            }
            if (brandId == null) {
                count++;
                console.log(productList[current].brandUid);
                continue
               
            }
            console.log(count);

            const mongocat2 = await Categories.findOne({ categoryId: productList[current].categorylevel2 });
            const mongocat3 = await Categories.findOne({ categoryId: productList[current].categorylevel3 });
            const mongocat4 = await Categories.findOne({ categoryId: productList[current].categorylevel4 });
            const mongocat5 = await Categories.findOne({ categoryId: productList[current].categorylevel5 });
            const mongocat6 = await Categories.findOne({ categoryId: productList[current].categorylevel6 });
            let mong05 = "";
            let mong06 = "";
            if (mongocat5 == null || mongocat6 == null) {
                mong05 = null;
                mong06 = null;
            } else {
                mong05 = mongocat5.categoryId;
                mong06 = mongocat6.categoryId;
            }
            mysub.push(
                {
                    level: 2,
                    categoryId: mongocat2.categoryId,
                },
                {
                    level: 3,
                    categoryId: mongocat3.categoryId,
                },
                {
                    level: 4,
                    categoryId: mongocat4.categoryId,
                },

                {
                    level: 5,
                    categoryId: mong05,
                },
                {
                    level: 6,
                    categoryId: mong06,
                }
            );
            mysubname.push(
                mongocat.categoryName,
                mongocat2.categoryName,
                mongocat3.categoryName,
                mongocat4.categoryName
            );
            let imagesd = imaagess.replace(/\{/g, "[").replace(/}/g, "]");
            const guy = [];
            guy.push(imagesd);
            imagesd = guy
                .join(",")
                .replace(/[\[\]']+/g, "")
                .split(",");
                let weight = productList[current].weight
if (weight==='NULL') {
    weight= 0.07
}
            bulk.push({
                productName: productList[current].title,
                description: productList[current].description,
                categoryName: mongocat.categoryName,
                weight: weight,
                height: productList[current].height,
                length: productList[current].length,
                volume: productList[current].volume,
                quantity: 400,
                brandName: brandId.brandName,
                status: "APPROVE",
                image: imagesd,
                width: productList[current].width,
                categoryId: mongocat.categoryId,
                subcategoryIds: mysub,
                subcategoryName: mysubname,
                productId: generator(),
                brandId: productList[current].brandUid,
                adminId: "5cda84ba304944461a81de04",
                createdBy: "valentine ezeh",
                lastEditedBy: "valentine ezeh",
            });
        } catch (error) {
            console.log(error);
        }
    }
    const bulky = [];
    console.log('this is the bulk',bulk);
    
    //console.log(bulk.length);
    try {
        const product = await GenericProducts.insertMany(bulk);
        console.log("Done mongo!");
        for (const current in product) {
            const id = product[current]._id.toString();
            bulky.push({
                index: { _id: id },
                id,
                productName: product[current].productName,
                categoryName: product[current].categoryName,
                adminId: product[current].adminId,
                quantity: 400,
                brandName: product[current].brandName,
                status: "APPROVE",
                image: product[current].image,
                categoryId: product[current].categoryId,
                productId: product[current].productId,
            });
        }
        console.log(bulky);

        await client.bulk({
            maxRetries: 5,
            index: "genericproducts",
            type: "genericproduct",
            body: bulky,
        });
        console.log("done for elastic");

        process.exit();
    } catch (e) {
        console.log(e);
        process.exit();
    }
}
bulkupload(file);

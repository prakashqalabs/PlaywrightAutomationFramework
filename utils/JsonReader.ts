import fs from "fs";

export class JsonReader {

    static readJson(path: string): any {

        return JSON.parse(
            fs.readFileSync(path, "utf-8")
        );
    }
}


// usage example in test file
/*
import { JsonReader } from '../utils/JsonReader';
const testData = JsonReader.readJson("testData/productData.json");
console.log(testData);

// or
const data = JsonReader.readJson("./testdata/loginData.json");
console.log(data.username);

*/
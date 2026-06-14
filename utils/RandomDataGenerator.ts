export class RandomDataGenerator {

    static getRandomString(length: number): string {

        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for(let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(
                    Math.random() * characters.length
                )
            );
        }
        return result;
    }
}

// usage example in test file
/*
import { RandomDataGenerator } from '../utils/RandomDataGenerator';
console.log(RandomDataGenerator.getRandomString(10));
*/
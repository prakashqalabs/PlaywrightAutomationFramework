import winston from "winston";

export class Logger {

    private static logger = winston.createLogger({
        level: "info",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
                ({ timestamp, level, message }) =>
                    `${timestamp} [${level.toUpperCase()}] ${message}`
            )
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: "logs/framework.log"
            })
        ]
    });

    static info(message: string) {
        this.logger.info(message);
    }

    static error(message: string) {
        this.logger.error(message);
    }

    static warn(message: string) {
        this.logger.warn(message);
    }
}




// usage example in test file
/*
import { Logger } from '../utils/Logger';
Logger.info("Login successful");
Logger.error("Product not found");
*/
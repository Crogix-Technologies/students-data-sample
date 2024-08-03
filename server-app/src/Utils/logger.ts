import path = require("path");
import winston = require("winston");
import "winston-daily-rotate-file"

const { combine, timestamp, json, printf, colorize, align, errors, prettyPrint, label } = winston.format;
const fileRotateTransport = new winston.transports.DailyRotateFile({
    level: "http",
    filename: 'log-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '7d',
    dirname: path.join(__dirname, "../../logs"),
    json: false,
});
export const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    level: 'http',
    format: combine(
        timestamp(
            {
                format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            },),
        label({ label: "SchoolMIS", }),
        printf((info) => `[${info.timestamp}] [${info.label}] ${info.level.toUpperCase()}: ${info.message}`),
    ),
    transports: [
        new winston.transports.Console({
            format: combine(
                timestamp(
                    {
                        format: 'YYYY-MM-DD hh:mm:ss.SSS A',

                    },),
                label({ label: "SchoolMIS" }),
                printf((info) => `[${info.timestamp}] [${info.label}] ${info.level.toUpperCase()}: ${info.message}`),
                colorize({ all: true }),
            )
        }),
        fileRotateTransport
    ],
});

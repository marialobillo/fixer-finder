import winston from 'winston'
import expressWinston from 'express-winston'

const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    meta: true,
    colorize: false, // will produce colorfull logs with the right terminal settings
    expressFormat: true
}

// normal logger instance
export const logger = winston.createLogger(loggerOptions)

// http logger middleware
export const loggerMiddleware = expressWinston.logger(loggerOptions)

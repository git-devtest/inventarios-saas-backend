import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'info',  // Only logs with a level of info or higher (like warn and error) will be recorded.
    format: format.combine(
        format.colorize(), // Adds color to the log levels
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adds a timestamp to each log
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp}-${level}:=>${message}`;
        })
    ),
    transports: [
        //new transports.Console(),
        new transports.File({ filename: './winston_logs/app.log' }) // Logs will be saved to winston_logs/app.log
    ]
});

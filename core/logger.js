import winston from 'winston';

const format = query => {
    const sqlKeywords = [
        'SELECT',
        'FROM',
        'WHERE',
        'UPDATE',
        'INSERT',
        'DELETE',
        'JOIN',
        'ON',
        'GROUP',
        'ORDER',
        'BY',
    ];
    return query.replace(
        new RegExp(`\\b(${sqlKeywords.join('|')})\\b`, 'g'),
        '\n$&'
    );
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) =>
            `\n${timestamp} [${level}]\n` +
        '===============================\n' +
        'Running the query\n' +
        `${format(message)}\n` +
        '==============================='
        )
    ),
    transports: [
        new winston.transports.Console({ level: 'info' })
    ],
});

export default logger;

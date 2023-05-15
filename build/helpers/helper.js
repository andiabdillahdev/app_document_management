"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseData = (statusCode, Message, error, data) => {
    if (statusCode == 200 || statusCode == 201) {
        return {
            statusCode: statusCode,
            message: Message,
            data: data,
        };
    }
    if (statusCode == 404) {
        return {
            statusCode: statusCode,
        };
    }
    if (statusCode == 400 || statusCode == 401) {
        return {
            statusCode: statusCode,
            message: error,
        };
    }
    if (statusCode == 422) {
        return {
            statusCode: statusCode,
            message: error,
        };
    }
    if (statusCode == 500) {
        if (error != null && error instanceof Error) {
            return {
                statusCode: statusCode,
                message: error.message,
                errors: error,
            };
        }
        return {
            statusCode: statusCode,
            message: Message,
            errors: error,
        };
    }
};
exports.default = { ResponseData };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEntryError = exports.DuplicateEntryError = exports.DomainError = void 0;
class DomainError extends Error {
}
exports.DomainError = DomainError;
class DuplicateEntryError extends DomainError {
    constructor(message = "DUPLICATED") {
        super(message);
    }
}
exports.DuplicateEntryError = DuplicateEntryError;
class InvalidEntryError extends DomainError {
    constructor(message = "INVALID") {
        super(message);
    }
}
exports.InvalidEntryError = InvalidEntryError;

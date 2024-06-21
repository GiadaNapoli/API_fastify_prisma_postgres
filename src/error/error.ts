export class DomainError extends Error {}

export class DuplicateEntryError extends DomainError {
	constructor(message = "DUPLICATED") {
		super(message);
	}
}

export class InvalidEntryError extends DomainError {
	constructor(message = "INVALID") {
		super(message);
	}
}

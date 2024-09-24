export class DomainError extends Error {}

export class DuplicateEntryError extends DomainError {
	constructor(message = "DUPLICATED") {
		super(message);
	}
}

export class NotFoundError extends DomainError {
	constructor(message = "NOT_FOUND") {
		super(message);
	}
}

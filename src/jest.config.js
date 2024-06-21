// jest.config.js
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["./src"],
	modulePaths: ["./node_modules", "./src"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testMatch: ["**/__tests__/**/*.test.ts"],
	globals: {
		"ts-jest": {
			isolatedModules: true,
		},
	},
};

export const loggerConfig = {
	development: {
		level: "debug",
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
	production: true,
	staging: true,
	test: false,
};

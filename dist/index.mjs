import { Command } from 'commander';

function generateCommand(input, options) {
  console.log("Generating MCP server from:", input);
  if (options.output) {
    console.log("Output directory:", options.output);
  }
}

const program = new Command();
program.name("openapi-to-mcp").description("Generate a mock MCP server from an OpenAPI 3.x YAML file").version("0.1.0");
program.command("generate").argument("<input>", "Path to OpenAPI YAML file").option("-o, --output <dir>", "Output directory").action(generateCommand);
program.parse(process.argv);

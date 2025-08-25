import { Command } from 'commander';

export const generateCommand = new Command('generate')
  .description('Generate MCP code from OpenAPI spec')
  .option('-i, --input <file>', 'OpenAPI input file')
  .option('-o, --output <dir>', 'Output directory')
  .option('--format <format>', 'Output format (esm|cjs)', 'esm')
  .option('--mock', 'Include mock data')
  .action((opts) => {
    // TODO: Implement code generation logic
    console.log('Generating MCP code with options:', opts);
  });

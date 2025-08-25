import { Command } from 'commander';
import { version } from '../../package.json';
import { generateCommand } from './commands/generate';

const program = new Command();

program
  .name('openapi-to-mcp')
  .description('OpenAPI to MCP code generator CLI')
  .version(version)
  .option('-i, --input <file>', 'OpenAPI input file')
  .option('-o, --output <dir>', 'Output directory')
  .option('--format <format>', 'Output format (esm|cjs)', 'esm')
  .option('--mock', 'Include mock data')
  .action((opts) => {
    // Basic error handling for required options
    if (!opts.input || !opts.output) {
      console.error('Error: --input and --output are required');
      process.exit(1);
    }
  });

program.addCommand(generateCommand);

program.parse(process.argv);

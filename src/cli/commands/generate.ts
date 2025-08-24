import { CLIOptions } from '../../types/cli';

export function generateCommand(input: string, options: CLIOptions) {
  // TODO: Implement generation logic
  console.log('Generating MCP server from:', input);
  if (options.output) {
    console.log('Output directory:', options.output);
  }
}

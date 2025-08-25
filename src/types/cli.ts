export interface CLIOptions {
  input: string;
  output?: string;
  format?: 'esm' | 'cjs';
  help?: boolean;
  version?: boolean;
}

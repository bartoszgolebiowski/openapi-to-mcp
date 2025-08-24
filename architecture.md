# Architecture - OpenAPI to MCP CLI Tool

## System Overview

The `openapi-to-mcp` tool is a command-line application that transforms OpenAPI 3.x specifications into fully functional Node.js/TypeScript server projects. The architecture follows a modular, plugin-based design that separates concerns for parsing, generation, and templating.

**Important Scope Limitation**: This tool is specifically designed for **REST APIs that return structured data** (JSON/XML) and explicitly **excludes HTML-based applications**, server-side rendering, or any web UI functionality.

## High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CLI Interface │    │  Core Engine    │    │  File System    │
│                 │────│                 │────│                 │
│  - Argument     │    │  - Orchestrator │    │  - Template     │
│    Parsing      │    │  - Validation   │    │    Engine       │
│  - Validation   │    │  - Error        │    │  - Output       │
│  - Help/Version │    │    Handling     │    │    Generation   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌────────┼────────┐
                       │                 │
            ┌─────────────────┐ ┌─────────────────┐
            │    Parsers      │ │   Generators    │
            │                 │ │                 │
            │  - OpenAPI      │ │  - Server Code  │
            │    Parser       │ │  - Route        │
            │  - Schema       │ │    Handlers     │
            │    Validator    │ │  - Types        │
            │  - Path         │ │  - Mock Data    │
            │    Extractor    │ │  - Config Files │
            └─────────────────┘ └─────────────────┘
```

## Technology Stack

### Core Runtime
- **Node.js**: >=18.0.0 (LTS support, modern ES features)
- **TypeScript**: ^5.0.0 (Latest stable with advanced type features)
- **pnpm**: Package manager for fast, efficient dependency management

### CLI Framework
- **Commander.js**: Robust CLI argument parsing and command handling
- **chalk**: Terminal styling and colored output
- **ora**: Elegant loading spinners and progress indicators

### OpenAPI Processing
- **js-yaml**: YAML parsing with TypeScript support
- **openapi-types**: Official TypeScript definitions for OpenAPI 3.x
- **ajv**: JSON Schema validation for OpenAPI spec validation

### Code Generation
- **Handlebars.js**: Template engine for code generation
- **prettier**: Code formatting for generated output
- **fs-extra**: Enhanced file system operations

### Generated Server Stack
- **Express.js**: Web framework for generated servers
- **cors**: Cross-origin resource sharing middleware
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **tsx**: TypeScript execution for development

## Module Architecture

### 1. CLI Module (`src/cli/`)
```typescript
├── index.ts              # Main CLI entry point
├── commands/
│   ├── generate.ts       # Main generation command
│   └── validate.ts       # OpenAPI validation command
├── options.ts            # CLI option definitions
└── utils/
    ├── logger.ts         # Colored logging utilities
    └── errors.ts         # Error handling and formatting
```

**Responsibilities:**
- Command-line argument parsing
- User input validation
- Progress indication
- Error reporting
- Help documentation

### 2. Parser Module (`src/parsers/`)
```typescript
├── index.ts              # Parser factory and registry
├── openapi/
│   ├── parser.ts         # Main OpenAPI parser
│   ├── validator.ts      # Schema validation
│   ├── extractor.ts      # Path and operation extraction
│   └── types.ts          # Parser-specific types
└── utils/
    ├── yaml.ts           # YAML processing utilities
    └── schema.ts         # Schema manipulation helpers
```

**Responsibilities:**
- OpenAPI YAML parsing
- Schema validation and normalization
- Path and operation extraction
- Type inference from schemas
- Error detection and reporting

### 3. Generator Module (`src/generators/`)
```typescript
├── index.ts              # Generator orchestrator
├── server/
│   ├── express.ts        # Express server generator
│   ├── routes.ts         # Route handler generator
│   └── middleware.ts     # Middleware generator
├── types/
│   ├── interfaces.ts     # TypeScript interface generator
│   └── schemas.ts        # Schema type generator
├── config/
│   ├── package.ts        # package.json generator
│   ├── tsconfig.ts       # TypeScript config generator
│   └── gitignore.ts      # .gitignore generator
└── mocks/
    ├── data.ts           # Mock data generator
    └── responses.ts      # Response generator
```

**Responsibilities:**
- Code generation from parsed OpenAPI
- Template rendering and customization
- File structure creation
- Dependency management
- Mock data generation

### 4. Template Module (`src/templates/`)
```typescript
├── index.ts              # Template registry and loader
├── server/
│   ├── main.hbs          # Main server template
│   ├── route.hbs         # Route handler template
│   └── middleware.hbs    # Middleware template
├── types/
│   └── interfaces.hbs    # TypeScript interface template
├── config/
│   ├── package.hbs       # package.json template
│   ├── tsconfig.hbs      # tsconfig.json template
│   └── readme.hbs        # README.md template
└── utils/
    ├── helpers.ts        # Handlebars helpers
    └── partials.ts       # Reusable template partials
```

**Responsibilities:**
- Template storage and organization
- Handlebars helper functions
- Template compilation and rendering
- Partial template management

### 5. Types Module (`src/types/`)
```typescript
├── index.ts              # Main type exports
├── openapi.ts            # OpenAPI-specific types
├── generator.ts          # Generator configuration types
├── cli.ts                # CLI-specific types
└── common.ts             # Shared utility types
```

**Responsibilities:**
- Type definitions and interfaces
- Type guards and validation
- Generic utility types
- API contracts between modules

## Design Patterns

### 1. Factory Pattern
Used for creating parsers and generators based on input type:
```typescript
interface ParserFactory {
  createParser(type: 'openapi' | 'swagger'): Parser;
}
```

### 2. Strategy Pattern
Different generation strategies for various server frameworks:
```typescript
interface GeneratorStrategy {
  generate(spec: OpenAPISpec, config: GeneratorConfig): GeneratedProject;
}
```

### 3. Template Method Pattern
Code generation process with customizable steps:
```typescript
abstract class BaseGenerator {
  generate(spec: OpenAPISpec): void {
    this.validateInput(spec);
    this.parseSpec(spec);
    this.generateCode();
    this.writeFiles();
  }
}
```

### 4. Observer Pattern
Progress reporting during generation:
```typescript
interface ProgressObserver {
  onProgress(step: string, percentage: number): void;
  onComplete(): void;
  onError(error: Error): void;
}
```

## Data Flow

### 1. Input Processing
```
CLI Input → Argument Validation → File Reading → YAML Parsing → Schema Validation
```

### 2. Analysis Phase
```
OpenAPI Spec → Path Extraction → Operation Analysis → Schema Analysis → Type Inference
```

### 3. Generation Phase
```
Analyzed Data → Template Selection → Code Generation → File Writing → Output Validation
```

### 4. Output Structure
```
Generated Project → Package Installation → Build Verification → Runtime Testing
```

## Error Handling Strategy

### 1. Error Categories
- **Input Errors**: Invalid files, malformed YAML, missing required fields
- **Validation Errors**: OpenAPI spec violations, unsupported features
- **Generation Errors**: Template errors, file system issues
- **Runtime Errors**: Unexpected exceptions, memory issues

### 2. Error Recovery
- Graceful degradation for non-critical errors
- Detailed error messages with suggested fixes
- Partial generation with warnings when possible
- Clean rollback on critical failures

### 3. Logging Strategy
```typescript
enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}
```

## Performance Considerations

### 1. Memory Management
- Streaming YAML parsing for large files
- Lazy loading of templates
- Garbage collection optimization
- Memory usage monitoring

### 2. File System Optimization
- Batch file operations
- Asynchronous I/O operations
- Efficient directory traversal
- Temporary file cleanup

### 3. Generation Speed
- Template compilation caching
- Parallel file generation
- Incremental updates
- Progress optimization

## Security Considerations

### 1. Input Validation
- Path traversal prevention
- File size limitations
- YAML bomb protection
- Malicious content detection

### 2. Output Security
- Safe file creation
- Permission management
- Secure template rendering
- Dependency vulnerability scanning

## Extensibility

### 1. Plugin Architecture
- Custom parser plugins
- Generator extensions
- Template customization
- Middleware plugins

### 2. Configuration System
- User configuration files
- Environment variable support
- Runtime option overrides
- Profile-based configurations

### 3. Future Enhancements
- Multiple output formats (FastAPI, Spring Boot)
- Database integration templates
- Authentication/authorization generators
- API documentation generation
- Testing framework integration

## Quality Assurance

### 1. Testing Strategy
- Unit tests for all modules (Jest)
- Integration tests for CLI commands
- Template validation tests
- Generated code quality tests

### 2. Code Quality
- ESLint with TypeScript rules
- Prettier for code formatting
- Husky for pre-commit hooks
- SonarQube for code analysis

### 3. Documentation
- JSDoc for code documentation
- Architecture decision records (ADRs)
- User guides and tutorials
- API reference documentation

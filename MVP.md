# MVP Requirements - OpenAPI to MCP CLI Tool

## Overview

This document outlines the Minimum Viable Product (MVP) requirements for the `openapi-to-mcp` CLI tool that generates runnable Node.js/TypeScript servers from OpenAPI 3.x specifications.

**Scope**: This tool specifically targets **REST APIs that return structured data** (JSON/XML) and does **NOT** support HTML-based web applications or server-side rendering.

## Core MVP Features

### 1. CLI Interface

- **Binary Command**: `openapi-to-mcp` executable accessible from command line
- **Input Parameter**: Mandatory path to OpenAPI YAML file
- **Output Parameter**: Optional output directory (defaults to `./generated-server`)
- **Help Command**: `--help` flag to display usage information
- **Version Command**: `--version` flag to display tool version

**Example Usage:**

```bash
openapi-to-mcp ./api-spec.yaml
openapi-to-mcp ./api-spec.yaml --output ./my-server
```

### 2. OpenAPI YAML Parsing

- **File Reading**: Read and validate YAML file existence
- **Schema Validation**: Basic OpenAPI 3.x format validation
- **Error Handling**: Clear error messages for invalid files
- **Path Extraction**: Parse all endpoint paths and HTTP methods
- **Schema Extraction**: Extract request/response schemas

### 3. Project Generation

- **Directory Creation**: Create output directory structure
- **Package.json Generation**: Generate valid Node.js project configuration
- **TypeScript Configuration**: Generate tsconfig.json with appropriate settings
- **Dependency Management**: Include all necessary runtime dependencies

### 4. Server Code Generation

- **Main Server File**: Generate Express.js server entry point
- **Route Handlers**: Generate individual route handler files
- **Mock Responses**: Generate mock data based on OpenAPI schemas
- **Basic Middleware**: Include CORS, JSON parsing, error handling
- **Port Configuration**: Configurable server port (default: 3000)

### 5. Mock Data Generation

- **Schema-based Mocking**: Generate mock responses matching OpenAPI schemas
- **Data Types Support**: Handle strings, numbers, booleans, arrays, objects
- **Basic Validation**: Basic request validation for required fields
- **HTTP Status Codes**: Implement appropriate response status codes

### 6. Generated Project Structure

```
generated-server/
├── package.json
├── tsconfig.json
├── src/
│   ├── server.ts          # Main server entry point
│   ├── routes/            # Generated route handlers
│   │   ├── users.ts
│   │   └── products.ts
│   ├── types/             # TypeScript interfaces
│   │   └── api.types.ts
│   └── utils/             # Helper utilities
│       └── mockData.ts
├── .gitignore
└── README.md              # Generated project documentation
```

### 7. Runnable Output

- **Installation**: `npm install` or `pnpm install` works out of the box
- **Development Mode**: `npm run dev` starts server with hot reload
- **Build Process**: `npm run build` compiles TypeScript to JavaScript
- **Production Mode**: `npm start` runs compiled server
- **API Testing**: All endpoints respond with appropriate mock data

## MVP Success Criteria

### Functional Requirements

1. ✅ Tool accepts OpenAPI YAML file as input
2. ✅ Generates complete TypeScript/Node.js project
3. ✅ Generated project runs without errors after `npm install`
4. ✅ All OpenAPI endpoints are accessible and return mock responses
5. ✅ Basic request/response validation works
6. ✅ Generated code follows TypeScript best practices

### Non-Functional Requirements

1. ✅ Generation process completes in under 30 seconds for typical APIs
2. ✅ Clear error messages for invalid inputs
3. ✅ Generated code is readable and well-structured
4. ✅ Tool works on Windows, macOS, and Linux

## Out of Scope for MVP

### Features NOT included in MVP:

- Complex authentication/authorization
- Database integration
- Advanced mock data generators (faker.js)
- Custom middleware generation
- OpenAPI 2.x support
- JSON input format
- Interactive CLI prompts
- API documentation generation
- Docker configuration
- Testing framework setup
- CI/CD pipeline configuration
- Advanced validation rules
- Custom response examples
- Webhook support
- Rate limiting
- Logging configuration

## MVP Validation Test Cases

### Test Case 1: Basic API

- Input: Simple OpenAPI spec with 2-3 GET endpoints
- Expected: Generated server responds to all endpoints with mock data

### Test Case 2: CRUD Operations

- Input: OpenAPI spec with GET, POST, PUT, DELETE operations
- Expected: All CRUD endpoints work with appropriate HTTP methods

### Test Case 3: Complex Schemas

- Input: OpenAPI spec with nested objects and arrays
- Expected: Mock responses match schema structure

### Test Case 4: Error Handling

- Input: Invalid YAML file
- Expected: Clear error message, graceful failure

### Test Case 5: Large API

- Input: OpenAPI spec with 20+ endpoints
- Expected: All endpoints generated and functional

## Definition of Done

The MVP is complete when:

1. All test cases pass
2. Generated servers start without errors
3. All endpoints return valid mock responses
4. Code quality standards are met
5. Documentation is complete
6. Tool is packaged and installable via npm

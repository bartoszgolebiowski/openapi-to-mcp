# Implementation Plan - OpenAPI to MCP CLI Tool

## Project Overview
This document outlines the step-by-step implementation plan for building the `openapi-to-mcp` CLI tool MVP, following the architecture defined in `architecture.md` and meeting all requirements specified in `MVP.md`.

**Important Scope**: This implementation plan focuses exclusively on **REST APIs that return structured data** (JSON/XML) and explicitly excludes HTML-based applications or server-side rendering capabilities.

## Implementation Timeline

**Estimated Total Time: 4-6 weeks**
**Target MVP Completion: [Current Date + 6 weeks]**

---

## Phase 1: Project Foundation (Week 1)

### 1.1 Development Environment Setup
**Duration: 1 day**

- [ ] Initialize project structure according to architecture
- [ ] Configure TypeScript with strict settings
- [ ] Set up package.json with essential dependencies
- [ ] Configure development tools (ESLint, Prettier, Husky)
- [ ] Create initial CI/CD pipeline configuration

**Deliverables:**
- Complete project scaffolding
- Development environment ready
- Code quality tools configured

**Tasks:**
```bash
# Set up project structure
mkdir -p src/{cli,parsers,generators,templates,types}
mkdir -p src/{cli/{commands,utils},parsers/{openapi,utils}}
mkdir -p src/{generators/{server,types,config,mocks},templates/{server,types,config}}

# Configure package.json - REST API focused dependencies
npm init
npm install typescript @types/node commander chalk ora js-yaml openapi-types express cors helmet
npm install -D jest @types/jest eslint prettier husky tsx @types/express
```

### 1.2 Core Type Definitions
**Duration: 2 days**

- [ ] Define OpenAPI-specific TypeScript interfaces for REST APIs
- [ ] Create CLI configuration types
- [ ] Implement generator configuration types for API servers
- [ ] Set up shared utility types for JSON/XML handling
- [ ] Define content-type validation types
- [ ] Create REST method enumeration types

**Key Files:**
- `src/types/openapi.ts`
- `src/types/cli.ts`
- `src/types/generator.ts`
- `src/types/common.ts`

**Validation Criteria:**
- All types compile without errors
- Type definitions match OpenAPI 3.x specification for REST APIs
- Content-type filtering types work correctly
- JSON/XML response types are properly defined
- Comprehensive JSDoc documentation

### 1.3 Basic CLI Interface
**Duration: 2 days**

- [ ] Implement main CLI entry point
- [ ] Add argument parsing with Commander.js
- [ ] Create help and version commands
- [ ] Implement basic error handling

**Key Files:**
- `src/cli/index.ts`
- `src/cli/commands/generate.ts`
- `src/cli/options.ts`

**Validation Criteria:**
- CLI executable from command line
- Help command displays usage information
- Version command shows correct version
- Invalid arguments show helpful error messages

---

## Phase 2: OpenAPI Parsing (Week 2)

### 2.1 YAML File Processing
**Duration: 2 days**

- [ ] Implement YAML file reading and parsing
- [ ] Add file existence and format validation
- [ ] Create error handling for malformed YAML
- [ ] Implement basic OpenAPI format detection

**Key Files:**
- `src/parsers/utils/yaml.ts`
- `src/parsers/openapi/validator.ts`

**Validation Criteria:**
- Successfully parse valid OpenAPI YAML files
- Detect and report YAML syntax errors
- Handle file not found errors gracefully

### 2.2 OpenAPI Schema Validation
**Duration: 2 days**

- [ ] Implement OpenAPI 3.x schema validation using AJV for REST APIs
- [ ] Create validation error reporting
- [ ] Add support for $ref resolution
- [ ] Implement basic schema normalization
- [ ] Add content-type validation (allow JSON/XML, reject HTML)
- [ ] Validate REST HTTP methods only (GET, POST, PUT, DELETE, PATCH)

**Key Files:**
- `src/parsers/openapi/validator.ts`
- `src/parsers/openapi/parser.ts`

**Validation Criteria:**
- Validate OpenAPI specification compliance for REST APIs
- Report specific validation errors with line numbers
- Handle complex schemas with references
- Reject specifications with HTML content types
- Ensure only REST operations are processed

### 2.3 Path and Operation Extraction
**Duration: 3 days**

- [ ] Parse REST API paths and HTTP methods (GET, POST, PUT, DELETE, PATCH)
- [ ] Extract JSON/XML request/response schemas
- [ ] Implement parameter parsing (path, query, JSON body)
- [ ] Create operation metadata extraction
- [ ] Filter out non-data endpoints (HTML responses)
- [ ] Extract content-type information for proper response handling

**Key Files:**
- `src/parsers/openapi/extractor.ts`
- `src/parsers/openapi/types.ts`

**Validation Criteria:**
- Extract all REST endpoints from OpenAPI spec
- Parse complex parameter definitions for JSON/XML APIs
- Handle nested schema references
- Generate operation summaries for data endpoints only
- Properly categorize request/response content types

---

## Phase 3: Code Generation Engine (Week 3)

### 3.1 Template System Setup
**Duration: 2 days**

- [ ] Configure Handlebars template engine
- [ ] Create template loading and caching system
- [ ] Implement custom Handlebars helpers
- [ ] Set up template validation

**Key Files:**
- `src/templates/index.ts`
- `src/templates/utils/helpers.ts`

**Validation Criteria:**
- Template loading works correctly
- Custom helpers function properly
- Template compilation is cached
- Error handling for malformed templates

### 3.2 Basic Template Creation
**Duration: 3 days**

- [ ] Create Express.js server template
- [ ] Implement route handler templates
- [ ] Design TypeScript interface templates
- [ ] Create configuration file templates (package.json, tsconfig.json)

**Key Files:**
- `src/templates/server/main.hbs`
- `src/templates/server/route.hbs`
- `src/templates/types/interfaces.hbs`
- `src/templates/config/package.hbs`

**Validation Criteria:**
- Templates generate valid TypeScript code
- Generated code follows best practices
- Templates handle edge cases properly

---

## Phase 4: Mock Data Generation (Week 4)

### 4.1 Schema-Based Mock Generation
**Duration: 2 days**

- [ ] Implement basic mock data generators for primitive types (JSON/XML compatible)
- [ ] Create object and array mock generators for structured data
- [ ] Add enum and constant value support
- [ ] Implement nested schema handling for complex JSON structures
- [ ] Ensure generated data matches JSON Schema constraints
- [ ] Add XML-compatible data generation when specified

**Key Files:**
- `src/generators/mocks/data.ts`
- `src/generators/mocks/responses.ts`

**Validation Criteria:**
- Generate valid mock data for all schema types in JSON/XML format
- Handle complex nested structures for REST API responses
- Respect schema constraints (min/max, patterns)
- Ensure content-type compatibility

### 4.2 Response Generation
**Duration: 2 days**

- [ ] Create HTTP response generators for JSON/XML data
- [ ] Implement status code handling for REST APIs
- [ ] Add response header generation (Content-Type: application/json, application/xml)
- [ ] Create error response templates in JSON format
- [ ] Implement proper CORS headers for API access
- [ ] Ensure no HTML content in any responses

**Key Files:**
- `src/generators/mocks/responses.ts`
- `src/generators/server/routes.ts`

**Validation Criteria:**
- Generate appropriate HTTP responses for data APIs
- Handle JSON/XML content types correctly
- Create realistic error responses in JSON format
- Proper REST status code usage (200, 201, 400, 404, 500, etc.)

### 4.3 Route Handler Generation
**Duration: 3 days**

- [ ] Generate Express.js route handlers for REST endpoints
- [ ] Implement JSON/XML request validation logic
- [ ] Add middleware integration (CORS, JSON parser, security headers)
- [ ] Create router organization for API endpoints
- [ ] Ensure no view engine or HTML rendering
- [ ] Implement proper HTTP method handling (GET, POST, PUT, DELETE, PATCH)

**Key Files:**
- `src/generators/server/routes.ts`
- `src/generators/server/middleware.ts`

**Validation Criteria:**
- Generate working Express routes for data APIs
- Implement basic request validation for JSON payloads
- Organize routes logically by resource
- Handle different REST HTTP methods correctly
- No HTML template rendering capabilities

---

## Phase 5: Project Generation (Week 5)

### 5.1 File System Operations
**Duration: 2 days**

- [ ] Implement directory structure creation
- [ ] Add file writing with proper permissions
- [ ] Create file conflict detection and resolution
- [ ] Implement cleanup on generation errors

**Key Files:**
- `src/generators/index.ts`
- `src/cli/utils/filesystem.ts`

**Validation Criteria:**
- Create complete project directory structure
- Handle file system errors gracefully
- Preserve existing files when appropriate

### 5.2 Configuration File Generation
**Duration: 2 days**

- [ ] Generate package.json with correct dependencies
- [ ] Create tsconfig.json with optimal settings
- [ ] Generate .gitignore and README.md
- [ ] Add NPM scripts for common operations

**Key Files:**
- `src/generators/config/package.ts`
- `src/generators/config/tsconfig.ts`

**Validation Criteria:**
- Generated package.json is valid
- TypeScript configuration works correctly
- All necessary files are created

### 5.3 Integration and Testing
**Duration: 3 days**

- [ ] Integrate all components into main generator
- [ ] Implement end-to-end generation flow
- [ ] Add comprehensive error handling
- [ ] Create generation progress reporting

**Key Files:**
- `src/generators/index.ts`
- `src/cli/commands/generate.ts`

**Validation Criteria:**
- Complete generation process works end-to-end
- Generated projects are runnable
- All error cases are handled properly

---

## Phase 6: MVP Validation and Polish (Week 6)

### 6.1 Generated Project Validation
**Duration: 2 days**

- [ ] Test generated REST API projects build successfully
- [ ] Verify all data endpoints are accessible and return JSON/XML
- [ ] Validate mock responses match OpenAPI schemas
- [ ] Test different REST API specification variations
- [ ] Ensure no HTML content is generated or served
- [ ] Validate proper Content-Type headers

**Testing Scope:**
- Simple REST APIs (2-5 JSON endpoints)
- Complex REST APIs (20+ endpoints with nested JSON schemas)
- APIs with JSON and XML content types
- APIs with different REST authentication types
- APIs with various HTTP status codes

### 6.2 Error Handling and User Experience
**Duration: 2 days**

- [ ] Improve error messages and suggestions
- [ ] Add progress indicators and loading states
- [ ] Implement verbose logging mode
- [ ] Create user-friendly help documentation

**Validation Criteria:**
- Clear error messages for common problems
- Helpful suggestions for fixing issues
- Good user experience during generation

### 6.3 Final Testing and Documentation
**Duration: 3 days**

- [ ] Comprehensive testing with various OpenAPI specs
- [ ] Performance testing with large specifications
- [ ] Update README with usage examples
- [ ] Create troubleshooting guide

**Testing Scenarios:**
- Petstore REST API specification (JSON responses)
- GitHub REST API specification
- Large enterprise REST API specifications
- Edge cases and error conditions
- APIs with mixed JSON/XML content types
- APIs with complex nested data structures

---

## Implementation Guidelines

### Code Quality Standards
1. **TypeScript Strict Mode**: Use strict TypeScript configuration
2. **Error Handling**: Comprehensive error handling with helpful messages
3. **Testing**: Unit tests for all core functionality
4. **Documentation**: JSDoc comments for all public APIs
5. **Code Style**: Consistent formatting with Prettier and ESLint

### Git Workflow
1. **Feature Branches**: One feature per branch
2. **Commit Messages**: Conventional commit format
3. **Pull Requests**: Required for all changes
4. **Code Review**: At least one reviewer per PR

### Testing Strategy
```typescript
// Example test structure
describe('OpenAPI Parser', () => {
  describe('YAML parsing', () => {
    it('should parse valid OpenAPI YAML', () => {});
    it('should handle malformed YAML', () => {});
    it('should validate OpenAPI schema', () => {});
  });
});
```

### Performance Targets
- **Generation Time**: < 30 seconds for typical APIs
- **Memory Usage**: < 100MB for large specifications
- **File Size**: Generated projects < 10MB
- **Startup Time**: Generated servers start < 5 seconds

## Risk Mitigation

### Technical Risks
1. **Complex OpenAPI Specs**: Start with simple specs, gradually add complexity
2. **Template Bugs**: Extensive template testing with various inputs
3. **Performance Issues**: Profile and optimize critical paths
4. **Cross-platform Issues**: Test on Windows, macOS, and Linux

### Schedule Risks
1. **Feature Creep**: Strict adherence to MVP scope
2. **Technical Debt**: Regular refactoring and code review
3. **Dependencies**: Pin dependency versions, have fallback plans

## Success Metrics

### MVP Completion Criteria
- [ ] CLI tool generates working REST API servers from OpenAPI specs
- [ ] Generated servers start without errors and serve only JSON/XML data
- [ ] All REST endpoints return appropriate mock responses with correct Content-Type headers
- [ ] Tool rejects HTML-based OpenAPI specifications gracefully
- [ ] Generated servers have no view engines or HTML rendering capabilities
- [ ] Documentation is complete and accurate for REST API generation

### Quality Gates
1. **Code Coverage**: > 80% test coverage
2. **Type Safety**: No TypeScript errors
3. **Performance**: Meets performance targets
4. **User Testing**: Successful testing with real-world REST APIs (no HTML endpoints)

## Post-MVP Roadmap

### Immediate Enhancements (Weeks 7-8)
- Enhanced mock data generation with faker.js
- Better error response handling
- OpenAPI 2.x (Swagger) support

### Future Features (Months 2-3)
- Database integration templates
- Authentication/authorization generators
- Multiple framework support (FastAPI, Spring Boot)
- API documentation generation

### Long-term Vision (Months 4-6)
- Plugin architecture for custom generators
- Interactive CLI mode
- Real-time API development workflow
- Integration with API development tools

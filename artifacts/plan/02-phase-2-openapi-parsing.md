# Phase 2: OpenAPI Parsing (Week 2)

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

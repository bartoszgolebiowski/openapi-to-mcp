# Phase 4: Mock Data Generation (Week 4)

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

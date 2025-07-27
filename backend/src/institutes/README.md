# Institutes Module

This module handles institute-related operations including CRUD operations and enhanced fuzzy search functionality.

## Features

### Enhanced Fuzzy Search

The institute search supports advanced fuzzy matching with the following capabilities:

#### 1. **Spelling Error Handling**
- Uses PostgreSQL's `pg_trgm` extension for true fuzzy matching
- Handles typos and spelling errors
- Example: "Havard" → "Harvard"

#### 2. **Substring Matching**
- Searches for partial matches within institute names
- Case-insensitive matching
- Example: "harv" → "Harvard University"

#### 3. **Multi-Word Search**
- Supports searching for multiple words/terms
- Each term must match somewhere in the institute name
- Example: "aaa cc" → "aaaa bbbb ccc" (matches "aaa" and "cc" parts)

#### 4. **Configuration**
- Similarity threshold controlled via environment variable: `FUZZY_SEARCH_SIMILARITY_THRESHOLD`
- Default value: 0.3 (good balance between accuracy and flexibility)
- Higher values = more strict matching
- Lower values = more lenient matching

## API Endpoints

### GET /institute
Get all institutes with optional filtering and enhanced fuzzy search.

**Query Parameters:**
- `country` (optional): Filter by country name
- `name` (optional): Enhanced fuzzy search by institute name

**Examples:**
```bash
# Basic search
GET /institute?name=harvard

# Multi-word search
GET /institute?name=harvard university

# Combined with country filter
GET /institute?name=university&country=us

# Substring search
GET /institute?name=mit
```

## Environment Variables

Add to your `.env` file:
```
FUZZY_SEARCH_SIMILARITY_THRESHOLD=0.3
```

## Database Requirements

The fuzzy search requires the `pg_trgm` PostgreSQL extension. This is automatically enabled via migration.

## Performance

- GIN index on institute name for fast fuzzy searches
- Optimized for `gin_trgm_ops` operations
- Fallback to LIKE search if extension unavailable 
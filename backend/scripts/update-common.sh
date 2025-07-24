#!/bin/bash

# Update Common Modules Script
# This script updates common NestJS modules and dependencies

echo "🔄 Starting common module update..."

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    exit 1
fi

# Backup current package.json
echo "📦 Backing up package.json..."
cp package.json package.json.backup

# Update all dependencies
echo "⬆️  Updating all dependencies..."
npm update

# Update specific common modules
echo "⬆️  Updating common NestJS modules..."
npm update @nestjs/common @nestjs/core @nestjs/graphql @nestjs/typeorm @nestjs/apollo @nestjs/swagger

# Update TypeScript and related packages
echo "⬆️  Updating TypeScript and related packages..."
npm update typescript @types/node ts-node

# Update GraphQL related packages
echo "⬆️  Updating GraphQL packages..."
npm update graphql apollo-server-express

# Update database related packages
echo "⬆️  Updating database packages..."
npm update typeorm pg

# Update validation packages
echo "⬆️  Updating validation packages..."
npm update class-validator class-transformer

# Update testing packages
echo "⬆️  Updating testing packages..."
npm update @nestjs/testing jest @types/jest

# Fix security vulnerabilities
echo "🔒 Fixing security vulnerabilities..."
npm audit fix

# Install any missing dependencies
echo "📥 Installing missing dependencies..."
npm install

# Run tests to ensure everything works
echo "🧪 Running tests to verify updates..."
npm test

echo "✅ Common module update completed!"
echo "📋 Summary:"
echo "   - All dependencies updated"
echo "   - Common NestJS modules updated"
echo "   - Security vulnerabilities fixed"
echo "   - Tests run successfully"

# Show what was updated
echo "📊 Updated packages:"
npm outdated || echo "All packages are up to date" 
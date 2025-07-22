#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const baseDirArg = process.argv[2] || 'basic';
const baseDir = path.join(process.cwd(), `src/components/${baseDirArg}`);
const graphqlFilePath = path.join(process.cwd(), 'src/gql/graphql.ts');
const graphqlContent = fs.readFileSync(graphqlFilePath, 'utf8');

function extractBasicTypes(content) {
  const basicTypes = [];
  const typeRegex = /export type (\w+) = IData & IWidget & {[^}]+}/g;
  let match;

  while ((match = typeRegex.exec(content)) !== null) {
    basicTypes.push(match[1]);
  }

  return basicTypes;
}

// Function to extract type definitions from graphql.ts
function extractProperties(typeName) {
  const typeRegex = new RegExp(`export type ${typeName} = IData & IWidget & {([^}]+)}`, 'g');
  const match = typeRegex.exec(graphqlContent);
  if (!match || !match[1]) return '';
  const properties = match[1]
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => {
      const propName = line.split(':')[0].trim().replace('?', '');
      return !line.includes('@deprecated') && ![
        '_children',
        '_deleted',
        '_fulltext',
      ].includes(propName);
    });
  return properties;
}

function getTypeProperties(typeName) {
  const properties = extractProperties(typeName)
  return properties.join('\n');
}

function getGQLProperties(typeName) {
  const properties = extractProperties(typeName)
    .map(line => {
      const [propName] = line.split(':');
      return `  ${propName.trim().replace('?', '')}`;
    });
  return properties.join('\n');
}

// Template for GraphQL fragment
const graphqlTemplate = (typeName, properties) => `
fragment ${typeName}Data on ${typeName} {
${properties}
}
`;

// Template for index file
const indexTemplate = (typeName) => `
import React from 'react';
import { ${typeName}Props } from './types';

const ${typeName}: React.FC<${typeName}Props> = (props) => {
	console.log(\`${typeName} props:\`, props);
  return (
    <>
      <h1>${typeName}</h1>
      {/* Render more fields from ${typeName}Data here */}
    </>
  );
};

export default ${typeName};
`;

// Function to create files for each widget type
function generateWidgetFiles() {
	const widgetTypes = extractBasicTypes(graphqlContent);
	
  widgetTypes.forEach((typeName) => {
    const widgetDir = path.join(baseDir, typeName);
		const typeProperties = getTypeProperties(typeName);
		const gqlProperties = getGQLProperties(typeName);

    if (!fs.existsSync(widgetDir)) {
      fs.mkdirSync(widgetDir, { recursive: true });
    }

    // Create GraphQL fragment file
    const graphqlFilePath = path.join(widgetDir, `${typeName}.component.graphql`);
    if (!fs.existsSync(graphqlFilePath)) {
      fs.writeFileSync(graphqlFilePath, graphqlTemplate(typeName, gqlProperties), 'utf8');
    }

    // Create index file
    const indexFilePath = path.join(widgetDir, "index.tsx");
    if (!fs.existsSync(indexFilePath)) {
      fs.writeFileSync(indexFilePath, indexTemplate(typeName), 'utf8');
    }

    // Extract type definition and create types file
    const typesFilePath = path.join(widgetDir, 'types.ts');
		const typesContent = `
import { Maybe, QueryRef, Scalars } from "@/gql/graphql";

export interface ${typeName}Props {
  children?: React.ReactNode;
${typeProperties}
};
`;
    if (!fs.existsSync(typesFilePath)) {
      fs.writeFileSync(typesFilePath, typesContent, 'utf8');
    }
    console.log(`Generated files for ${typeName} in ${widgetDir}`);
  });
}

// Export the function for use as a module
module.exports = generateWidgetFiles;

// Run the function if the script is executed directly
if (require.main === module) {
  generateWidgetFiles();
}
// TODO: convert to separate package

const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), `src/components/`);
const graphqlFilePath = path.join(process.cwd(), 'src/gql/graphql.ts');
const graphqlContent = fs.readFileSync(graphqlFilePath, 'utf8');

const baseQueryDir = path.join(process.cwd(), 'src/base-query');
const dataByTypeFilePath = path.join(baseQueryDir, 'DataByType.graphql');
const dataByPathFilePath = path.join(baseQueryDir, 'DataByPath.graphql');
const dataByIdPath = path.join(baseQueryDir, 'DataById.graphql');
const productsByCategoryIdsPath = path.join(baseQueryDir, 'ProductByCategoryIds.graphql');
const productDetailByPathPath = path.join(baseQueryDir, 'ProductDetailByPath.graphql');
const checkoutQueryFilePath = path.join(baseQueryDir, 'CheckoutQuery.graphql');

function getTypeFields(typeName) {
  const typeRegex = new RegExp(`export type ${typeName} = (?:IB2BPage & )?IData(?: & IWidget)? & {([^}]+)}`, 'g');
  const match = typeRegex.exec(graphqlContent);
  if (!match || !match[1]) return [];
  
  return match[1]
    .trim()
    .split('\n')
    .map(line => line.trim().split(':')[0].trim().replace('?', ''))
    .filter(field => !field.startsWith('_') && !field.includes('@deprecated'));
}

function getNestedTypeFields(nestedTypeName) {
  const nestedTypeRegex = new RegExp(`export type ${nestedTypeName} = {([^}]+)}`, 'g');
  const match = nestedTypeRegex.exec(graphqlContent);
  if (!match || !match[1]) return [];
  
  return match[1]
    .trim()
    .split('\n')
    .map(line => line.trim().split(':')[0].trim().replace('?', ''))
    .filter(field => !field.startsWith('_') && !field.includes('@deprecated'));
}

function extractBasicTypes(content) {
  const basicTypes = [];
  const typeRegex = /export type (\w+) = IData(?: & IWidget)? & {[^}]+}/g;
  let match;

  while ((match = typeRegex.exec(content)) !== null) {
    basicTypes.push(match[1]);
  }

  return basicTypes;
}

function extractPageTypes(content) {
  const basicTypes = [];
  const typeRegex = /export type (\w+) = IB2BPage & IData & {[^}]+}/g;
  let match;

  while ((match = typeRegex.exec(content)) !== null) {
    basicTypes.push(match[1]);
  }

  return basicTypes;
}

// Function to extract type definitions from graphql.ts
function extractProperties(typeName) {
  const typeRegex = new RegExp(`export type ${typeName} = (?:IB2BPage & )?IData(?: & IWidget)? & {([^}]+)}`, 'g');
  const match = typeRegex.exec(graphqlContent);
  if (!match || !match[1]) return '';
  const blockProps = match[1]
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => {
      const propName = line.split(':')[0].trim().replace('?', '');
      return !line.includes('@deprecated') && ![
        '_children',
        '_deleted',
        '_fulltext',
        '_link',
        '_modified',
        '_score'
      ].includes(propName);
    });

  if (["Footer", "Header"].includes(typeName)) {
    return ["layout", blockProps];
  }

  const blockType = Array.from(blockProps).find(prop => prop.includes('WidgetContainer')) ? "pages" : "widgets";
  return [blockType, blockProps];
}

function getTypeProperties(typeName) {
  const [type, props] = extractProperties(typeName)
  return [type, props?.join('\n')];
}

function generateFragment(typeName) {
  const fields = getTypeFields(typeName);

  const fragmentFields = fields.map(field => {
    const fieldTypeRegex = new RegExp(`${field}: Maybe<([^>]+)>;`, 'g');
    const fieldTypeMatch = fieldTypeRegex.exec(graphqlContent);
    if (fieldTypeMatch && fieldTypeMatch[1] === 'LinksContainer') {
      const nestedFields = getNestedTypeFields('LinksContainer');
      return `${field} {\n    ${nestedFields.join('\n    ')}\n  }`;
    }
    return field;
  });

  return `
fragment ${typeName}Data on ${typeName} {
  __typename
  ${fragmentFields.join('\n  ')}
}
`;
}

function createBaseQueryFile(widgetFragments, pageFragments) {
  const baseQueryDir = path.join(process.cwd(), 'src/base-query');

  if (!fs.existsSync(baseQueryDir)) {
    fs.mkdirSync(baseQueryDir, { recursive: true });
  }

  const _widgetFragments = widgetFragments.map(name => `...${name}`).join('\n          ');
  const _pageFragments = pageFragments.map(name => `...${name}`).join('\n          ');

  const queryByPathContent = `
query getContentByPath($path: String!) {
  B2BPage(where: { Url: { eq: $path } }) {
    items {
      Type
      ${_pageFragments}
      WidgetContainer {
        __typename
        Widgets {
          ${_widgetFragments}
        }
      }
    }
  }
}
`;

  const queryByTypeContent = `
query getContentByType($type: String!) {
  B2BPage(where: { Type: { eq: $type } }) {
    items {
      Type
      ${_pageFragments}
      WidgetContainer {
        __typename
        Widgets {
          ${_widgetFragments}
        }
      }
    }
  }
}
`;

const queryByIdContent = `
query getContentById($id: String!) {
  B2BPage(where: { Id: { eq: $id } }) {
    items {
      Type
      ${_pageFragments}
      WidgetContainer {
        __typename
        Widgets {
          ${_widgetFragments}
        }
      }
    }
  }
}
`;

const queryProductsByCategoryIds = `
query getProductsByCategoryIds($ids: [String!]!) {
  Product(where: { Categories: { in: $ids } }) {
    items {
      ...ProductData
    }
  }
}
`;

const queryProductDetailByPath = `
query getProductDetailByPath($path: String!) {
  Product(where: { Url: { eq: $path } }) {
    items {
      ...ProductData
    }
  }
}
`;

const queryCheckout = `
query getCheckoutShippingPageContent {
  CheckoutShippingPage {
    items {
      Type
      ${_pageFragments}
      WidgetContainer {
        __typename
        Widgets {
          ${_widgetFragments}
        }
      }
    }
  }
}

query getCheckoutReviewAndSubmitPageContent {
  CheckoutReviewAndSubmitPage {
    items {
      Type
      ${_pageFragments}
      WidgetContainer {
        __typename
        Widgets {
          ${_widgetFragments}
        }
      }
    }
  }
}

query getOrderConfirmationPageContent {
  OrderConfirmationPage {
    items {
      Type
      ${_pageFragments}
      WidgetContainer {
        __typename
        Widgets {
          ${_widgetFragments}
        }
      }
    }
  }
}
`;

  // if (!fs.existsSync(dataByPathFilePath)) {
  // }
  fs.writeFileSync(dataByPathFilePath, queryByPathContent.trim(), 'utf8');
  console.log(`Created DataByPath.graphql in ${baseQueryDir}`);

  fs.writeFileSync(dataByTypeFilePath, queryByTypeContent.trim(), 'utf8');
  console.log(`Created DataByType.graphql in ${baseQueryDir}`);

  fs.writeFileSync(dataByIdPath, queryByIdContent.trim(), 'utf8');
  console.log(`Created DataById.graphql in ${baseQueryDir}`);

  fs.writeFileSync(productsByCategoryIdsPath, queryProductsByCategoryIds.trim(), 'utf8');
  console.log(`Created ProductsByCategoryIds.graphql in ${baseQueryDir}`);

  fs.writeFileSync(productDetailByPathPath, queryProductDetailByPath.trim(), 'utf8');
  console.log(`Created ProductDetailByPath.graphql in ${baseQueryDir}`);

  fs.writeFileSync(checkoutQueryFilePath, queryCheckout.trim(), 'utf8');
  console.log(`Created CheckoutQuery.graphql in ${baseQueryDir}`);
}

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
  const pageTypes = extractPageTypes(graphqlContent);
  
  widgetTypes.forEach((typeName) => {
    const [blockType, blockProps] = getTypeProperties(typeName);
    const fragmentContent = generateFragment(typeName);
    const widgetDir = path.join(baseDir + blockType, typeName);

    if (!fs.existsSync(widgetDir)) {
      fs.mkdirSync(widgetDir, { recursive: true });
    }

    // Create GraphQL fragment file
    const graphqlFilePath = path.join(widgetDir, `${typeName}.component.graphql`);
    if (!fs.existsSync(graphqlFilePath)) {
      fs.writeFileSync(graphqlFilePath, fragmentContent.trim(), 'utf8');
    }

    if (blockType === "pages") return;

    // Create index file
    const indexFilePath = path.join(widgetDir, "index.tsx");
    if (!fs.existsSync(indexFilePath)) {
      fs.writeFileSync(indexFilePath, indexTemplate(typeName), 'utf8');
    }

    // Extract type definition and create types file
    const typesFilePath = path.join(widgetDir, 'types.ts');
    let importTypes = `Maybe, Scalars`
    if (Array.from(blockProps).find(prop => prop.includes('WidgetContainer'))) {
      importTypes += `, WidgetContainer`
    }
    const typesContent = `
import { ${importTypes} } from "@/gql/graphql";

export interface ${typeName}Props {
  children?: React.ReactNode;
${blockProps}
};
`;
    if (!fs.existsSync(typesFilePath)) {
      fs.writeFileSync(typesFilePath, typesContent, 'utf8');
    }
    console.log(`Generated files for ${typeName} in ${widgetDir}`);
  });

  const widgetFragmentNames = widgetTypes.map(typeName => `${typeName}Data`);
  const pageFragmentNames = pageTypes.map(typeName => `${typeName}Data`);
  createBaseQueryFile(widgetFragmentNames, pageFragmentNames)
}

// Export the function for use as a module
module.exports = generateWidgetFiles;

// Run the function if the script is executed directly
if (require.main === module) {
  generateWidgetFiles();
}
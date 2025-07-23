const fs = require('fs');
const path = require('path');

const GRAPH_ENV = process.env.GRAPH_ENV || 'dev'; // Default to 'dev' for testing
const GRAPHQL_DIR = path.join(process.cwd(), 'src/base-query');
const FRAGMENTS_DIR = path.join(process.cwd(), 'src');

function findGraphQLFragments(dir) {
  let fragments = [];

  function searchDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        searchDirectory(filePath);
      } else if (file.endsWith('.graphql')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const fragmentMatches = content.match(/fragment\s+\w+\s+on\s+\w+\s*\{[\s\S]*?\}/g);

        if (fragmentMatches) {
          fragments = fragments.concat(fragmentMatches.map(fragment => ({
            path: filePath,
            content: fragment
          })));
        }
      }
    });
  }

  searchDirectory(dir);
  return fragments;
}

const fragments = findGraphQLFragments(FRAGMENTS_DIR);
// console.log(`Found ${fragments.length} GraphQL fragments:`);
// fragments.forEach(fragment => {
//   console.log(`\nFile: ${fragment.path}`);
//   console.log('Fragment:');
//   console.log(fragment.content);
// });

function transformFragment(content) {
  if (!GRAPH_ENV) return content;
  const currentNameRegex = new RegExp(`(fragment\\s\\w+\\s+)(on\\s)(${GRAPH_ENV}+?)(\\w+.+)`, 'g');
  const noPrefixNameRegex = new RegExp(`(fragment\\s\\w+\\s+)(on\\s)(\\w+.+)`, 'g');
  console.log(content.match(noPrefixNameRegex))
  const transformed = content
    .replace(currentNameRegex, `$1$2$4`)
    .replace(noPrefixNameRegex, `$1$2${GRAPH_ENV}$3`)

  return transformed;
}

function processFragments() {
  try {
    const processedFiles = new Map();

    fragments.forEach(fragment => {
      const filePath = fragment.path;

      // Read the entire file content if not processed yet
      if (!processedFiles.has(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        processedFiles.set(filePath, fileContent);
      }

      let currentContent = processedFiles.get(filePath);
      const transformedFragment = transformFragment(fragment.content);

      // Replace only the specific fragment in the file content
      currentContent = currentContent.replace(fragment.content, transformedFragment);
      processedFiles.set(filePath, currentContent);
    });

    // Write back all modified files
    for (const [filePath, content] of processedFiles) {
      const fileName = filePath.split('\\').pop();
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`${fileName} transformed successfully`);
    }
  } catch (err) {
    console.error('Error processing fragments:', err);
    process.exit(1);
  }
}

function transformQuery(content) {
  if (!GRAPH_ENV) return content;
  const currentNameRegex = new RegExp(`query(.+\\s+?\\{?\\n\\s+)(${GRAPH_ENV}+?)(\\w+)`, 'g');
  const noPrefixNameRegex = new RegExp(`query(.+\\s+?\\{?\\n\\s+)(\\w+)(\())`, 'g');

  // console.log(content.match(/query(\s+?)(\w+?)(.+\s+?\{?\n\s+)(?!{GRAPH_ENV}\w+)/g))
  // console.log({currentNameRegex})
  // console.log(content.match(/query(\s+?)(\w+?)(.+\s+?\{?\n\s+)(dev\w+)/g))
  // console.log(content.match(currentNameRegex))
  const transformed = content
    .replace(currentNameRegex, `query$1$3`)
    .replace(noPrefixNameRegex, `query$1$2 : ${GRAPH_ENV}$2$3`)

  return transformed;
}

function processQueries() {
  try {
    const files = fs.readdirSync(GRAPHQL_DIR);
    console.log(`Found ${files.length} files in directory`);

    files.forEach(file => {
      if (file.endsWith('.graphql')) {
        const filePath = path.join(GRAPHQL_DIR, file);
        const fileName = filePath.split('\\').pop()
        const content = fs.readFileSync(filePath, 'utf8');
        const transformedQuery = transformQuery(content);

        fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, transformedQuery, 'utf8');
        console.log(`${fileName} transformed successfully`);
      }
    });
  } catch (err) {
    console.error('Error processing files:', err);
    process.exit(1);
  }
}

processFragments();
processQueries();
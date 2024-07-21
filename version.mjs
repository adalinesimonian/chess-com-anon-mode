import fs from 'fs/promises';
import path from 'path';
import process from 'process';

const manifestPath = new URL('./manifest.json', import.meta.url);
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));

const action = process.argv[2];

console.log(`Current version is ${bold(manifest.version)}`);

if (action === 'minor') {
  manifest.version = incrementVersion(manifest.version, 'minor');
} else if (action === 'major') {
  manifest.version = incrementVersion(manifest.version, 'major');
} else if (action === 'patch') {
  manifest.version = incrementVersion(manifest.version, 'patch');
} else {
  console.log(
    `Usage: ${path.basename(process.argv[0])} ${path.basename(process.argv[1])} <major|minor|patch>`,
  );
  process.exit(1);
}

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`Bumped version to ${bold(manifest.version)}`);

function incrementVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);
  if (type === 'major') {
    return `${major + 1}.0.0`;
  } else if (type === 'minor') {
    return `${major}.${minor + 1}.0`;
  } else if (type === 'patch') {
    return `${major}.${minor}.${patch + 1}`;
  }
}

function bold(text) {
  return process.stdout.isTTY ? `\u001b[1m${text}\u001b[22m` : text;
}

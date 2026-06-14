import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dbPath = path.join(rootDir, "dev.db");

const games = [
  {
    id: "perceptual",
    title: "PERCEPTUAL",
    backgroundImage: "/img/perceptual-background.png",
  },
  {
    id: "walk-me-home",
    title: "Walk Me Home",
    backgroundImage: "/img/walk-me-home-background.png",
  },
  {
    id: "jura-new-year",
    title: "Jura: New Year",
    backgroundImage: "/img/jura-new-year-background.png",
  },
];

const postFiles = [
  "src/lib/perceptual-devlog-posts.ts",
  "src/lib/walk-me-home-devlog-posts.ts",
  "src/lib/jura-new-year-devlog-posts.ts",
  "src/lib/posts.ts",
];

function readSourceFile(relativePath) {
  const filePath = path.join(rootDir, relativePath);
  return ts.createSourceFile(
    filePath,
    readFileSync(filePath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
}

function collectConstants(sourceFile) {
  const constants = new Map();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) {
        continue;
      }

      constants.set(
        declaration.name.text,
        readValue(declaration.initializer, constants),
      );
    }
  }

  return constants;
}

function readValue(node, constants) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return null;
  }

  if (ts.isIdentifier(node)) {
    return constants.get(node.text);
  }

  if (ts.isPropertyAccessExpression(node)) {
    const objectValue = readValue(node.expression, constants);
    return objectValue?.[node.name.text];
  }

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => readValue(element, constants));
  }

  if (ts.isObjectLiteralExpression(node)) {
    const value = {};

    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) {
        continue;
      }

      const name = property.name;
      const key = ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null;

      if (key) {
        value[key] = readValue(property.initializer, constants);
      }
    }

    return value;
  }

  return undefined;
}

function collectPostsFromFile(relativePath) {
  const sourceFile = readSourceFile(relativePath);
  const constants = collectConstants(sourceFile);
  const posts = [];

  for (const value of constants.values()) {
    if (!Array.isArray(value)) {
      continue;
    }

    for (const item of value) {
      if (item?.id && item?.title && item?.game && item?.content) {
        posts.push(item);
      }
    }
  }

  return posts;
}

function uniquePosts(posts) {
  return Array.from(new Map(posts.map((post) => [post.id, post])).values());
}

function hashText(text) {
  return createHash("sha256").update(text).digest("hex");
}

function main() {
  const db = new DatabaseSync(dbPath);

  const insertGame = db.prepare(`
    INSERT INTO Game (id, title, backgroundImage)
    VALUES (?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      backgroundImage = excluded.backgroundImage
  `);

  const insertPost = db.prepare(`
    INSERT INTO DevlogPost (
      id,
      title,
      author,
      gameId,
      backgroundImage,
      backgroundColor,
      sourceLanguage,
      content,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      author = excluded.author,
      gameId = excluded.gameId,
      backgroundImage = excluded.backgroundImage,
      backgroundColor = excluded.backgroundColor,
      sourceLanguage = excluded.sourceLanguage,
      content = excluded.content,
      createdAt = excluded.createdAt
  `);

  db.exec("BEGIN");

  for (const game of games) {
    insertGame.run(game.id, game.title, game.backgroundImage);
  }

  const posts = uniquePosts(postFiles.flatMap(collectPostsFromFile));

  for (const post of posts) {
    insertPost.run(
      post.id,
      post.title,
      post.author,
      post.game,
      post.backgroundImage ?? null,
      post.backgroundColor ?? null,
      post.sourceLanguage,
      post.content,
      new Date(`${post.createdAt}T00:00:00.000Z`).toISOString(),
    );
  }

  db.exec("COMMIT");
  db.close();

  console.log(`Seeded ${games.length} games and ${posts.length} devlog posts.`);
  console.log(`Translation table is ready; example source hash: ${hashText("example")}`);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}

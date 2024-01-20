module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/github",
      {
        assets: "release/*.tgz",
      },
    ],
    "@semantic-release/git",
  ],
  branches: ["main"],
  preset: "angular",
};

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
  branches: [
    { name: "main", prerelease: false },
    { name: "beta", channel: "beta", prerelease: true },
  ],
  preset: "angular",
};

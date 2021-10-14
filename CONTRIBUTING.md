# Contributing

## Overview

Prisma Template contributing guidelines.

## Commit Message Guidelines

### Introduction

We follow the Angular Commit Message guildelines, which can be found here:

[https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

We have very precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are easy to follow when looking through the **project history**. But also, we use the git commit messages to  **auto-generate the change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message should not be longer than 100 characters! This allows the message to be easier to read on Bitbucket as well as in various git tools.

Samples:

    docs(changelog): update changelog to beta.5

    fix(release): need to depend on latest rxjs and zone.js

    The version in our package.json gets copied to the one we publish, and users need the latest of these.

#### Revert

If the commit reverts a previous commit, it should begin with `revert:` , followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: webpack, npm)
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

#### Scope

The scope should be the name of the feature or package you that the change touches. If it multiple words, it should be camelCased.

For example:

- navbar
- adminPortal

#### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about **Breaking Changes** and is also the place to optionally reference the issues that this commit **Closes**.

#### Breaking Changes

Should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

---

## Pull Request Process

We make use of a git workflow called Git Flow.

You can find a fantastic breakdown by Atlassian below

[Gitflow Workflow | Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

### Pull Request Workflow

Refer to the Giflow specification for a detailed description of Gitflow.
The most common development workflow would encompass the following steps:

##### 1. Create a branch off of `main`

Name the branch with your first `feature` pre-pended:
`feature/cool-feature`

The branch name should describe the feature you're working on. Either delimited with a dash (`-`) or underscore (`_`);

- `feature/cool-new-feature`
- `feature/update_main_header`

##### 2. Writing code

Write your code in your new branch.

##### 3. Commit your changes

Commit frequently, while adhering to project's standard [commit message guidelines](#commit-message-guidelines)

##### 4. Create a pull request on Github

Include the issue number (if applicable) in either the PR title or description body

##### 5. Submit for review

- Assign the PR to the appropriate reviewer, often default reviewers are set.

##### 6. Merge changes

Once at least one approval has been made, the changes can then be merged into the destination branch. The PR opener is responsible for merging their PR.

### Pull Request Template

The following template should be used as the default PR template [Pull Request Template](pull_request_template.md)

## Meta

| Version | Author                                   | Date       |
| ------- | ---------------------------------------- | ---------- |
| 0.0.1   | Kudakwashe Mupeni <kudamupeni@gmail.com> | 14/10/2021 |
